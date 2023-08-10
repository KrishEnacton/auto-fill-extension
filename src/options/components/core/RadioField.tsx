export default function RadioField({ options, value, onChange, msg }: any) {
  return (
    <div>
      <div className="text-lg font-semibold w-full !text-center text-gray-900">{msg}</div>
      <fieldset className="mt-5">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center justify-center sm:space-x-10 sm:space-y-0">
          {options.map((option: any, index: number) => (
            <div key={option.id + '' + index} className="flex items-center">
              <input
                id={option.id}
                name={option.name}
                type="radio"
                value={option.value}
                onChange={onChange}
                className="h-4 w-4 cursor-pointer hidden border-gray-300 text-base focus:ring-base"
                checked={value == option.id}
              />
              <label
                htmlFor={option.id}
                className={`ml-3 ring-1 ring-inset cursor-pointer ring-gray-300 rounded-md py-6 px-7 block text-sm font-medium leading-6 text-gray-900 ${
                  value == option.value || value == option.title ? 'bg-base' : 'bg-white'
                }`}
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
