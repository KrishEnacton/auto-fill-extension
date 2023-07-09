
export default function Textarea({rows=3,cols=3, value,label, onChange,placeholder}:any) {
    return (
      <div>
        <label htmlFor={label} className="block text-left text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <textarea
            rows={rows}
            cols={cols}
            name={label}
            id={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    )
  }
  