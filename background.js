chrome.cookies.onChanged.addListener((info) => {
  const { cookie, cause } = info;

  if (cause === 'explicit' || cause === 'overwrite') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.storage.local.get(String(activeTab.id), (data) => {
        let tabData = data[activeTab.id] || {
          url: activeTab.url,
          totalSize: 0,
          cookies: [],
        };

        const cookieSize = JSON.stringify(cookie).length;

        if (tabData.cookies.some((existingCookie) => existingCookie.name === cookie.name)) {
          tabData.totalSize = tabData.totalSize - tabData.cookies.find((existingCookie) => existingCookie.name === cookie.name).size + cookieSize;
          tabData.cookies = tabData.cookies.map((existingCookie) => {
            if (existingCookie.name === cookie.name) {
              return {
                name: cookie.name,
                size: cookieSize,
                url: tabData.url,
                ttl: cookie.expirationDate ? cookie.expirationDate * 1000 - Date.now() : 'Session',
                timestamp: existingCookie.timestamp, // Keep the existing timestamp
              };
            }
            return existingCookie;
          });
        } else {
          tabData.totalSize += cookieSize;
          tabData.cookies.push({
            name: cookie.name,
            size: cookieSize,
            url: tabData.url,
            ttl: cookie.expirationDate ? cookie.expirationDate * 1000 - Date.now() : 'Session',
            timestamp: Date.now(),
          });
        }

        chrome.storage.local.set({ [activeTab.id]: tabData }, () => {
          console.log('Stored cookie data for tab', activeTab.id);
        });
      });
    });
  }
});
