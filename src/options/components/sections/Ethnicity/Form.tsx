import { useNavigate } from 'react-router-dom'
import { ethnicity } from '../../../../constants'
import {
  Ethnicity,
  FormErrorProps,
  FormTouchedProps,
  SetFieldValueType,
  handleSubmitType,
} from '../../../../global'
import { getPrevTabName } from '../../../../utils'
import { translate } from '../../../../utils/translate'
import PrimaryBtn from '../../core/PrimaryBtn'
import RadioField from '../../core/RadioField'
import InputDropdown from '../../dropdowns/InputDropdown'

export const EthnicityForm: React.FC<{
  errors: FormErrorProps
  touched: FormTouchedProps
  values: Ethnicity
  veterianTadios: any
  genders: any
  lgtbRadios: any
  disabilityRadios: any
  setPrev: any
  setOptions: React.Dispatch<React.SetStateAction<Ethnicity>>
  setNext: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: handleSubmitType
  setFieldValue: SetFieldValueType
}> = ({
  errors,
  touched,
  values,
  disabilityRadios,
  lgtbRadios,
  genders,
  setPrev,
  veterianTadios,
  setNext,
  handleSubmit,
  setFieldValue,
  setOptions,
}) => {
  const navigate = useNavigate()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="text-center flex items-center justify-center flex-col space-y-3"
    >
      <div className="flex items-center justify-center flex-col !mt-8">
        <div className="block text-left text-lg font-semibold mt-3 mb-2 leading-6 text-gray-900">
          {translate('what_ethnicity')}
        </div>
        <InputDropdown
          data={ethnicity}
          selected={values.ethnicity}
          onChange={(e: any) => {
            setFieldValue('ethnicity', e)
            setNext(false)
            setOptions((prev) => ({ ...prev, ethnicity: e }))
          }}
          placeholder={'Please select your ethnicity  '}
        />
        {errors.ethnicity && touched.ethnicity ? (
          <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.ethnicity as any}</div>
        ) : (
          <div className="invisible mt-2 text-xs ml-1"> error</div>
        )}
      </div>
      <div className="flex justify-between items-center w-full max-w-[550px]">
        <div className="flex-col">
          <RadioField
            options={disabilityRadios}
            msg={translate('have_disability')}
            value={values.is_disabled}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('is_disabled', e.target.value)
            }}
          />
          {errors.is_disabled && touched.is_disabled ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
              {errors.is_disabled as any}
            </div>
          ) : (
            <div className="invisible mt-2 text-xs ml-1"> error</div>
          )}
        </div>
        <div className="flex-col">
          <RadioField
            options={veterianTadios}
            msg={translate('is_veterian')}
            value={values.is_veteran}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('is_veteran', e.target.value)
            }}
          />
          {errors.is_veteran && touched.is_veteran ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
              {errors.is_veteran as any}
            </div>
          ) : (
            <div className="invisible mt-2 text-xs ml-1"> error</div>
          )}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex-col">
          <RadioField
            options={lgtbRadios}
            msg={translate('is_lgtb')}
            value={values.is_lgbt}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('is_lgbt', e.target.value)
            }}
          />
          {errors.is_lgbt && touched.is_lgbt ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.is_lgbt as any}</div>
          ) : (
            <div className="invisible mt-2 text-xs ml-1"> error</div>
          )}
        </div>

        <div className="flex-col">
          <RadioField
            options={genders}
            value={values.gender}
            msg={translate('what_gender')}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('gender', e.target.value)
              setOptions((prev) => ({ ...prev, is_lgbt: e.target.value }))
            }}
          />
          {errors.gender && touched.gender ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.gender as any}</div>
          ) : (
            <div className="invisible mt-2 text-xs ml-1"> error</div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between space-x-5 w-full">
        <div className="!mt-8 flex items-center justify-center">
          <PrimaryBtn
            type="submit"
            customLoaderClass={'!h-4 !w-4'}
            onClick={() => {
              setPrev(true)
            }}
            name={translate('previous')}
          />
        </div>
        <div className="!mt-8 flex items-center justify-center">
          <PrimaryBtn
            customLoaderClass={'!h-4 !w-4'}
            name={translate('next')}
            type="submit"
            onClick={() => {
              setNext(true)
            }}
            customClass="bg-secondary_button hover:bg-secondary_button/80"
          />
        </div>
      </div>
    </form>
  )
}
