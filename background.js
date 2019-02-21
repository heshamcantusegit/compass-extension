function getImagePath(color, size) {
  return chrome.runtime.getURL(`images/compass-${color}-${size}.png`)
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      let color;
      if (request.numRequests > 0) color = 'red'
      else color = 'black'
      const paths = {
        16: getImagePath(color, 16),
        24: getImagePath(color, 24),
        64: getImagePath(color, 64),
        128: getImagePath(color, 128),
        256: getImagePath(color, 256),
        512: getImagePath(color, 512)
      }
      chrome.browserAction.setIcon({path: paths});
      sendResponse({ack: "Updating icon if necessary."});
    });
});
