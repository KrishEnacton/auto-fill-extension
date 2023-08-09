import ReactDOM from 'react-dom/client'
import Popup from './components/Popup'
import { selectorProps } from '../../global'
import { AutoFillingWebsites } from './config'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'context-modal'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

// const mutationObserver = new MutationObserver((mutations) => {
console.log(window.location.href)
AutoFillingWebsites.map((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    shadowDOM.append(linkElement)
    ReactDOM.createRoot(shadowDOM).render(<Popup />)
  }
})
// })
//@ts-ignore
// mutationObserver.observe(document.querySelector('title'), { childList: true, subtree: true })
