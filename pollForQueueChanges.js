const observable = Array.from(document.getElementsByClassName('title'))
  .filter((el) => el.innerText === 'Open Requests')[0]
  .parentNode
  .getElementsByClassName('count')[0]

const updateIcon = (numRequests) => {
  chrome.runtime.sendMessage({numRequests: numRequests}, (res) => console.log(res.ack))
}

const observer = new MutationObserver((mutations) => updateIcon(mutations[0].target.data))
observer.observe(observable, {childList: true, characterData: true, attributes: true, subtree: true})

updateIcon(observable.innerText)
