import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Yup from 'yup'
import { addMore, educationAtom, educationCounter, educationListAtom } from '../../../atoms'
import { degrees, majors, months, startYears } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import InputDropdown from '../dropdowns/InputDropdown'
import { EducationProps, UserInfo } from '../../../global'

import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import CustomModal from '../generic/CustomModal'
import { notify } from '../../../utils'

export default function Education({
  setUserInfo,
  education,
  EduCounter,
}: {
  setUserInfo: any
  education?: EducationProps
  EduCounter: number
}) {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const setCounter = useSetRecoilState(educationCounter)

  const _setEducation = useSetRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)

  const [options, setOptions] = useState({
    id: EduCounter,
    school_name: education?.school_name ?? '',
    major: education?.major ?? '',
    degree: education?.degree ?? '',
    gpa: education?.GPA ?? '',
    startMonth: education?.start_month ?? '',
    startYear: education?.start_year ?? '',
    endMonth: education?.end_month ?? '',
    endYear: education?.end_year ?? '',
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

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function confirm(index: number) {
    console.log({ index })
    setLoading(true)
    setEducationList((prev) => {
      if (Array.isArray(prev)) {
        console.log(prev.filter((i) => i.id !== index))
        return prev.filter((i) => i.id !== index)
      } else return []
    })
    const result = setUserInfo({
      education: Array.isArray(_educationList)
        ? _educationList.filter((i) => i.id !== index)
        : _educationList,
    })
    if (result) {
      notify('Data Saved', 'success')
    }
    setLoading(false)
    setCounter((prev) => prev - 1)
    closeModal()
  }

  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log('called')
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <div className="text-[18px] my-5 text-left font-bold text-gray-700 flex justify-between">
                  <span>
                    {translate('education')} {EduCounter}
                  </span>
                  {EduCounter > 1 && (
                    <span className="flex">
                      <button onClick={openModal}>
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                      <CustomModal
                        confirm={() => confirm(EduCounter)}
                        loading={loading}
                        id={'' + EduCounter}
                        closeModal={closeModal}
                        isOpen={isOpen}
                        modal_title={`Delete this Education!`}
                        modal_description={`Are you sure you want to delete this education?`}
                      />
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
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, school_name: e.target.value, id: EduCounter }
                          })
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
                        selected={majors.find((item) => item.name == options.major)}
                        onChange={(e: any) => {
                          setFieldValue('major', e.name)
                          setOptions((prev) => ({ ...prev, major: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, major: e.name }
                          })
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
                        selected={degrees.find((item) => item.name == options.degree)}
                        onChange={(e: any) => {
                          setFieldValue('degree', e.name)
                          setOptions((prev) => ({ ...prev, degree: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, degree: e.name }
                          })
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
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, GPA: e.target.value }
                          })
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
                        selected={months.find((item) => item.name == options.startMonth)}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setOptions((prev) => ({ ...prev, startMonth: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, start_month: e.name }
                          })
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
                        selected={startYears.find((item) => item.name == options.startYear)}
                        onChange={(e: any) => {
                          setFieldValue('startYear', e.name)
                          setOptions((prev) => ({ ...prev, startYear: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, start_year: e.name }
                          })
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
                        selected={months.find((item) => item.name == options.endMonth)}
                        onChange={(e: any) => {
                          setFieldValue('endMonth', e.name)
                          setOptions((prev) => ({ ...prev, endMonth: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, end_month: e.name }
                          })
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
                        selected={startYears.find((item) => item.name == options.endYear)}
                        onChange={(e: any) => {
                          setFieldValue('endYear', e.name)
                          setOptions((prev) => ({ ...prev, endYear: e }))
                          _setEducation((prev: EducationProps) => {
                            return { ...prev, end_year: e.name }
                          })
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
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
