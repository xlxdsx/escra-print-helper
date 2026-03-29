(() => {
  let handled = false;

  function checkForIframe() {
    if (handled) return;

    const iframe = document.querySelector('iframe#igp-content');
    if (iframe && iframe.src) {
      handled = true;

      chrome.runtime.sendMessage({
        type: "PRINT_IFRAME",
        src: iframe.src
      });
    }
  }

  checkForIframe();

  const observer = new MutationObserver(checkForIframe);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();

