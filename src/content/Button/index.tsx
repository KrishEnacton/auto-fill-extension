import ReactDOM from 'react-dom/client'
import { selectorProps } from '../../global'
import InjectedButton from './components/Button'
import { AutoFillingWebsites } from '../Popup/config'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'auto-filling-button'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

AutoFillingWebsites.map((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    shadowDOM.append(linkElement)
    ReactDOM.createRoot(shadowDOM).render(<InjectedButton />)
  }
})
