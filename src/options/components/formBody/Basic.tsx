import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { countryCodes } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import CountryDropdown from '../dropdowns/CountryDropdown'
import FormTitle from '../generic/FormTitle'
import { notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'

export default function Basic({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => Promise<boolean>
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const { getUserInfo } = useStorage()

  const userInfo = getUserInfo()
  const [_userInfo, _setuserInfo] = useState({
    firstName: userInfo.firstName ?? '',
    lastName: userInfo.lastName ?? '',
    dob: userInfo.DateofBirth ?? '',
    phoneNumber: userInfo.phone ?? '',
    countryCode: '',
    city: userInfo.city ?? '',
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
        onSubmit={async (values, props) => {
          const result = await setUserInfo({
            firstName: values.firstName,
            lastName: values.lastName,
            DateofBirth: values.dob,
            phone: values.phoneNumber,
            city: values.city,
          })
          if (result) {
            notify('Data Saved', 'success')
          }
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <FormTitle name={translate('personal_info')} />
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="text-center space-y-3"
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
                      <InputField
                        type="text"
                        value={values.city}
                        label={translate('city')}
                        onChange={(e: any) => {
                          setFieldValue('city', e.target.value)
                        }}
                        placeholder={'Please enter your city'}
                      />
                      {errors.city && touched.city ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.city}
                        </div>
                      ) : null}
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

                  <div className="!mt-8">
                    <PrimaryBtn
                      disabled={submit.disable}
                      type="submit"
                      loader={submit.loader}
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('save')}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
