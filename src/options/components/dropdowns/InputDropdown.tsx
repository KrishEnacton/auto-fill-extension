import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import useLocation from '../../hooks/use-location'
import SkeletonLoader from '../loaders/SkeletonLoader'

export default function InputDropdown({
  data,
  selected,
  onChange,
  placeholder = '',
  inputCustomClass,
  getLocationsFromApi,
}: any) {
  const { getLocation } = useLocation()
  const [locationOptions, setLocationOptions] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])

  const handleGetLocation = async (query: any) => {
    const res: any = await getLocation(query)
    res && setLocationOptions(res)
  }
  const [query, setQuery] = useState('')
  // let filteredPeople =

  useEffect(() => {
    setFilteredOptions(
      query === ''
        ? data
        : data.filter((person: any) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          ),
    )
    return () => {}
  }, [])

  useEffect(() => {
    if (getLocationsFromApi) {
      setFilteredOptions(locationOptions)
      // filteredPeople = locationOptions
    } else {
      setFilteredOptions(
        query === ''
          ? data
          : data.filter((person: any) =>
              person.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, '')),
            ),
      )
    }
    return () => {}
  }, [getLocationsFromApi, query])
  return (
    <div className="w-[400px]">
      <Combobox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative cursor-default overflow-hidden bg-white text-left block w-full rounded-md outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <Combobox.Input
              className={
                'w-full outline-none ring-1 ring-inset rounded-md ring-gray-300  border-0 text-sm px-5 py-5 placeholder:text-gray-300 font-semibold sm:text-lg leading-5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-base ' +
                `${inputCustomClass}`
              }
              displayValue={(person: any) => person.name }
              placeholder={placeholder}
              onChange={(event) => {
                if (getLocationsFromApi) {
                  handleGetLocation(event.target.value)
                }
                setQuery(event.target.value)
              }}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-72 z-[99] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
<<<<<<< HEAD
              {filteredOptions.length === 0 && query !== '' ? (
=======
              {dropdownOption?.length === 0 && query !== '' && !loading ? (
>>>>>>> 3c78d3d882544b951e5c9388268156395e297d88
                <div className="relative font-semibold cursor-default select-none py-2 px-4 text-gray-700">
                  Please select something valid.
                </div>
              ) : (
<<<<<<< HEAD
                filteredOptions.map((person: any) => (
                  <Combobox.Option
                    key={person.name}
                    className={({ active }) =>
                      `relative cursor-pointer text-left px-8 select-none py-2 !font-semibold text-gray-900 ${
=======
                dropdownOption?.map((person: any) => (
                  <Combobox.Option
                    key={person.name}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 text-left !font-semibold text-gray-900 ${
>>>>>>> 3c78d3d882544b951e5c9388268156395e297d88
                        active ? 'bg-gray-100' : ''
                      }`
                    }
                    value={person ?? person.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`text-left font-semibold truncate text-lg`}>
<<<<<<< HEAD
                          {person.name} {getLocationsFromApi && `, ${person.country}`}
=======
                          {person.name}
>>>>>>> 3c78d3d882544b951e5c9388268156395e297d88
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
              {loading && (
                <SkeletonLoader
                  className="flex gap-x-4 overflow-hidden"
                  gridCount={2}
                  customClass={'rounded-none'}
                  boxLoaderHeight="44px"
                  boxLoaderWidth="400px"
                ></SkeletonLoader>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
