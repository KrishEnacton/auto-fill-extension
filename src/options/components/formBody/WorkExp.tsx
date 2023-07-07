import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import Checkbox from '../core/Checkbox'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'

export default function WorkExp() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          isFirstJob: '',
          nameCom: '',
          positionTitle: '',
          expType: '',
          isWorkHere: '',
          description: '',
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
                <FormTitle name={translate('work_experience')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex-col">
                    <Checkbox label={translate('first_job_msg')} />
                    {errors.isFirstJob && touched.isFirstJob ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isFirstJob}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.nameCom}
                      label={translate('last_name')}
                      onChange={(e: any) => {
                        setFieldValue('lastName', e.target.value)
                      }}
                    />
                    {errors.nameCom && touched.nameCom ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.nameCom}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.nameCom}
                      label={translate('last_name')}
                      onChange={(e: any) => {
                        setFieldValue('lastName', e.target.value)
                      }}
                    />
                    {errors.nameCom && touched.nameCom ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.nameCom}
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
