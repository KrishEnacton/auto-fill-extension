import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { countryCodes } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import CountryDropdown from '../dropdowns/CountryDropdown'
import FormTitle from '../generic/FormTitle'
import { getNextTabName, notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'
import InputDropdown from '../dropdowns/InputDropdown'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Basic({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const { getUserInfo, getUserDetails } = useStorage()
  const [next, setNext] = useState(false)
  const { basicInfo } = getUserInfo()
  const userInfo = basicInfo
  const userAuthDetails = getUserDetails()
  const [city, setCity] = useState(userInfo?.city || '')
  const [_userInfo, _setuserInfo] = useState({
    firstName: userInfo?.firstName ?? '',
    lastName: userInfo?.lastName ?? '',
    dob: userInfo?.DateofBirth ?? '',
    city: userInfo?.city?.name ?? '',
    phoneNumber: userInfo?.phone ?? '',
    email: userInfo ? userInfo?.email : userAuthDetails?.email,
    countryCode: userInfo?.countryCode ?? { label: 'IN', name: 'India', flag: 'in' },
  })

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const nameValidationRegex = /^[A-Za-z\s]+$/

  const FormSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(translate('required_msg'))
      .matches(nameValidationRegex, 'Field cannot have special characters'),

    lastName: Yup.string()
      .required(translate('required_msg'))
      .matches(nameValidationRegex, 'Field cannot have special characters'),
    dob: Yup.string().required(translate('required_msg')),
    countryCode: Yup.object().required(translate('required_msg')),
    email: Yup.string()
      .required(translate('required_msg'))
      .matches(emailRegex, 'Invalid email address'),
    city: Yup.string().required(translate('required_msg')),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, translate('phone_Validation_msg'))
      .required(translate('required_msg')),
  })
  const [maxDate, setMaxDate] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    setMaxDate(formattedDate)
  }, [])
  return (
    <>
      <Formik
        initialValues={_userInfo}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          //@ts-ignore
          if (
            userInfo == undefined ||
            userInfo.DateofBirth != values.dob ||
            userInfo.city.name != values.city ||
            userInfo.countryCode.name != values.countryCode.name ||
            userInfo.firstName != values.firstName ||
            userInfo.lastName != values.lastName ||
            userInfo.phone != values.phoneNumber
          ) {
            console.log(values)
            const result = setUserInfo({
              basicInfo: {
                firstName: values?.firstName,
                lastName: values?.lastName,
                DateofBirth: values?.dob,
                phone: values?.phoneNumber,
                city: city,
                email: values?.email,
                countryCode: values?.countryCode,
              },
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }

          if (next) {
            const nextTab = getNextTabName(currentTab)
            navigate(`/?tab=${nextTab}`)
            setNext(false)
          }
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center">
            <div className="w-full text-black text-left lg:text-center  ">
              <FormTitle name={translate('personal_info')} />
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
                      <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                        error
                      </div>
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
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.lastName as any}
                      </div>
                    ) : (
                      <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                        error
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-5 ">
                  <div className="flex-col">
                    <InputField
                      input_type="date"
                      value={values.dob}
                      label={translate('date_of_birth')}
                      onChange={(e: any) => {
                        setNext(false)
                        setFieldValue('dob', e.target.value)
                      }}
                      max={maxDate}
                    />
                    {errors.dob && touched.dob ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.dob as any}
                      </div>
                    ) : (
                      <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                        error
                      </div>
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
                        setFieldValue('city', e.name)
                        setCity(e)
                      }}
                      getLocationsFromApi={true}
                      placeholder={'Select start month of experience'}
                      includeRemote={false}
                    />
                    {errors.city && touched.city ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.city as any}
                      </div>
                    ) : (
                      <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                        error
                      </div>
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
                          value={values.phoneNumber}
                          customClass="rounded-l-none !w-[340px]"
                          onChange={(e: any) => {
                            setNext(false)
                            setFieldValue('phoneNumber', e.target.value)
                          }}
                          placeholder={'Please enter your phone number'}
                        />
                      </div>
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.phoneNumber as any}
                        </div>
                      ) : (
                        <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                          error
                        </div>
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
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.email as any}
                        </div>
                      ) : (
                        <div className="mt-2 ml-1 text-xs invisible text-red-500 text-left">
                          error
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-5 w-full">
                  <div className=" flex items-center justify-center">
                    <PrimaryBtn
                      type="submit"
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('save')}
                    />
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
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
