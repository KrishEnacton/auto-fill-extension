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
      <div className="fixed right-3 top-[120px] bg-[#F6F7FA] border border-1 border-black rounded-[5px] z-10">
        <button
          className="border rounded-md"
          onClick={() => {
            toggleModal()
          }}
        >
          <img src={chrome.runtime.getURL('/src/assets/logo.png')} alt="logo" />
        </button>
      </div>
    )
  }
  return <div></div>
}

export default InjectedButton
