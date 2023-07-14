import { Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Yup from 'yup'
import {
  addMore,
  educationAtom,
  educationCounter,
  educationListAtom,
  selectedTabState,
  showForm,
  updateArray,
} from '../../../atoms'
import { degrees, majors, months, startYears } from '../../../constants'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'
import InputDropdown from '../dropdowns/InputDropdown'
import { EducationProps, UserInfo } from '../../../global'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import CustomModal from '../generic/CustomModal'
import PrimaryBtn from '../core/PrimaryBtn'
import { generateRandomString, getMonthIndex, getNextTabName, notify } from '../../../utils'
import AddMore from '../core/AddMore'
import { checkObjectExists } from '../../../content/Popup/autoFilling'

export default function Education({
  setUserInfo,
  education,
  EduCounter,
}: {
  setUserInfo: (userParams: any) => boolean
  education?: EducationProps
  EduCounter?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const setCounter = useSetRecoilState(educationCounter)
  const [next, setNext] = useState(false)
  const setAddMore = useSetRecoilState(addMore)
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [show, setShow] = useRecoilState(showForm)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)

  const [options, setOptions] = useState({
    school_name: education?.school_name ?? '',
    major: education?.major ?? '',
    degree: education?.degree ?? '',
    gpa: education?.GPA ?? '',
    startMonth: education?.start_month ?? '',
    startYear: education?.start_year ?? '',
    endMonth: education?.end_month ?? '',
    endYear: education?.end_year ?? '',
  })
  const FormSchema = Yup.object()
    .shape({
      school_name: Yup.string().required(translate('required_msg')),
      major: Yup.string().required(translate('required_msg')),
      degree: Yup.string().required(translate('required_msg')),
      gpa: Yup.number()
        .min(1, `${translate('min_msg')}`)
        .max(10, `${translate('max_msg')}`)
        .required(translate('required_msg')),
      startMonth: Yup.string().required(translate('required_msg')),
      startYear: Yup.number().required(translate('required_msg')).integer(),
      endMonth: Yup.string().required(translate('required_msg')),
      endYear: Yup.number().required(translate('required_msg')).integer(),
    })
    .test('date-range', 'Start date must be before end date', function (values) {
      const { startMonth, startYear, endMonth, endYear } = values

      const startDate = new Date(startYear, getMonthIndex(startMonth))
      const endDate = new Date(endYear, getMonthIndex(endMonth))

      if (startDate > endDate) {
        return this.createError({
          message: 'Start date must be before end date',
          path: 'startMonth',
        })
      }

      return true
    })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function confirm(index?: string) {
    const filtered = _educationList.filter((item) => item.id !== index)
    if (index !== '') {
      const updatedEducationList = filtered.map((item) => ({ ...item }))
      setEducationList(updatedEducationList)
      const result: any = setUserInfo({ education: updatedEducationList })
      if (result) {
        notify('Education deleted successfully', 'success')
      }
    }
    closeModal()
  }
  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          // setPostDataState(true)

          if (!education) {
            const hasChanges = Object.keys(values).some(
              //@ts-ignore
              (key: any) => values[key] !== (_education[key] as EducationProps),
            )
            if (hasChanges) {
              const result = setUserInfo({
                education: _educationList ? [..._educationList, _education] : [_education],
              })
              if (result) {
                notify('Data Saved', 'success')
              }
            }

            if (next) {
              const nextTab = getNextTabName(selectedTab)
              setSelectedTab(nextTab)
              setNext(false)
            }
            setDataSubmitted(true)

            setEducationList((prev) => {
              if (Array.isArray(prev)) {
                return [...prev, _education]
              } else return [_education]
            })
            setShow(false)
          }
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div id={!education ? 'main-card' : ''} className="mb-12">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <div
                  className={
                    'text-2xl text-center font-bold text-gray-700 flex justify-between ' +
                    `${EduCounter == 1 ? 'mb-5' : 'mt-7'}`
                  }
                >
                  <span className="w-full">
                    {translate('education')}{' '}
                    {!EduCounter ? (!_educationList ? 1 : _educationList.length + 1) : EduCounter}
                  </span>
                  {(education || (show && _educationList.length > 0)) && (
                    <span className="flex">
                      <button type="button" onClick={openModal}>
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                      <CustomModal
                        confirm={() => {
                          confirm(education ? education.id : _education && _education.id)
                          if (show && _educationList.length > 0) {
                            setShow(false)
                          }
                        }}
                        id={'' + EduCounter}
                        closeModal={closeModal}
                        isOpen={isOpen}
                        modal_title={`Delete this Education!`}
                        modal_description={`Are you sure you want to delete this Education?`}
                      />
                    </span>
                  )}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="text-center space-y-3"
                >
                  <div className="flex space-x-5 mt-8">
                    <div className="flex-col">
                      <InputField
                        input_type="text"
                        value={values.school_name}
                        label={translate('school_name')}
                        onChange={(e: any) => {
                          setFieldValue('school_name', e.target.value)

                          setEducation((prev: EducationProps) => {
                            return {
                              ...prev,
                              school_name: e.target.value,
                              id: generateRandomString(5),
                            }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, school_name: e.target.value }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    school_name: e.target.value,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, major: e.name }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, major: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    major: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, degree: e.name }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, degree: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    school_name: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, GPA: e.target.value }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, GPA: e.target.value }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    GPA: e.target.value,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, start_month: e.name }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, start_month: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    start_month: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, start_year: e.name }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, start_year: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    start_year: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, end_month: e.name }
                          })
                          setOptions((prev) => ({ ...prev, endMonth: e }))
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, end_month: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    end_month: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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
                          setEducation((prev: EducationProps) => {
                            return { ...prev, end_year: e.name }
                          })
                          if (education) {
                            if (!checkObjectExists(updateFormArray, education.id)) {
                              const newObj: any = { id: education.id, end_year: e.name }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === education.id) {
                                  return {
                                    ...obj,
                                    end_year: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
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

                  {!education && (
                    <div className="flex items-center flex-col justify-center space-x-5 w-full">
                      <AddMore
                        label={translate('add_more')}
                        onClick={() => {
                          if (dataSubmitted) {
                            setEducationList((prev) => {
                              if (Array.isArray(prev)) {
                                return [...prev, _education]
                              } else return [_education]
                            })
                            setDataSubmitted(false)
                            setShow(true)
                          } else {
                            notify('Please fill this education first', 'error')
                          }
                        }}
                      />
                      <div className="flex items-center justify-between space-x-5 w-full">
                        <div className="!mt-8 flex items-center justify-center">
                          <PrimaryBtn
                            type="submit"
                            customLoaderClass={'!h-4 !w-4'}
                            name={translate('save')}
                          />
                        </div>
                        <div className="!mt-8 flex items-center justify-center">
                          <PrimaryBtn
                            customLoaderClass={'!h-4 !w-4'}
                            name={translate('next')}
                            type="submit"
                            onClick={() => {
                              setNext(true)
                            }}
                            customClass="bg-secondary_button hover:bg-secondary_button/80"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
