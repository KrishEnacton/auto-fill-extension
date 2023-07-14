import ReactDOM from 'react-dom/client'
import Popup from '../components/Popup'
import { Config } from '../../utils/config'
import { selectorProps } from '../../global'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'context-modal'
//@ts-ignore
rootElement.style = `position:fixed;right:10px;top:70px;background:#F6F7FA;border:1px solid black;border-radius:5px;z-index:10001;`
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })
Config.selectors.map((selector: selectorProps) => {
  if (window.location.href.includes(selector.href)) {
    shadowDOM.append(linkElement)

    ReactDOM.createRoot(shadowDOM).render(<Popup />)
  } else {
  }
})
