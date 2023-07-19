import React, { useEffect, useState } from 'react'
import CrossIcon from '@heroicons/react/24/outline/XMarkIcon'
import { autoFilling } from '../autoFilling'
import { WabTecConfig } from '../auto-filling-websites/wabtec/config'
const Popup: React.FC<{}> = () => {
  const [userInfo, setUserInfo] = useState<any>()

  useEffect(() => {
    let userDetails: any = {}
    chrome.runtime.sendMessage({ from: 'content', type: 'request_user_info' }, (res) => {
      if (res) {
        setUserInfo(res)
        userDetails = Object.assign(userDetails, { res })
      }
    })
    const observer = new MutationObserver(() => {
      if (
        document.querySelector(
          'div[class="css-1s1r74k"] button[data-automation-id="bottom-navigation-next-button"]',
        )
      )
        //@ts-ignore
        document
          .querySelector(
            'div[class="css-1s1r74k"] button[data-automation-id="bottom-navigation-next-button"]',
          )
          .addEventListener('click', () => {
            autoFilling(userDetails)
          })
      observer.disconnect()
    })

    observer.observe(document.body, { characterData: true, subtree: true, attributes: true })
  }, [])

  return (
    <div className="flex flex-col p-2 gap-y-6 my-5">
      <div className="flex px-6 justify-between">
        <div className="flex">
          <img src={chrome.runtime.getURL('/src/assets/logo.png')} alt="Logo" />
        </div>
        <button className="flex items-end">
          <CrossIcon className="h-14 w-14" />
        </button>
      </div>
      <div className="px-4">Quickly complete job applications with saved information!</div>
      <div className="flex justify-center">
        <button
          onClick={() => autoFilling(userInfo)}
          className=" px-4 py-2 bg-base text-base_text rounded-md"
        >
          AUTOFILL
        </button>
      </div>
    </div>
  )
}

export default Popup
