import { Fragment, useEffect, useRef, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import useLocation from '../../hooks/use-location'
import SkeletonLoader from '../loaders/SkeletonLoader'

export default function InputDropdown({
  data,
  selected,
  onChange,
  placeholder = '',
  inputCustomClass,
  formElem,
  getLocationsFromApi,
  includeRemote = true,
}: any) {
  const { getLocation } = useLocation()
  const [dropdownOption, setDropdownOption] = useState([])
  const [loading, setLoading] = useState(false)
  const uniqueValue = onChange
    .toString()
    .slice(onChange.toString().indexOf(`"`) + 1, onChange.toString().lastIndexOf(`"`))
  const id = !formElem ? uniqueValue + '_newfield' : uniqueValue + '_' + formElem.id
  const buttonRef = useRef()
  const handleGetLocation = async (query: any) => {
    setLoading(true)
    const res: any = await getLocation(query)
    if (typeof res == 'object') {
      const result: any = [{ name: 'Remote' }, ...res]
      setDropdownOption(includeRemote ? result : res)
    }
    setLoading(false)
  }
  const [query, setQuery] = useState('')

  useEffect(() => {
    query === ''
      ? setDropdownOption(data)
      : setDropdownOption(
          data.filter((person: any) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          ),
        )
    if (!getLocationsFromApi) {
      query === ''
        ? setDropdownOption(data)
        : setDropdownOption(
            data.filter((person: any) =>
              person.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, '')),
            ),
          )
    }
    return () => {}
  }, [query])

  return (
    <div className="w-[400px]" id={id} key={id}>
      <Combobox value={selected ? selected : ''} onChange={onChange}>
        <div className="relative mt-1">
          <Combobox.Button className="relative cursor-default overflow-hidden bg-white text-left block w-full rounded-md outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <Combobox.Input
              className={
                'w-full outline-none ring-1 ring-inset rounded-md ring-gray-300  border-0 text-sm px-5 py-5 placeholder:text-gray-300 font-semibold sm:text-lg leading-5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-base ' +
                `${inputCustomClass} ${id}`
              }
              displayValue={(person: any) => person?.name ?? ''}
              placeholder={placeholder}
              onClick={(e) => {
                //@ts-ignore
                buttonRef.current?.click()
              }}
              onChange={(event) => {
                if (getLocationsFromApi) {
                  handleGetLocation(event.target.value)
                }
                setQuery(event.target.value)
              }}
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-72 z-[99] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {dropdownOption?.length === 0 && query !== '' && !loading ? (
                <div className="relative font-semibold cursor-default select-none py-2 px-4 text-gray-700">
                  Please select something valid.
                </div>
              ) : (
                dropdownOption?.map((person: any, index: number) => (
                  <Combobox.Option
                    key={person.name + '' + index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 text-left !font-semibold text-gray-900 ${
                        active ? 'bg-gray-100' : ''
                      }`
                    }
                    value={person ?? person.name ?? ''}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`text-left font-semibold truncate text-lg`}>
                          {person.name}
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
