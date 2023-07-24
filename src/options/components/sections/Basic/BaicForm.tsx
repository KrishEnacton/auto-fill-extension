import { countryCodes } from '../../../../constants'
import {
  BasicInfo,
  FormErrorProps,
  FormTouchedProps,
  OnChangeHandlerType,
  SetFieldValueType,
  handleSubmitType,
} from '../../../../global'
import { translate } from '../../../../utils/translate'
import InputField from '../../core/InputField'
import PrimaryBtn from '../../core/PrimaryBtn'
import CountryDropdown from '../../dropdowns/CountryDropdown'
import InputDropdown from '../../dropdowns/InputDropdown'

const BasicForm: React.FC<{
  errors: FormErrorProps
  touched: FormTouchedProps
  values: BasicInfo
  maxDate: string
  city: {
    name: string
    latitude: number
    longitude: number
    country: string
    population: number
    is_capital: boolean
  }
  setNext: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: handleSubmitType
  setFieldValue: SetFieldValueType
  setCity: React.Dispatch<
    React.SetStateAction<{
      name: string
      latitude: number
      longitude: number
      country: string
      population: number
      is_capital: boolean
    }>
  >
}> = ({
  errors,
  touched,
  values,
  city,
  maxDate,
  setNext,
  setCity,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="space-y-3"
    >
      <div className="flex space-x-5 ">
        <div className="flex-col">
          <InputField
            input_type="text"
            value={values.firstName}
            label={translate('first_name')}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('firstName', e.target.value)
            }}
            placeholder={'Please enter your first name'}
          />
          {errors.firstName && touched.firstName ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
              {errors.firstName as any}
            </div>
          ) : (
            <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
          )}
        </div>
        <div className="flex-col">
          <InputField
            input_type="text"
            value={values.lastName}
            label={translate('last_name')}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('lastName', e.target.value)
            }}
            placeholder={'Please enter your last name'}
          />
          {errors.lastName && touched.lastName ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.lastName as any}</div>
          ) : (
            <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
          )}
        </div>
      </div>

      <div className="flex space-x-5 ">
        <div className="flex-col">
          <InputField
            input_type="date"
            value={values.DateofBirth}
            label={translate('date_of_birth')}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('DateofBirth', e.target.value)
            }}
            max={maxDate}
          />
          {errors.DateofBirth && touched.DateofBirth ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
              {errors.DateofBirth as any}
            </div>
          ) : (
            <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
          )}
        </div>
        <div className="flex-col">
          <div className="block text-left text-lg font-bold leading-6 text-gray-800">
            {translate('city')}
          </div>

          <InputDropdown
            data={[]}
            selected={city}
            onChange={(e: any) => {
              setNext(false)
              setFieldValue('city', e)
              setCity(e)
            }}
            getLocationsFromApi={true}
            placeholder={'Select start month of experience'}
            includeRemote={false}
          />
          {errors.city && touched.city ? (
            <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.city as any}</div>
          ) : (
            <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
          )}
        </div>
      </div>

      <div className="flex-col ">
        <div className="flex gap-x-6">
          <div className="flex-col">
            <div className="flex items-center justify-start">
              <label className="block text-left text-lg font-bold leading-6 text-gray-800">
                {translate('phone_number')}
              </label>
            </div>
            <div className="flex">
              <div>
                <CountryDropdown
                  customClass="rounded-r-none"
                  value={
                    values.countryCode
                      ? countryCodes.find((a: any) => a.flag === values.countryCode.flag)
                      : countryCodes[1]
                  }
                  data={countryCodes}
                  onChange={(e: any) => {
                    setNext(false)
                    setFieldValue('countryCode', e)
                  }}
                />
              </div>

              <InputField
                input_type="number"
                value={values.phone}
                customClass="rounded-l-none !w-[340px]"
                onChange={(e: any) => {
                  setNext(false)
                  setFieldValue('phone', e.target.value)
                }}
                placeholder={'Please enter your phone number'}
              />
            </div>
            {errors.phone && touched.phone ? (
              <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.phone as any}</div>
            ) : (
              <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
            )}
          </div>
          <div className="flex-col">
            <InputField
              input_type="text"
              value={values.email}
              label={translate('email')}
              onChange={(e: any) => {
                setNext(false)
                setFieldValue('email', e.target.value)
              }}
              placeholder={'Please enter your first name'}
            />
            {errors.email && touched.email ? (
              <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.email as any}</div>
            ) : (
              <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">error</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-5 w-full">
        <div className=" flex items-center justify-center">
          <PrimaryBtn type="submit" customLoaderClass={'!h-4 !w-4'} name={translate('save')} />
        </div>
        <div className=" flex items-center justify-center">
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

export default BasicForm
