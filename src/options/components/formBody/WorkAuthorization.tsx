import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import FormTitle from '../generic/FormTitle'
const options = [
  { id: 1, title: 'Yes' },
  { id: 2, title: 'No' },
]
export default function WorkAuthorization() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedWorkship, setSelectedWorkShip] = useState()
  const [selectedSponsorship, setSelectedSponsorship] = useState()

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
          <div className="min-h-[calc(100vh-230px)] py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center min-h-[calc(100vh-230px)]">
              <div className="w-full text-black text-left max-w-[400px]">
                <FormTitle name={translate('work_authorization')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-10">
                  <div className="flex-col">
                    <RadioField
                      options={options}
                      selected={selectedWorkship}
                      msg={translate('authorized_to_work_msg')}
                      onChange={(e: any) => {
                        setFieldValue('workAuth', e.target.value)
                        setSelectedWorkShip(e.name)
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
                      options={options}
                      selected={selectedSponsorship}
                      msg={translate('sponsorship_msg')}
                      onChange={(e: any) => {
                        setFieldValue('requireFutureSpon', e.target.value)
                        setSelectedSponsorship(e.name)
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
