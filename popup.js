function downloadCSV(csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cookie_data.csv';
  link.click();
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.storage.local.get(String(activeTab.id), (data) => {
    const tabData = data[activeTab.id];
    if (tabData) {
      let cookieInfoHtml = `
        <p>URL: ${tabData.url}</p>
        <p>Total Cookie Size: ${tabData.totalSize} bytes</p>
        <table>
          <tr>
            <th>Cookie Name</th>
            <th>Size (bytes)</th>
            <th>URL</th>
          </tr>
      `;

      let csvContent = 'Cookie Name,Size (bytes),URL\n';
      for (const cookie of tabData.cookies) {
        cookieInfoHtml += `
          <tr>
            <td>${cookie.name}</td>
            <td>${cookie.size}</td>
            <td>${cookie.url}</td>
          </tr>
        `;
        csvContent += `${cookie.name},${cookie.size},${cookie.url}\n`;
      }

      cookieInfoHtml += '</table>';
      document.getElementById('cookieInfo').innerHTML = cookieInfoHtml;
    
      const downloadBtn = document.createElement('button');
      downloadBtn.innerText = 'Download CSV';
      downloadBtn.onclick = () => downloadCSV(csvContent);
      document.getElementById('cookieInfo').appendChild(downloadBtn);
    } else {
      document.getElementById('cookieInfo').innerText = 'No data available.';
    }
  });
});    