import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

export default function InputDropdown({ data, selected, onChange, placeholder = '' }: any) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? data
      : data.filter((person: any) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <div className="w-[300px]">
      <Combobox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative cursor-default overflow-hidden bg-white text-left block w-full rounded-md outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <Combobox.Input
              className="w-full outline-none ring-1 ring-inset rounded-md ring-gray-300  border-0 text-sm leading-5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              displayValue={(person: any) => person.name}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 z-[99] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Please select something valid.
                </div>
              ) : (
                filteredPeople.map((person: any) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 text-gray-900 ${
                        active ? 'bg-gray-100' : ''
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`text-center truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
