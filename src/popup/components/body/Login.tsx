export default function Login() {
  async function loginWithGoogle() {
    chrome.runtime.sendMessage({
      from: 'Popup.tsx',
      action: 'OPEN_OPTIONS_PAGE',
    })
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-base font-bold text-center text-[15px] mt-6"> Welcome to AutoFill</div>
      <div className="w-[220px] text-center my-8 text-[18px] font-semibold leading-5">
        Quickly complete job applications with saved information
      </div>
      <div className=" text-center my-4 text-[15px] font-bold">Login/Sign Up</div>
      <div className="flex space-x-3">
        <button onClick={() => loginWithGoogle()}>
          <img src={`img/google.svg`} alt={`google Icon`} />
        </button>

        {/* <button>
          <img src={`img/linkedin.svg`} alt={`linkedin Icon`} />
        </button> */}
      </div>
    </div>
  )
}
