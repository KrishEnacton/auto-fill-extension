import Select from 'react-select'
import { translate } from '../../../utils/translate'

export default function MultiSelectDropdownMenu({ list, onChange, value = [] }: any) {
  return (
    <div className="cursor-pointer">
      <Select
        value={value}
        placeholder={translate('select_skills')}
        isMulti
        name="colors"
        options={list}
        className="basic-multi-select border-transparent cursor-pointer"
        classNamePrefix="select cursor-pointer"
        onChange={onChange}
      />
    </div>
  )
}
