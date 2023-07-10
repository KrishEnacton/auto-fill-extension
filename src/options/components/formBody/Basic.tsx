import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'
import { notify } from '../../../utils'

export default function Basic({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => Promise<boolean>
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values, props) => {
          const result = await setUserInfo({
            firstName: values.firstName,
            lastName: values.lastName,
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
          <div className="  py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left lg:text-center  ">
                <FormTitle name={translate('personal_info')} />
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="text-center space-y-3"
                >
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
                  <div className="!mt-6">
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
