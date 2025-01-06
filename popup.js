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
