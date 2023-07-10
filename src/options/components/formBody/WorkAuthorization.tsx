import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import FormTitle from '../generic/FormTitle'
import { notify } from '../../../utils'

const authorizedOptions = [
  { id: 11, title: 'Yes', name: 'authorized' },
  { id: 12, title: 'No', name: 'authorized' },
]

const sponsorshipOptions = [
  { id: 21, title: 'Yes', name: 'sponsorship' },
  { id: 22, title: 'No', name: 'sponsorship' },
]

export default function WorkAuthorization({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => Promise<boolean>
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const FormSchema = Yup.object().shape({
    workAuth: Yup.boolean().required(translate('required_msg')),
    requireFutureSpon: Yup.boolean().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          workAuth: '',
          requireFutureSpon: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values, props) => {
          const result = await setUserInfo({
            is_authorized_in_us: values.workAuth,
            is_required_visa: values.requireFutureSpon,
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
          <div className="py-4 px-6">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left  ">
                <FormTitle name={translate('work_authorization')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-10">
                  <div className="flex-col">
                    <RadioField
                      options={authorizedOptions}
                      msg={translate('authorized_to_work_msg')}
                      value={values.workAuth}
                      onChange={(e: any) => {
                        setFieldValue(
                          'workAuth',
                          values.workAuth ? !values.workAuth : e.target.checked,
                        )
                      }}
                    />
                    {errors.workAuth && touched.workAuth ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.workAuth}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <RadioField
                      options={sponsorshipOptions}
                      value={values.requireFutureSpon}
                      msg={translate('sponsorship_msg')}
                      onChange={(e: any) => {
                        setFieldValue(
                          'requireFutureSpon',
                          values.requireFutureSpon ? !values.requireFutureSpon : e.target.checked,
                        )
                      }}
                    />
                    {errors.requireFutureSpon && touched.requireFutureSpon ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.requireFutureSpon}
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
