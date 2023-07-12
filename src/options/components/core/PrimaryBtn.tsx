import SpinnerLoader from '../loaders/SpinnerLoader'
function PrimaryBtn({
  name,
  disabled,
  onClick,
  customClass = '',
  customLoaderClass,
  loader,
  type,
  rightIcon,
}: any) {
  return (
    <button
      type={type ? type : 'button'}
      disabled={disabled ? disabled : false}
      className={
        'rounded-md bg-base  px-5 py-4 text-lg font-semibold text-black shadow-sm hover:bg-base/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base w-[190px] flex items-center justify-center space-x-2 ' +
        `${customClass}`
      }
      onClick={onClick}
    >
      <span>{name}</span>
      {loader ? (
        <span className="flex items-center justify-center">
          {loader && (
            <SpinnerLoader
              className={''}
              loaderClassName={customLoaderClass ? customLoaderClass : ''}
            />
          )}
        </span>
      ) : (
        <> {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}</>
      )}
    </button>
  )
}

export default PrimaryBtn
