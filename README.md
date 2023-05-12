# Cookie Tracker Extension

This is a simple Google Chrome extension that tracks cookies and their sizes on every page visited. The extension displays the cookie name, size, and URL where the cookie was added or updated. Users can also download the cookie data as a CSV file and clear the tracked cookie data.

## Installation

Follow these steps to install the Cookie Tracker extension locally:

1. Clone this repository or download the repository as a ZIP file and extract it.

```bash
git clone https://github.com/yourusername/cookie-tracker.git
```

Open Google Chrome and navigate to chrome://extensions/.

Enable "Developer mode" by toggling the switch in the top-right corner of the page.

Click the "Load unpacked" button that appears in the top-left corner of the page.

Navigate to the directory where you cloned or extracted the repository, and select the cookie-tracker folder. Click "Select Folder" (or "Open" on some systems) to load the extension.

The Cookie Tracker extension should now appear in your list of extensions. You can access it by clicking the extension icon in the Chrome toolbar.

Usage
Visit any webpage in Google Chrome, and click the Cookie Tracker extension icon in the toolbar.

The extension popup will display the URL of the current page, the total size of cookies on the page, and a table containing the name, size, and URL for each cookie.

To download the cookie data as a CSV file, click the "Download CSV" button in the popup.

To clear the tracked cookie data for the current tab, click the "Clear Data" button in the popup. Note that you'll need to refresh the page or visit a new page to start tracking cookies again after clearing the data.
