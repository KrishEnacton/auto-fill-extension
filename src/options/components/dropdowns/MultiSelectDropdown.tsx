import Select from 'react-select'
import { translate } from '../../../utils/translate'

export default function MultiSelectDropdownMenu({ list, onChange, defaultValue = [] }: any) {
  return (
    <div className="">
      <Select
        defaultValue={defaultValue}
        placeholder={translate('select_skills')}
        isMulti
        name="colors"
        options={list}
        className="basic-multi-select border-transparent"
        classNamePrefix="select"
        onChange={onChange}
      />
    </div>
  )
}
