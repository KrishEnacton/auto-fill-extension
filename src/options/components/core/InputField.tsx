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
  customClass,
  ...rest
}: any) {
  return (
    <div>
      {label && (
        <label className="block text-left text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          type={input_type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          pattern={pattern}
          autoFocus={autoFocus}
          maxLength={maxLength}
          disabled={disabled}
          className={
            'block rounded-md border-0 w-[300px] py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ' +
            customClass
          }
        />
      </div>
    </div>
  )
}

export default InputField
