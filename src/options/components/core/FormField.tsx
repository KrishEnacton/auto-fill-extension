import { translate } from '../../../utils/translate'
import InputDropdown from '../dropdowns/InputDropdown'
import Checkbox from './Checkbox'
import ErrorText from './ErrorText'
import InputField from './InputField'
import Textarea from './TextArea'

const FormField: React.FC<{
  value?: string | boolean
  placeholder?: string
  id?: string
  formElem?: any
  type: string
  touched?: boolean
  selected?: any
  fieldKey: string
  error?: string
  input_type?: any
  dataList?: any
  inputCustomClass?: string
  getLocationsFromApi?: boolean
  onChange: (e: any) => void
}> = ({
  type,
  value,
  placeholder,
  formElem,
  selected,
  dataList,
  error,
  id,
  fieldKey,
  touched,
  inputCustomClass,
  getLocationsFromApi,
  onChange,
}) => {
  return (
    <>
      {type == 'text' || type == 'number' ? (
        <div className={`flex-col`}>
          <InputField
            input_type={type}
            value={value}
            label={translate(fieldKey)}
            onChange={onChange}
            placeholder={placeholder}
            customClass={inputCustomClass}
          />
          <ErrorText error={error} touched={touched} formElem={formElem} />
        </div>
      ) : type == 'checkbox' ? (
        <div className="!mb-8">
          <Checkbox
            label={translate(fieldKey)}
            value={value}
            id={`${!id ? (!formElem ? 1 : formElem?.length + 1) : id} ${translate(fieldKey)}`}
            onChange={onChange}
            formElem={formElem}
          />
        </div>
      ) : type == 'textarea' ? (
        <div className={`${inputCustomClass != '' ? inputCustomClass : 'w-full'} flex-col`}>
          <Textarea
            value={value}
            label={translate(fieldKey)}
            onChange={onChange}
            placeholder={placeholder}
          />
          <ErrorText error={error} touched={touched} formElem={formElem} />
        </div>
      ) : (
        <div className={`flex-col ${inputCustomClass}`}>
          <div className="block text-left text-lg font-bold leading-6 text-gray-800">
            {translate(fieldKey)}
          </div>
          <InputDropdown
            data={dataList}
            selected={selected}
            onChange={onChange}
            formElem={formElem}
            placeholder={placeholder}
            inputCustomClass={inputCustomClass}
            getLocationsFromApi={getLocationsFromApi}
          />
          <ErrorText error={error} touched={touched} formElem={formElem} />
        </div>
      )}
    </>
  )
}
export default FormField
