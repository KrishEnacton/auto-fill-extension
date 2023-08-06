import ReactDOM from 'react-dom/client'
import { selectorProps } from '../../global'
import InjectedButton from './components/Button'
import { AutoFillingWebsites } from '../Popup/config'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'context-modal'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

const mutationObserver = new MutationObserver(() => {
  AutoFillingWebsites.map((selector: selectorProps) => {
    if (selector.regex.test(window.location.href)) {
      shadowDOM.append(linkElement)
      ReactDOM.createRoot(shadowDOM).render(<InjectedButton />)
    }
  })
})
//@ts-ignore
mutationObserver.observe(document.querySelector('title'), { childList: true, subtree: true })
