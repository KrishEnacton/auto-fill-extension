import React, { useEffect, useLayoutEffect, useState } from 'react'
import CrossIcon from '@heroicons/react/24/outline/XMarkIcon'
import { autoFilling } from '../autoFilling'
const Popup = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    let userDetails: any = {}
    window.addEventListener('message', (e) => {
      if (e.data.showModal) {
        setToggle(true)
      }
      if (!e.data.showModal) {
        setToggle(false)
      }
    })
    chrome.runtime.sendMessage({ from: 'content', type: 'request_user_info' }, (res) => {
      if (res) {
        setUserInfo(res)
        userDetails = Object.assign(userDetails, { res })
      }
    })
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
  }, [])

  function showButton() {
    window.postMessage(
      {
        showButton: true,
        showModal: false,
      },
      '*',
    )
  }

  if (toggle) {
    return (
      <div
        className={
          'flex flex-col p-2 gap-y-6 my-5 fixed right-3 top-20 bg-[#F6F7FA] border border-1 border-black rounded-[5px] z-10'
        }
      >
        <div>
          <div className="flex px-6 justify-between">
            <div className="flex">
              <img src={chrome.runtime.getURL('/src/assets/logo.png')} alt="Logo" />
            </div>
            <button
              className="flex items-end"
              onClick={() => {
                showButton()
              }}
            >
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
      </div>
    )
  }
  return <div></div>
}

export default Popup
