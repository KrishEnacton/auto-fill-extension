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
import { selectedTabState } from '../../../atoms'
import { useRecoilState } from 'recoil'

export default function Basic({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const { getUserInfo } = useStorage()
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [next, setNext] = useState(false)

  const userInfo = getUserInfo().basicInfo
  const [city, setCity] = useState(userInfo?.city || '')

  const [_userInfo, _setuserInfo] = useState({
    firstName: userInfo?.firstName ?? '',
    lastName: userInfo?.lastName ?? '',
    dob: userInfo?.DateofBirth ?? '',
    city: userInfo?.city?.name ?? '',
    phoneNumber: userInfo?.phone ?? '',
    email: userInfo?.email ?? '',
    countryCode: userInfo?.countryCode ?? 'in',
  })

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
    dob: Yup.string().required(translate('required_msg')),
    countryCode: Yup.string().required(translate('required_msg')),
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
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          //@ts-ignore
          const hasChanges = Object.keys(values).some((key: any) => values[key] !== _userInfo[key])

          if (hasChanges) {
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
            const nextTab = getNextTabName(selectedTab)
            setSelectedTab(nextTab)
            setNext(false)
          }
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
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
              >
                <div className="flex space-x-5 !mt-8">
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.firstName}
                      label={translate('first_name')}
                      onChange={(e: any) => {
                        setFieldValue('firstName', e.target.value)
                      }}
                      placeholder={'Please enter your first name'}
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.lastName}
                      label={translate('last_name')}
                      onChange={(e: any) => {
                        setFieldValue('lastName', e.target.value)
                      }}
                      placeholder={'Please enter your last name'}
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex space-x-5 !mt-8">
                  <div className="flex-col">
                    <InputField
                      input_type="date"
                      value={values.dob}
                      label={translate('date_of_birth')}
                      onChange={(e: any) => {
                        setFieldValue('dob', e.target.value)
                      }}
                      max={maxDate}
                    />
                    {errors.dob && touched.dob ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.dob as any}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                      {translate('city')}
                    </div>

                    <InputDropdown
                      data={[]}
                      selected={city}
                      onChange={(e: any) => {
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
                    ) : null}
                  </div>
                </div>

                <div className="flex-col !mt-8">
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
                                ? countryCodes.find((a: any) => a.flag === values.countryCode)
                                : countryCodes[1]
                            }
                            data={countryCodes}
                            onChange={(e: any) => {
                              setFieldValue('countryCode', e)
                            }}
                          />
                        </div>

                        <InputField
                          input_type="number"
                          value={values.phoneNumber}
                          customClass="rounded-l-none !w-[340px]"
                          onChange={(e: any) => {
                            setFieldValue('phoneNumber', e.target.value)
                          }}
                          placeholder={'Please enter your phone number'}
                        />
                      </div>
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <InputField
                        input_type="text"
                        value={values.email}
                        label={translate('email')}
                        onChange={(e: any) => {
                          setFieldValue('email', e.target.value)
                        }}
                        placeholder={'Please enter your first name'}
                      />
                      {errors.email && touched.email ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* <div className="!mt-8 flex items-center justify-center">
                  <PrimaryBtn
                    disabled={submit.disable}
                    type="submit"
                    loader={submit.loader}
                    customLoaderClass={'!h-4 !w-4'}
                    name={translate('submit')}
                  />
                </div> */}
                <div className="flex items-center justify-between space-x-5 w-full">
                  <div className="!mt-8 flex items-center justify-center">
                    <PrimaryBtn
                      type="submit"
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('save')}
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
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
