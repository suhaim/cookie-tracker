chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.cookies.getAll({ url: tab.url }, (cookies) => {
      let totalSize = 0;
      let cookieData = [];

      for (const cookie of cookies) {
        const cookieSize = JSON.stringify(cookie).length;
        totalSize += cookieSize;
        cookieData.push({ name: cookie.name, size: cookieSize });
      }

      const tabData = {
        tabId: tabId,
        url: tab.url,
        totalSize: totalSize,
        cookies: cookieData,
      };

      chrome.storage.local.set({ [tabId]: tabData }, () => {
        console.log('Cookie data saved:', tabData);
      });
    });
  }
});
