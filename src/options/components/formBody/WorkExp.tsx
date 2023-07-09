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
import Textarea from '../core/TextArea'

export default function WorkExp() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [options, setOptions] = useState({
    selectedStartMonth: '' as any,
    selectedStartYear: '' as any,
    selectedEndMonth: '' as any,
    selectedEndYear: '' as any,
  })
  const FormSchema = Yup.object().shape({
    nameCom: Yup.string().required(translate('required_msg')),
    positionType: Yup.string().required(translate('required_msg')),
    expType: Yup.string().required(translate('required_msg')),
    description: Yup.string().required(translate('required_msg')),
    startMonth: Yup.string().required(translate('required_msg')),
    startYear: Yup.string().required(translate('required_msg')),
    endMonth: Yup.string().required(translate('required_msg')),
    endYear: Yup.string().required(translate('required_msg')),
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
                    {/* {errors.isFirstJob && touched.isFirstJob ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isFirstJob}
                      </div>
                    ) : null} */}
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.nameCom}
                      label={translate('company_name')}
                      onChange={(e: any) => {
                        setFieldValue('nameCom', e.target.value)
                      }}
                      placeholder="Please enter your company name"
                    />
                    {errors.nameCom && touched.nameCom ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.nameCom}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.positionTitle}
                      label={translate('position_title')}
                      onChange={(e: any) => {
                        setFieldValue('positionTitle', e.target.value)
                      }}
                      placeholder="Please enter your position"
                    />
                    {errors.positionTitle && touched.positionTitle ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.positionTitle}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.expType}
                      label={translate('experience_type')}
                      onChange={(e: any) => {
                        setFieldValue('expType', e.target.value)
                      }}
                      placeholder="Please enter your experience"
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
                        placeholder={'Select start month of experience'}
                      />
                      {errors.startMonth && touched.startMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startMonth as React.ReactNode}
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
                        placeholder={'Select start year of experience'}
                      />
                      {errors.startYear && touched.startYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startYear as React.ReactNode}
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
                        placeholder={'Select end month of experience'}
                      />
                      {errors.endMonth && touched.endMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endMonth as React.ReactNode}
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
                        placeholder={'Select end year of experience'}
                      />
                      {errors.endYear && touched.endYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endYear as React.ReactNode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-col">
                    <Checkbox label={translate('currently_work_here')} />
                    {/* {errors.isWorkHere && touched.isWorkHere ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isWorkHere}
                      </div>
                    ) : null} */}
                  </div>

                  <div className="flex-col">
                    {/* <InputField
                      input_type="textarea"
                      value={values.description}
                      label={translate('description')}
                      onChange={(e: any) => {
                        setFieldValue('description', e.target.value)
                      }}
                      placeholder="Please enter experience description"
                    /> */}
                    <Textarea
                      value={values.description}
                      label={translate('description')}
                      onChange={(e: any) => {
                        setFieldValue('description', e.target.value)
                      }}
                      placeholder="Please enter experience description"

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
