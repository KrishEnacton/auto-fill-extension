import { Formik } from 'formik'
import { useState } from 'react'
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
  const [city, setCity] = useState('')
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)

  const userInfo = getUserInfo().basicInfo
  const [_userInfo, _setuserInfo] = useState({
    firstName: userInfo?.firstName ?? '',
    lastName: userInfo?.lastName ?? '',
    dob: userInfo?.DateofBirth ?? '',
    countryCode: 'af',
    city: userInfo?.city ?? '',
    phoneNumber: userInfo?.phone ?? '',
  })

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
    dob: Yup.string().required(translate('required_msg')),
    countryCode: Yup.string().required(translate('required_msg')),
    city: Yup.string().required(translate('required_msg')),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, translate('phone_Validation_msg'))
      .required(translate('required_msg')),
  })
  return (
    <>
      <Formik
        initialValues={_userInfo}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          const result = setUserInfo({
            basicInfo: {
              firstName: values.firstName,
              lastName: values.lastName,
              DateofBirth: values.dob,
              phone: values.phoneNumber,
              city: values.city,
            },
          })
          if (result) {
            notify('Data Saved', 'success')
          }
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

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
                    />
                    {/* {errors.dob && touched.dob ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.dob ?? ''}</div>
                      ) : null} */}
                  </div>
                  <div className="flex-col">
                    {/* <InputField
                      type="text"
                      value={values.city}
                      label={translate('city')}
                      onChange={(e: any) => {
                        setFieldValue('city', e.target.value)
                      }}
                      placeholder={'Please enter your city'}
                    />
                    {errors.city && touched.city ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.city}</div>
                    ) : null} */}
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
                  </div>
                </div>

                <div className="flex-col !mt-8">
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
                      onClick={() => {
                        const result = setUserInfo({
                          basicInfo: {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            DateofBirth: values.dob,
                            phone: values.phoneNumber,
                            city: values.city,
                          },
                        })
                        if (result) {
                          notify('Data Saved', 'success')
                        }
                        const nextTab = getNextTabName(selectedTab)
                        setSelectedTab(nextTab)
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
