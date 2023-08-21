import PrimaryButton from './PrimaryButton'

export default function ButtonWithText({ msg, buttonText, customClass }: any) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[275px] px-3 pb-3 border border-gray-300 rounded space-y-3">
        <div className="text-[15px]">{msg}</div>
        <PrimaryButton text={buttonText} customClass={customClass} />
      </div>
    </div>
  )
}
