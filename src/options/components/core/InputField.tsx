function InputField({
  disabled,
  input_type,
  leftIcon,
  rightIcon,
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
    <div className="relative z-[-1]1">
      {label && (
        <label className="text-left block font-semibold text-gray-dark mb-1">{label}</label>
      )}

      {leftIcon && (
        <div className={`absolute top-1/2 -translate-y-1/2 left-6 ${label ? 'mt-3' : ''}`}>
          <img src={leftIcon} alt="" />
        </div>
      )}

      <input
        className={`appearance-none w-full bg-white h-[56px] rounded-10px placeholder:text-gray text-gray-dark focus:placeholder:text-gray-dark shadow-input-white py-3 px-6 outline-none d-block border border-solid border-transparent focus:border-gray-light transition-colors duration-300
                 ${disabled ? 'opacity-50' : ''} ${leftIcon ? 'pl-14' : ''} ${
          rightIcon ? 'pr-14' : ''
        }`}
        type={input_type}
        disabled={disabled}
        placeholder={placeholder ? placeholder : ''}
        onChange={onChange ? onChange : () => null}
        value={value || ''}
        pattern={pattern}
        autoComplete={autoComplete || ''}
        maxLength={maxLength}
        {...rest}
      />
      {rightIcon && (
        <div className={`absolute top-1/2 -translate-y-1/2 right-6 ${label ? 'mt-3' : ''}`}>
          <img src={rightIcon} alt="" />
        </div>
      )}
    </div>
  )
}

export default InputField
