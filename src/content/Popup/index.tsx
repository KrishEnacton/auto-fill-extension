import ReactDOM from 'react-dom/client'
import Popup from './components/Popup'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')
let fontElem = document.createElement('link')
fontElem.rel = 'stylesheet'
fontElem.type = 'text/css'
fontElem.href = chrome.runtime.getURL('/src/content/Popup/style/index.css')

let rootElement = document.createElement('div')
rootElement.id = 'context-modal'
//@ts-ignore

document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

shadowDOM.append(linkElement)
shadowDOM.append(fontElem)

ReactDOM.createRoot(shadowDOM).render(<Popup />)
