import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { degrees, majors, months, startYears } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'

export default function Education() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedMajor, setSelectedMajor] = useState(majors[0])
  const [selectedDegree, setSelectedDegree] = useState(degrees[0])
  const [selectedStartMonth, setSelectedStartMonth] = useState(months[0])
  const [selectedEndMonth, setSelectedEndMonth] = useState(months[0])
  const [selectedStartYear, setSelectedStartYear] = useState(startYears[0])
  const [selectedEndYear, setSelectedEndYear] = useState(startYears[0])

  const FormSchema = Yup.object().shape({
    name: Yup.string().required(translate('required_msg')),
    major: Yup.string().required(translate('required_msg')),
    degree: Yup.string().required(translate('required_msg')),
    gpa: Yup.number()
      .min(1, `${translate('min_msg')}`)
      .max(10, `${translate('max_msg')}`)
      .required(translate('required_msg')),
    startMonth: Yup.string().required(translate('required_msg')),
    startYear: Yup.string().required(translate('required_msg')),
    endMonth: Yup.string().required(translate('required_msg')),
    endYear: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          major: selectedMajor.name,
          degree: selectedDegree.name,
          gpa: '',
          startMonth: selectedStartMonth.name,
          startYear: selectedStartYear.name,
          endMonth: selectedEndMonth.name,
          endYear: selectedEndYear.name,
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
                      input_type="text"
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
                        setFieldValue('major', e.name)
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
                        setFieldValue('major', e.name)
                        setSelectedDegree(e)
                      }}
                    />
                    {errors.major && touched.major ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.major}</div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="number"
                      value={values.gpa}
                      label={translate('gpa')}
                      onChange={(e: any) => {
                        setFieldValue('gpa', e.target.value)
                      }}
                    />
                    {errors.gpa && touched.gpa ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.gpa}</div>
                    ) : null}
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                        {translate('start_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={selectedStartMonth}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setSelectedStartMonth(e)
                        }}
                      />
                      {errors.startMonth && touched.startMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startMonth}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                        {translate('start_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={selectedStartYear}
                        onChange={(e: any) => {
                          setFieldValue('startYear', e.name)
                          setSelectedStartYear(e)
                        }}
                      />
                      {errors.startYear && touched.startYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startYear}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                        {translate('end_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={selectedEndMonth}
                        onChange={(e: any) => {
                          setFieldValue('endMonth', e.name)
                          setSelectedEndMonth(e)
                        }}
                      />
                      {errors.endMonth && touched.endMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endMonth}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                        {translate('end_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={selectedEndYear}
                        onChange={(e: any) => {
                          setFieldValue('endYear', e.name)
                          setSelectedEndYear(e)
                        }}
                      />
                      {errors.endYear && touched.endYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endYear}
                        </div>
                      ) : null}
                    </div>
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
                      name={translate('add_more')}
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
