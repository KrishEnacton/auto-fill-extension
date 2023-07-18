import { Listbox, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import InputField from '../core/InputField'

function CountryDropdown({ data, onChange, value, customClass }: any) {
  const [query, setQuery] = useState('')
  const [save, setSave] = useState<{ flag: string; name: string }>()

  useEffect(() => {
    value && setSave(value)
    return () => {}
  }, [value])

  const filteredPeople =
    query === ''
      ? data
      : data.filter((data: any) => {
          return checkNumberIfContainsKey(data, query)
        })

  function checkNumberIfContainsKey(data: any, key: any) {
    const flagString = data.flag?.toString().toLowerCase()
    const phoneString = data.name?.toString().toLowerCase()
    const keyString = key?.toString().toLowerCase()

    if (flagString.includes(keyString) || phoneString.includes(keyString)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Listbox value={value?.flag || ''} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`outline-none ring-1 ring-inset d-block rounded-md mt-2 ring-gray-300  border-0 text-sm leading-5 text-gray-900 focus:ring-2 focus:ring-inset rounded-r-none appearance-none w-full bg-white h-[64px] px-5 py-5 transition-colors duration-300 focus:ring-base ${
              customClass ? customClass : ''
            }`}
          >
            <div className="flex items-left space-x-3">
              <div className="inline-flex cursor-pointer items-left justify-between w-full">
                <div className="flex space-x-3 items-left">
                  <div className={`flex-shrink-0 fi fi-${save?.flag}`}></div>
                  {/* <div className="flex-shrink-0">{save?.name}</div> */}
                </div>
              </div>
            </div>
          </Listbox.Button>
        </div>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options
            static
            className={
              'absolute mt-2 divide-y w-[250px] divide-gray/20 shadow-[0px_4px_20px_rgba(197,199,213,0.45)] bg-white rounded-[14px]'
            }
          >
            <InputField
              input_type="text"
              customClass="!w-[230px] mb-2 !py-2 !mx-3"
              autoFocus={true}
              value={query}
              onChange={(event: any) => setQuery(event.target.value)}
            />
            {filteredPeople.length === 0 && query != '' ? (
              <div className="relative cursor-default select-none py-4 px-4 text-gray-700">
                Please select something valid.
              </div>
            ) : (
              <div className="max-h-60 px-3 overflow-y-auto">
                {filteredPeople.map((item: any) => (
                  <div key={item?.label}>
                    <Listbox.Option
                      key={item?.label}
                      value={item}
                      disabled={item?.unavailable}
                      className="p-2 text-gray-dark py-3"
                    >
                      <div className="inline-flex items-left cursor-pointer justify-between w-full">
                        <div className="flex space-x-3 items-left">
                          <div className={`flex-shrink-0 fi fi-${item.flag}`}></div>
                          <div className="flex-shrink-0 text-xs">{item?.name}</div>
                        </div>
                      </div>
                    </Listbox.Option>
                  </div>
                ))}
              </div>
            )}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </>
  )
}

export default CountryDropdown
