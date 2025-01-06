# URL Replacer Chrome Extension

**URL Replacer** is a Google Chrome extension that allows users to replace URLs with a custom pattern. This extension helps automate the process of replacing old URL patterns with new ones on specific websites. It works seamlessly with the predefined list of URLs and automatically updates the page with the new URL whenever it matches the specified pattern.

## Features

- Replace URLs with a custom pattern automatically.
- Manual replacement of URLs through the extension's popup.
- Built to work with specific URLs (e.g., `http://CURRENT.URL/`).
- Easy-to-use interface with a single button to trigger the replacement.

## Installation

To install the **URL Replacer** extension, follow these steps:

1. Download the source code files of the extension.
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click the **Load unpacked** button.
5. Select the folder containing the extension's source files and click **Select Folder**.

Once installed, you should see the **URL Replacer** extension icon in your Chrome toolbar.

## How to Use

1. **Automatic URL Replacement**: 
   - The extension will automatically replace URLs from `http://CURRENT.URL/` to `https://REPLACE.URL/` when you navigate to any page with the old URL pattern.
   
2. **Manual URL Replacement**:
   - Click on the extension icon in the browser toolbar.
   - Click the **Replace URL** button to manually replace the current URL of the active tab.

## Files

### `manifest.json`

The `manifest.json` file defines the metadata and settings for the extension.

```json
{
  "manifest_version": 3,
  "name": "URL Replacer",
  "version": "1.2",
  "description": "Replace URLs with a custom pattern.",
  "author": "Riventus AHA",
  "permissions": [
    "webNavigation",
    "storage",
    "activeTab"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "host_permissions": [
    "http://CURRENT.URL/*",
    "https://REPLACE.URL/*"
  ],
  "content_scripts": [
    {
      "matches": [
        "http://CURRENT.URL/*"
      ],
      "js": ["content.js"]
    }
  ]
}
```

### `popup.html`

This is the HTML structure for the popup interface where users can interact with the extension.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Replacer</title>
</head>
<body>
  <h1>URL Replacer Extension</h1>
  <button id="replaceUrl">Replace URL</button>
</body>
<script src="popup.js"></script>
</html>
```

### `background.js`

The `background.js` script listens for navigation events. It checks if the URL matches the old pattern and updates it with the new one.

```javascript
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  const originalUrl = details.url;
  const IP_URL = "http://CURRENT.URL/";

  // Check if the URL contains the old domain (http://CURRENT.URL/)
  if (originalUrl.includes(IP_URL)) {
    // Replace the old domain with the new one
    const newUrl = originalUrl.replace(IP_URL, "https://REPLACE.URL/");

    // Update the tab with the new URL
    chrome.tabs.update(details.tabId, { url: newUrl });
  }
}, { url: [{ hostContains: "CURRENT.URL" }] });
```

### `popup.js`

The `popup.js` script is used to handle user interaction in the popup. When the button is clicked, it replaces the URL in the current active tab.

```javascript
document.getElementById('replaceUrl').addEventListener('click', function () {
  const IP_URL = "http://CURRENT.URL/";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const originalUrl = tab.url;

    // Check if the current tab's URL matches the pattern
    if (originalUrl.includes(IP_URL)) {
      const newUrl = originalUrl.replace(IP_URL, "https://REPLACE.URL/");
      chrome.tabs.update(tab.id, { url: newUrl });
    }
  });
});
```

## Permissions

The extension requires the following permissions:

- `webNavigation`: To listen for navigation events and replace URLs.
- `storage`: For storing any extension-specific settings.
- `activeTab`: To get information about the current active tab in the browser.

## Troubleshooting

- **The URL isn't replacing as expected**: Ensure that you are on a page with a URL matching the pattern `http://CURRENT.URL/`.
- **Manual replacement is not working**: Check that the extension has permission to access the current tab and that you're using the correct version.

## Changelog

### Version 1.2
- Improved URL replacement functionality.
- Added manual URL replacement through the popup interface.

### Version 1.1
- First stable version with automatic URL replacement.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This file provides an overview and detailed instructions for the **URL Replacer** Chrome extension. For any additional questions, please feel free to reach out!