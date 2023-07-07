function InputField({
  disabled,
  input_type,
  placeholder,
  onChange,
  value,
  label,
  autoComplete,
  pattern,
  maxLength,
  ...rest
}: any) {
  return (
    <div className="w-[300px]">
      <label className="block text-left text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          type={input_type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          pattern={pattern}
          maxLength={maxLength}
          disabled={disabled}
          className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
        />
      </div>
    </div>
  )
}

export default InputField
