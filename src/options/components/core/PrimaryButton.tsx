import SpinnerLoader from '../../components/loaders/SpinnerLoader'
function PrimaryBtn({ name, rightIcon, disabled, onClick, customClass, flag, type }: any) {
  return (
    <button
      className={`bg-gr-blue shadow-primary-btn text-sm md:text-base min-h-[45px] md:min-h-[56px] py-2 md:py-3 px-3 md:px-6 rounded-full flex items-center justify-center w-full font-bold text-white disabled:opacity-40 hover:bg-white hover:bg-none hover:text-dark-secondary outline outline-2 outline-transparent  hover:outline-blue-900 transition-colors duration-300 ${
        customClass ? customClass : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <div className="flex items-center space-x-2">
        <span>{name}</span>
        {rightIcon ? <img className="ml-3" src={rightIcon} alt="" /> : null}
        {disabled && flag && <SpinnerLoader />}
      </div>
    </button>
  )
}

export default PrimaryBtn
