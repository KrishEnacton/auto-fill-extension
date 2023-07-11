import Select from 'react-select'
import { translate } from '../../../utils/translate'
import { useEffect } from 'react'

export default function MultiSelectDropdownMenu({ list, onChange, value = [] }: any) {
  useEffect(() => {
    document.querySelectorAll('.select.cursor-pointer__multi-value').forEach((elem: any) => {
      elem.style.backgroundColor = '#3CB8E4'
    })
    const body = document.querySelector("form[class='text-center space-y-3']") as HTMLElement
    const observer = new MutationObserver(() => {
      console.log('called')
      document.querySelectorAll('.select.cursor-pointer__multi-value').forEach((elem: any) => {
        elem.style.backgroundColor = '#3CB8E4'
      })
    })

    observer.observe(body, { childList: true, attributes: true, subtree: true })
  }, [list])

  return (
    <div className="cursor-pointer">
      <Select
        value={value}
        placeholder={translate('select_skills')}
        isMulti
        name="colors"
        options={list}
        className="basic-multi-select text-left px-8 border-transparent text-lg font-semibold !py-4 placeholder:text-gray-300 cursor-pointer"
        classNamePrefix="select cursor-pointer"
        onChange={onChange}
      />
    </div>
  )
}
