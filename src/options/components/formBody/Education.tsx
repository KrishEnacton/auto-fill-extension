import { Formik } from 'formik'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import * as Yup from 'yup'
import { counterEducationAndExperience, educationAtom } from '../../../atoms'
import { degrees, majors, months, startYears } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'
import { EducationProps } from '../../../global'
import AddIcon from '@heroicons/react/24/outline/PlusCircleIcon'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'

export default function Education({
  setUserInfo,
  education,
  EduCounter,
}: {
  setUserInfo: (userParams: EducationProps) => boolean
  education: EducationProps
  EduCounter: number
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const setCounter = useSetRecoilState(counterEducationAndExperience)
  const _setEducation = useSetRecoilState(educationAtom)

  const [options, setOptions] = useState({
    school_name: education.school_name ?? '',
    major: education.major ?? "",
    degree: education.degree ?? '',
    gpa: education.GPA ??'',
    startMonth: education.start_month ?? '',
    startYear: education.start_year ?? '',
    endMonth: education.end_month ?? '',
    endYear:  education.end_year ?? '',
  })

  const FormSchema = Yup.object().shape({
    school_name: Yup.string().required(translate('required_msg')),
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
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          setCounter((prev) => ({ ...prev, education: prev.education + 1 }))
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
          _setEducation((prev) => {
            if (Array.isArray(prev)) {
              return [
                ...prev,
                {
                  school_name: values.school_name,
                  major: values.major,
                  degree: values.degree,
                  GPA: values.gpa,
                  start_month: values.startMonth,
                  start_year: values.startYear,
                  end_month: values.endMonth,
                  end_year: values.endYear,
                },
              ]
            } else return prev
          })
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
                <FormTitle name={translate('education_history')} />
                <div className="text-[18px] my-5 text-left font-bold text-gray-700 flex justify-between">
                  <span>
                    {translate('education')} {EduCounter}
                  </span>
                  {EduCounter > 1 && (
                    <span className="flex">
                      <button
                        onClick={() =>
                          setCounter((prev) => ({ ...prev, education: prev.education + 1 }))
                        }
                      >
                        <AddIcon className="h-8 w-8" />
                      </button>
                      <button
                        onClick={() =>
                          setCounter((prev) => ({ ...prev, education: prev.education - 1 }))
                        }
                      >
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                    </span>
                  )}
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex space-x-5 mt-8">
                    <div className="flex-col">
                      <InputField
                        input_type="text"
                        value={values.school_name}
                        label={translate('school_name')}
                        onChange={(e: any) => {
                          setFieldValue('school_name', e.target.value)
                        }}
                        placeholder={'Please enter your school name'}
                      />
                      {errors.school_name && touched.school_name ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.school_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('Major')}
                      </div>
                      <InputDropdown
                        data={majors}
                        selected={majors.find(item => item.name == options.major)}
                        onChange={(e: any) => {
                          setFieldValue('major', e.name)
                          setOptions((prev) => ({ ...prev, major: e }))
                        }}
                        placeholder={'Please enter your major name'}
                      />
                      {errors.major && touched.major ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.major as any}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex space-x-5 !mt-8">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('degree')}
                      </div>
                      <InputDropdown
                        data={degrees}
                        selected={degrees.find(item => item.name == options.degree)}
                        onChange={(e: any) => {
                          setFieldValue('degree', e.name)
                          setOptions((prev) => ({ ...prev, degree: e }))
                        }}
                        placeholder={'Please enter your degree'}
                      />
                      {errors.degree && touched.degree ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.degree as any}
                        </div>
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
                        placeholder={'Please enter your current gpa'}
                      />
                      {errors.gpa && touched.gpa ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.gpa}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex space-x-5 !mt-8 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('start_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={months.find(item => item.name == options.startMonth)}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setOptions((prev) => ({ ...prev, startMonth: e }))
                        }}
                        placeholder={'Please enter start month of education'}
                      />
                      {errors.startMonth && touched.startMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startMonth as any}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('start_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={startYears.find(item => item.name == options.startYear)}
                        onChange={(e: any) => {
                          setFieldValue('startYear', e.name)
                          setOptions((prev) => ({ ...prev, startYear: e }))
                        }}
                        placeholder={'Please enter start year of education'}
                      />
                      {errors.startYear && touched.startYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.startYear as any}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex space-x-5 !mt-8 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('end_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={months.find(item => item.name == options.endMonth)}
                        onChange={(e: any) => {
                          setFieldValue('endMonth', e.name)
                          setOptions((prev) => ({ ...prev, endMonth: e }))
                        }}
                        placeholder={'Please enter end month of education'}
                      />
                      {errors.endMonth && touched.endMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endMonth as any}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('end_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={startYears.find(item => item.name == options.endYear)}
                        onChange={(e: any) => {
                          setFieldValue('endYear', e.name)
                          setOptions((prev) => ({ ...prev, endYear: e }))
                        }}
                        placeholder={'Please enter end year of education'}
                      />
                      {errors.endYear && touched.endYear ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endYear as any}
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
