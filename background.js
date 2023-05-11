function updateTabCookieData(cookie, tabId) {
  chrome.storage.local.get(String(tabId), (data) => {
    const tabData = data[tabId] || {
      tabId: tabId,
      url: '',
      totalSize: 0,
      cookies: [],
    };

    const existingCookieIndex = tabData.cookies.findIndex(
      (c) => c.name === cookie.name
    );

    const cookieSize = JSON.stringify(cookie).length;

    if (existingCookieIndex !== -1) {
      tabData.totalSize -= tabData.cookies[existingCookieIndex].size;
      tabData.cookies.splice(existingCookieIndex, 1);
    }

    tabData.totalSize += cookieSize;
    tabData.cookies.push({
      name: cookie.name,
      size: cookieSize,
      url: tabData.url,
    });

    chrome.storage.local.set({ [tabId]: tabData }, () => {
      console.log('Cookie data updated:', tabData);
    });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(String(tabId), (data) => {
      const tabData = data[tabId] || {
        tabId: tabId,
        url: '',
        totalSize: 0,
        cookies: [],
      };

      tabData.url = tab.url;
      chrome.storage.local.set({ [tabId]: tabData }, () => {
        console.log('Tab URL updated:', tabData.url);
      });

      chrome.cookies.getAll({ url: tab.url }, (cookies) => {
        for (const cookie of cookies) {
          updateTabCookieData(cookie, tabId);
        }
      });
    });
  }
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (changeInfo.cause !== 'explicit' || !changeInfo.cookie) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    updateTabCookieData(changeInfo.cookie, activeTab.id);
  });
});