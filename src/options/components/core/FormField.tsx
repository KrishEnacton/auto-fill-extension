import { translate } from '../../../utils/translate'
import InputDropdown from '../dropdowns/InputDropdown'
import ErrorText from './ErrorText'
import InputField from './InputField'

const FormField: React.FC<{
  value?: string
  placeholder: string
  type: string
  touched?: boolean
  selected?: any
  fieldKey: string
  error?: string
  input_type?: any
  dataList?: any
  onChange: (e: any) => void
}> = ({ type, value, placeholder, selected, dataList, error, fieldKey, touched, onChange }) => {
  return (
    <>
      {type != 'dropdown' ? (
        <div className="flex-col">
          <InputField
            input_type={type}
            value={value}
            label={translate(fieldKey)}
            onChange={onChange}
            placeholder={placeholder}
          />
          <ErrorText error={error} touched={touched} />
        </div>
      ) : (
        <div className="flex-col">
          <div className="block text-left text-lg font-bold leading-6 text-gray-800">
            {translate(fieldKey)}
          </div>
          <InputDropdown
            data={dataList}
            selected={selected}
            onChange={onChange}
            placeholder={placeholder}
          />
          <ErrorText error={error} touched={touched} />
        </div>
      )}
    </>
  )
}
export default FormField
