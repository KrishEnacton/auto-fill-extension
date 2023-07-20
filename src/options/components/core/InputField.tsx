function InputField({
  disabled,
  input_type,
  placeholder,
  onChange,
  value,
  label,
  autoComplete,
  autoFocus,
  pattern,
  maxLength,
  max,
  customClass,
  ...rest
}: any) {
  return (
    <div>
      {label && (
        <label className="block text-left text-lg font-bold leading-6 text-gray-800">{label}</label>
      )}
      <div className="mt-1">
        <input
          type={input_type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          pattern={pattern}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onWheelCapture={(e: any) => {
            e.target.blur();
          }}
          max={max}
          disabled={disabled}
          className={
            'block rounded-md border-0 w-[400px] outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 font-semibold focus:ring-2 focus:ring-inset focus:ring-base sm:text-lg sm:leading-6 px-5 py-[22px] ' +
            customClass
          }
        />
      </div>
    </div>
  )
}

export default InputField
