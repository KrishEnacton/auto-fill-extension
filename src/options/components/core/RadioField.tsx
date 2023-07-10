import React from 'react'

export default function RadioField({ options, value, onChange, msg }: any) {
  return (
    <div className="">
      <div className="text-lg font-semibold w-full !text-left text-gray-900">{msg}</div>
      <fieldset className="mt-5">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((notificationMethod: any) => (
            <div key={notificationMethod.id} className="flex items-center">
              <input
                id={notificationMethod.id}
                name={notificationMethod.name}
                type="radio"
                value={value}
                onChange={onChange}
                className="h-4 w-4 cursor-pointer hidden border-gray-300 text-base focus:ring-base"
              />
              <label
                htmlFor={notificationMethod.id}
                className={
                  'ml-3 ring-1 ring-inset cursor-pointer ring-gray-300 rounded-md py-6 px-7 block text-sm font-medium leading-6 text-gray-900 ' +
                  `${value ? 'bg-base' : 'bg-white'}`
                }
              >
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
