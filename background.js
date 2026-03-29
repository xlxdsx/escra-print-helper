chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "PRINT_IFRAME") return;

  chrome.tabs.create({ url: message.src }, (tab) => {
    if (!tab?.id) return;

    const listener = (tabId, info) => {
      if (tabId === tab.id && info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);

        chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            window.print();

            setTimeout(() => {
              window.close();
            }, 1000);
          }
        });
      }
    };

    chrome.tabs.onUpdated.addListener(listener);
  });
});

