import { useEffect, useState } from 'react'
import CrossIcon from '@heroicons/react/24/outline/XMarkIcon'
import { autoFilling } from '../autoFilling'
import SpinnerLoader from '../../../options/components/loaders/SpinnerLoader'
import { loadingFamily } from '../../../atoms'
import { useRecoilState } from 'recoil'
const Popup = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useRecoilState(loadingFamily('spinnerloader'))

  useEffect(() => {
    let userDetails: any = {}
    window.addEventListener('message', (e) => {
      if (e.data.showModal) {
        setToggle(true)
      }
      if (e.data.showModal === false) {
        setToggle(false)
      }
    })
    chrome.runtime.sendMessage({ from: 'content', action: 'REQUEST_USER_INFO' }, (res) => {
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

  async function loginWithGoogle() {
    chrome.runtime.sendMessage({
      from: 'Popup.tsx',
      action: 'OPEN_OPTIONS_PAGE',
    })
  }

  if (toggle) {
    return (
      <div
        className={
          'flex flex-col p-4 gap-y-6 my-5 fixed right-3 top-20 bg-[#F6F7FA] border border-1 border-black rounded-[5px] z-[99999999]'
        }
      >
        <div>
          <div className="flex px-6 justify-between">
            <div className="flex">
              <img
                src={chrome.runtime.getURL('/src/assets/logo.png')}
                width={'230px'}
                height={'60px'}
                alt="Logo"
              />
            </div>
            <button
              className=""
              onClick={() => {
                showButton()
              }}
            >
              <CrossIcon className="h-10 w-10" />
            </button>
          </div>
          <div className="px-4 py-6">Quickly complete job applications with saved information!</div>
          <div className="flex justify-center">
            {!userInfo ? (
              <div className="flex flex-col gap-y-2">
                <div>Please login from options page.</div>
                <button
                  className="rounded-md bg-primary_button p-4 text-primary_text"
                  onClick={loginWithGoogle}
                >
                  Login
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => {
                    autoFilling(userInfo)
                    setLoading(false)
                  }, 1500)
                }}
                className=" px-4 py-2 bg-base flex justify-center items-center text-base_text rounded-md"
              >
                {loading ? (
                  <span className="px-[30px] py-[2px]">
                    <SpinnerLoader className="h-5 w-5" />
                  </span>
                ) : (
                  <span>AUTOFILL</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  return <div></div>
}

export default Popup
