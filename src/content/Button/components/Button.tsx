import { useEffect, useState } from 'react'

const InjectedButton = () => {
  const [toggle, setToggle] = useState(true)
  function toggleModal() {
    window.postMessage(
      {
        showModal: true,
        showButton: false,
      },
      '*',
    )
  }

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data.showButton) {
        setToggle(true)
      }
      if (e.data.showButton === false) {
        setToggle(false)
      }
    })
  }, [])

  if (toggle) {
    return (
      <div className="fixed right-[30px] bottom-[20px] bg-[#F6F7FA] rounded-[5px] z-[999999999]">
        <button
          className="border rounded-md"
          onClick={() => {
            toggleModal()
          }}
        >
          <img
            src={chrome.runtime.getURL('/src/assets/Initials.png')}
            width={'45px'}
            height={'45px'}
            alt="logo"
          />
        </button>
      </div>
    )
  }
  return <div></div>
}

export default InjectedButton
