import Select from 'react-select'
import { translate } from '../../../utils/translate'
import { useRef } from 'react'

export default function MultiSelectDropdownMenu({ list, onChange, value = [], onKeyDown }: any) {
  const selectRef = useRef(null)

  const customNoOptionsMessage = (e: any) => {
    return 'Please enter to add your skills' // Customize the "No Options" message to "Add skills"
  }
  return (
    <Select
      ref={selectRef}
      value={value}
      placeholder={translate('select_skills')}
      isMulti
      name="colors"
      options={list}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      className="basic-multi-select custom-select text-left border-transparent text-lg font-semibold !py-4 placeholder:text-gray-300 cursor-pointer"
      classNamePrefix="select cursor-pointer"
      onChange={onChange}
      onKeyDown={onKeyDown} // Add the keydown event handler
      noOptionsMessage={customNoOptionsMessage}
    />
  )
}
