import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'

export default function PersonalInfo() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          dob: '',
          phoneNumber: '',
          countryCode:"",
          city:""
        }}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
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
          <div className="  py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left lg:text-center max-w-[400px]">
                <FormTitle name={translate('personal_info')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex-col">
                    <InputField
                      input_type="date"
                      value={values.dob}
                      label={translate('date_of_birth')}
                      onChange={(e: any) => {
                        setFieldValue('dob', e.target.value)
                      }}
                    />
                    {errors.dob && touched.dob ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.dob}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.phoneNumber}
                      label={translate('phone_number')}
                      onChange={(e: any) => {
                        setFieldValue('phoneNumber', e.target.value)
                      }}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.city}
                      label={translate('city')}
                      onChange={(e: any) => {
                        setFieldValue('city', e.target.value)
                      }}
                    />
                    {errors.city && touched.city ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.city}
                      </div>
                    ) : null}
                  </div>
                  <div className="!mt-6">
                    <PrimaryBtn
                      disabled={submit.disable}
                      onClick={(e: any) => {
                        handleSubmit()
                      }}
                      type="submit"
                      loader={submit.loader}
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('submit')}
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
