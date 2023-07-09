import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import Checkbox from '../core/Checkbox'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'
import { months, startYears } from '../../../constants'
import InputDropdown from '../dropdowns/InputDropdown'

export default function WorkExp() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [options, setOptions] = useState({
    selectedStartMonth: months[0],
    selectedStartYear: startYears[0],
    selectedEndMonth: months[0],
    selectedEndYear: startYears[0],
  })
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
          startMonth: options.selectedStartMonth.name,
          startYear: options.selectedStartYear.name,
          endMonth: options.selectedEndMonth.name,
          endYear: options.selectedEndYear.name,
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
                      label={translate('company_name')}
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
                      value={values.positionTitle}
                      label={translate('position_title')}
                      onChange={(e: any) => {
                        setFieldValue('lastName', e.target.value)
                      }}
                    />
                    {errors.positionTitle && touched.positionTitle ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.positionTitle}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.expType}
                      label={translate('experience_type')}
                      onChange={(e: any) => {
                        setFieldValue('lastName', e.target.value)
                      }}
                    />
                    {errors.expType && touched.expType ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.expType}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-sm font-medium leading-6 text-gray-900">
                        {translate('start_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={options.selectedStartMonth}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setOptions((prev) => ({ ...prev, selectedStartMonth: e }))
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
                        selected={options.selectedStartYear}
                        onChange={(e: any) => {
                          setFieldValue('startYear', e.name)
                          setOptions((prev) => ({ ...prev, selectedStartYear: e }))

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
                        selected={options.selectedEndMonth}
                        onChange={(e: any) => {
                          setFieldValue('endMonth', e.name)
                          setOptions((prev) => ({ ...prev, selectedEndMonth: e }))

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
                        selected={options.selectedEndYear}
                        onChange={(e: any) => {
                          setFieldValue('endYear', e.name)
                          setOptions((prev) => ({ ...prev, selectedEndYear: e }))
                        }}
                      />
                      {errors.endYear && touched.endYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endYear}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-col">
                    <Checkbox label={translate('currently_work_here')} />
                    {errors.isWorkHere && touched.isWorkHere ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isWorkHere}
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="flex-col">
                    <InputField
                      type="textarea"
                      value={values.description}
                      label={translate('description')}
                      onChange={(e: any) => {
                        setFieldValue('description', e.target.value)
                      }}
                    />
                    {errors.description && touched.description ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.description}
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
