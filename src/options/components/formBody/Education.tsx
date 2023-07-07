import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { degrees, majors } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'

export default function Education() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedMajor, setSelectedMajor] = useState(majors[0])
  const [selectedDegree, setSelectedDegree] = useState(degrees[0])
  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('required_msg')),
    lastName: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          major: '',
          degree: '',
          gpa: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
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
              <div className="w-full text-black text-left lg:text-center max-w-[400px]">
                <FormTitle name={translate('education')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.name}
                      label={translate('school_name')}
                      onChange={(e: any) => {
                        setFieldValue('firstName', e.target.value)
                      }}
                    />
                    {errors.name && touched.name ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.name}</div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                      {translate('Major')}
                    </div>
                    <InputDropdown
                      data={majors}
                      selected={selectedMajor}
                      onChange={(e: any) => {
                        console.log(e)
                        setFieldValue('major', e)
                        setSelectedMajor(e)
                      }}
                    />
                    {errors.major && touched.major ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.major}</div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                      {translate('degree')}
                    </div>
                    <InputDropdown
                      data={degrees}
                      selected={selectedDegree}
                      onChange={(e: any) => {
                        console.log(e)
                        setFieldValue('major', e)
                        setSelectedDegree(e)
                      }}
                    />
                    {errors.major && touched.major ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.major}</div>
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
