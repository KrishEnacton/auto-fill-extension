import Select from 'react-select'
import { translate } from '../../../utils/translate'
import { useEffect, useRef } from 'react'

export default function MultiSelectDropdownMenu({ list, onChange, value = [], onKeyDown }: any) {
  const selectRef = useRef(null)

  useEffect(() => {
    document.querySelectorAll('.select.cursor-pointer__multi-value').forEach((elem: any) => {
      elem.style.backgroundColor = '#3CB8E4'
    })

    const body = document.querySelector("form[class='text-center space-y-3']") as HTMLElement
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.select.cursor-pointer__multi-value').forEach((elem: any) => {
        elem.style.backgroundColor = '#3CB8E4'
      })
    })

    observer.observe(body, { childList: true, attributes: true, subtree: true })
  }, [list])

  return (
    <div className="cursor-pointer">
      <Select
        ref={selectRef}
        value={value}
        placeholder={translate('select_skills')}
        isMulti
        name="colors"
        options={list}
        closeMenuOnSelect={false}
        controlShouldRenderValue={false}
        className="basic-multi-select text-left px-8 border-transparent text-lg font-semibold !py-4 placeholder:text-gray-300 cursor-pointer"
        classNamePrefix="select cursor-pointer"
        onChange={onChange}
        onKeyDown={onKeyDown} // Add the keydown event handler
      />
    </div>
  )
}
