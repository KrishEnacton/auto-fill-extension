import SpinnerLoader from '../loaders/SpinnerLoader'
function PrimaryBtn({ name, disabled, onClick, customLoaderClass, loader, type }: any) {
  return (
    <button
      type={type ? type : 'button'}
      disabled={disabled ? disabled : false}
      className="rounded-md bg-base  px-5 py-4 text-lg font-semibold text-white shadow-sm hover:bg-base/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base w-[160px] flex items-center justify-center space-x-2"
      onClick={onClick}
    >
      <span>{name}</span>
      {loader && (
        <span className="flex items-center justify-center">
          {loader && (
            <SpinnerLoader
              className={''}
              loaderClassName={customLoaderClass ? customLoaderClass : ''}
            />
          )}
        </span>
      )}
    </button>
  )
}

export default PrimaryBtn
