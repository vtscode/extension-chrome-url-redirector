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
