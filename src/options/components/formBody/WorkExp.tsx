import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import Checkbox from '../core/Checkbox'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import InputField from '../core/InputField'
import { experienceTypes, months, startYears } from '../../../constants'
import InputDropdown from '../dropdowns/InputDropdown'
import Textarea from '../core/TextArea'
import { useRecoilState } from 'recoil'
import {
  ExperienceForm,
  experienceAtom,
  experienceListAtom,
  isFirstJobAtom,
  selectedTabState,
  updateExpArray,
} from '../../../atoms'
import { UserInfo, WorkExperience } from '../../../global'
import CustomModal from '../generic/CustomModal'
import PrimaryBtn from '../core/PrimaryBtn'
import AddMore from '../core/AddMore'
import { generateRandomString, getMonthIndex, getNextTabName, notify } from '../../../utils'
import { checkObjectExists } from '../../../content/Popup/autoFilling'

export default function WorkExp({
  setUserInfo,
  experience,
  ExpCounter,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  experience?: WorkExperience
  ExpCounter?: number
  getUserInfo?: () => UserInfo
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [_experience, setExperience] = useRecoilState(experienceAtom)
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useRecoilState(ExperienceForm)
  const [next, setNext] = useState(false)
  const [locationCurrent, setLocationCurrent] = useState(experience?.location ?? '')
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateExpArray)
  const [options, setOptions] = useState({
    isFirstJob: isFirstJob ?? false,
    nameCom: experience?.company_name ?? '',
    positionTitle: experience?.position_title ?? '',
    expType: experience?.experience_type ?? '',
    isWorkHere: experience?.is_working_currently ?? false,
    location: experience?.location?.name ?? '',
    isRemote: false,
    description: experience?.description ?? '',
    startMonth: experience?.start_month ?? '',
    startYear: experience?.start_year ?? '',
    endMonth: experience?.end_month ?? '',
    endYear: experience?.end_year ?? '',
  })

  const FormSchema = Yup.object()
    .shape({
      nameCom: Yup.string().required(translate('required_msg')),
      positionTitle: Yup.string().required(translate('required_msg')),
      expType: Yup.string().required(translate('required_msg')),
      description: Yup.string().required(translate('required_msg')),
      location: Yup.string().required(translate('required_msg')),
      isRemote: Yup.boolean().required(translate('required_msg')),
      isFirstJob: Yup.boolean().required(translate('required_msg')),
      isWorkHere: Yup.boolean().required(translate('required_msg')),
      startMonth: Yup.string().required(translate('required_msg')),
      startYear: Yup.number().required(translate('required_msg')).integer(),
      endMonth: Yup.string().test('required-when', translate('required_msg'), function (value) {
        const isWorkHere = this.resolve(Yup.ref('isWorkHere'))
        const isFirstJob = this.resolve(Yup.ref('isFirstJob'))

        if (!isWorkHere) {
          return value !== undefined && value !== ''
        }

        return true
      }),
      endYear: Yup.number().test('required-when', translate('required_msg'), function (value) {
        const isWorkHere = this.resolve(Yup.ref('isWorkHere'))
        const isFirstJob = this.resolve(Yup.ref('isFirstJob'))

        if (!isWorkHere) {
          return value !== undefined
        }

        return true
      }),
    })
    .test('date-range', 'Start date must be before end date', function (values) {
      const { startMonth, startYear, endMonth, endYear } = values

      const startDate = new Date(startYear, getMonthIndex(startMonth))
      if (endYear) {
        const endDate = new Date(endYear, getMonthIndex(endMonth))

        if (startDate > endDate) {
          return this.createError({
            message: 'Start date must be before end date',
            path: 'startMonth',
          })
        }
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
    if (!index) return
    const filtered = experiences.filter((item) => item.id != index)
    if (index != '') {
      setExperiences((prev) => {
        if (Array.isArray(prev)) {
          return filtered
        } else return []
      })
      const result: any = setUserInfo({ experience: filtered })
      if (result) {
        notify('Experience deleted successfully', 'success')
      }
    }
    closeModal()
  }
  function checkDuplicates(experiences: any, companyName: any, positionTitle: any) {
    for (const experience of experiences) {
      if (experience.company_name === companyName && experience.position_title === positionTitle) {
        return 'error'
      }
    }
    return 'success'
  }
  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
          if (getUserInfo) {
            const res: any = getUserInfo()
            const isExpExists = checkDuplicates(
              res.experience,
              values.nameCom,
              values.positionTitle,
            )
            if (isExpExists == 'error') {
              notify('Experience with this position already exists', 'error')
            } else {
              if (!experience) {
                const hasChanges = Object.keys(values).some(
                  //@ts-ignore
                  (key: any) => values[key] !== (_experience[key] as WorkExperience),
                )
                if (hasChanges) {
                  const result = setUserInfo({
                    experience: experiences ? [...experiences, _experience] : [_experience],
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
                setExperiences((prev) => {
                  if (Array.isArray(prev)) {
                    return [...prev, _experience]
                  } else return [_experience]
                })
                setShow(false)
              }
            }
          }
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div id={!experience ? 'main-card' : ''} className="flex items-center justify-center">
            <div className="w-full text-black text-center mb-12">
              {!values.isFirstJob && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="text-center space-y-3"
                >
                  <div
                    className={
                      'text-2xl text-center font-bold text-gray-700 flex justify-between ' +
                      `${ExpCounter == 1 ? 'my-5' : 'mt-7'}`
                    }
                  >
                    <span className="w-full">
                      {translate('experience')}{' '}
                      {!ExpCounter ? (!experiences ? 1 : experiences?.length + 1) : ExpCounter}
                    </span>
                    {((ExpCounter && ExpCounter > 0) || (show && experiences?.length > 0)) && (
                      <span className="flex">
                        <button type="button" onClick={openModal}>
                          <DeleteIcon className="h-8 w-8" />
                        </button>
                        <CustomModal
                          confirm={() => {
                            confirm(experience?.id)
                            if (show && experiences?.length > 0) {
                              setShow(false)
                            }
                          }}
                          id={'' + experience?.id}
                          closeModal={closeModal}
                          isOpen={isOpen}
                          modal_title={`Delete this Education!`}
                          modal_description={`Are you sure you want to delete this Keyword?`}
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex-col">
                      <InputField
                        input_type="text"
                        value={values.nameCom}
                        label={translate('company_name')}
                        onChange={(e: any) => {
                          setFieldValue('nameCom', e.target.value)
                          if (!experience) {
                            setExperience((prev: any) => {
                              return {
                                ...prev,
                                company_name: e.target.value,
                                id: generateRandomString(5),
                              }
                            })
                          }
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                company_name: e.target.value,
                                position_title: values.positionTitle,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    company_name: e.target.value,
                                    position_title: values.positionTitle,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        placeholder="Please enter your company name"
                      />

                      {experience ? (
                        <>
                          {errors.nameCom ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.nameCom}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.nameCom && touched.nameCom ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.nameCom}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="flex-col">
                      <InputField
                        input_type="text"
                        value={values.positionTitle}
                        label={translate('position_title')}
                        onChange={(e: any) => {
                          setFieldValue('positionTitle', e.target.value)
                          if (!experience) {
                            setExperience((prev: WorkExperience) => {
                              return { ...prev, position_title: e.target.value }
                            })
                          }
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                position_title: e.target.value,
                                company_name: values.nameCom,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    position_title: e.target.value,
                                    company_name: values.nameCom,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        placeholder="Please enter your position"
                      />

                      {experience ? (
                        <>
                          {errors.positionTitle ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.positionTitle}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.positionTitle && touched.positionTitle ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.positionTitle}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-5 !mt-8 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('experience_type')}
                      </div>
                      <InputDropdown
                        data={experienceTypes}
                        selected={experienceTypes.find((item) => item.name == values.expType)}
                        onChange={(e: any) => {
                          setFieldValue('expType', e.name)
                          setOptions((prev) => ({ ...prev, expType: e.name }))
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, experience_type: e.name }
                          })
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                experience_type: e.name,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    experience_type: e.name,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        placeholder={'Please enter your experience'}
                      />

                      {experience ? (
                        <>
                          {errors.expType ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.expType}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.expType && touched.expType ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.expType}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className={'flex-col' + `${values.isRemote ? 'pointer-events-none' : ''}`}>
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('location')}
                      </div>

                      <InputDropdown
                        data={[]}
                        selected={locationCurrent}
                        onChange={(e: any) => {
                          setFieldValue('location', e.name)
                          setOptions((prev) => ({ ...prev, location: e }))
                          setLocationCurrent(e)
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, location: e }
                          })
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                location: e,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    location: e,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        inputCustomClass={
                          values.isRemote ? '!bg-gray-200/80 pointer-events-none' : ''
                        }
                        getLocationsFromApi={true}
                        placeholder={'Select start month of experience'}
                      />

                      {experience ? (
                        <>
                          {errors.location ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.location}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.location && touched.location ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.location}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-5 !mt-8 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('start_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={months.find((item) => item.name == values.startMonth)}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setOptions((prev) => ({ ...prev, startMonth: e.name }))
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, start_month: e.name }
                          })
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                start_month: e.name,
                                start_year: values.startYear,
                                end_month: values.endMonth,
                                end_year: values.endYear,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    start_month: e.name,
                                    start_year: values.startYear,
                                    end_month: values.endMonth,
                                    end_year: values.endYear,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        placeholder={'Select start month of experience'}
                      />

                      {experience ? (
                        <>
                          {errors.startMonth ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.startMonth}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.startMonth && touched.startMonth ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.startMonth}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('start_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={startYears.find((item) => item.name == values.startYear)}
                        onChange={(e: any) => {
                          setFieldValue('startYear', e.name)
                          setOptions((prev) => ({ ...prev, startYear: e }))
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, start_year: e.name }
                          })
                          if (experience) {
                            if (!checkObjectExists(updateFormArray, experience.id)) {
                              const newObj: any = {
                                id: experience.id,
                                start_year: e.name,
                                start_month: values.startMonth,
                                end_month: values.endMonth,
                                end_year: values.endYear,
                              }
                              setUpdateFormArray((prev: any) => [...prev, newObj])
                            } else {
                              const updatedArray = updateFormArray.map((obj: any) => {
                                if (obj.id === experience.id) {
                                  return {
                                    ...obj,
                                    start_year: e.name,
                                    start_month: values.startMonth,
                                    end_month: values.endMonth,
                                    end_year: values.endYear,
                                  }
                                }
                                return obj
                              })
                              setUpdateFormArray(updatedArray)
                            }
                          }
                        }}
                        placeholder={'Select start year of experience'}
                      />

                      {experience ? (
                        <>
                          {errors.startYear ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.startYear}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.startYear && touched.startYear ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.startYear}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-5 !mt-8 items-center">
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('end_month')}
                      </div>
                      <InputDropdown
                        data={months}
                        selected={months.find((item) => item.name == values.endMonth)}
                        onChange={(e: any) => {
                          setFieldValue('endMonth', e.name)
                          if (values.isWorkHere) {
                            setExperience((prev: WorkExperience) => {
                              return { ...prev, end_month: '' }
                            })
                          } else {
                            setExperience((prev: WorkExperience) => {
                              return { ...prev, end_month: e.name }
                            })
                            if (experience) {
                              if (!checkObjectExists(updateFormArray, experience.id)) {
                                const newObj: any = {
                                  id: experience.id,
                                  end_month: e.name,
                                  start_year: values.startYear,
                                  start_month: values.startMonth,
                                  end_year: values.endYear,
                                }
                                setUpdateFormArray((prev: any) => [...prev, newObj])
                              } else {
                                const updatedArray = updateFormArray.map((obj: any) => {
                                  if (obj.id === experience.id) {
                                    return {
                                      ...obj,
                                      end_month: e.name,
                                      start_year: values.startYear,
                                      start_month: values.startMonth,
                                      end_year: values.endYear,
                                    }
                                  }
                                  return obj
                                })
                                setUpdateFormArray(updatedArray)
                              }
                            }
                          }
                          setOptions((prev) => ({ ...prev, endMonth: e }))
                        }}
                        placeholder={'Select end month of experience'}
                        inputCustomClass={`${
                          values.isWorkHere ? '!bg-gray-200/80 pointer-events-none' : ''
                        }`}
                      />

                      {experience ? (
                        <>
                          {errors.endMonth ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.endMonth}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.endMonth && touched.endMonth ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.endMonth}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="flex-col">
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('end_year')}
                      </div>
                      <InputDropdown
                        data={startYears}
                        selected={startYears.find((item) => item.name == values.endYear)}
                        onChange={(e: any) => {
                          setFieldValue('endYear', e.name)
                          setOptions((prev) => ({ ...prev, endYear: e }))
                          if (values.isWorkHere) {
                            setExperience((prev: WorkExperience) => {
                              return { ...prev, end_year: '' }
                            })
                          } else {
                            setExperience((prev: WorkExperience) => {
                              return { ...prev, end_year: e.name }
                            })
                            if (experience) {
                              if (!checkObjectExists(updateFormArray, experience.id)) {
                                const newObj: any = {
                                  id: experience.id,
                                  end_year: e.name,
                                  end_month: values.endMonth,
                                  start_year: values.startYear,
                                  start_month: values.startMonth,
                                }
                                setUpdateFormArray((prev: any) => [...prev, newObj])
                              } else {
                                const updatedArray = updateFormArray.map((obj: any) => {
                                  if (obj.id === experience.id) {
                                    return {
                                      ...obj,
                                      end_year: e.name,
                                      end_month: values.endMonth,
                                      start_year: values.startYear,
                                      start_month: values.startMonth,
                                    }
                                  }
                                  return obj
                                })
                                setUpdateFormArray(updatedArray)
                              }
                            }
                          }
                        }}
                        inputCustomClass={`${
                          values.isWorkHere ? '!bg-gray-200/80 pointer-events-none' : ''
                        }`}
                        placeholder={'Select end year of experience'}
                      />

                      {experience ? (
                        <>
                          {errors.endYear ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.endYear}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {errors.endYear && touched.endYear ? (
                            <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                              {errors.endYear}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-col">
                    <Checkbox
                      label={translate('currently_work_here')}
                      value={values.isWorkHere}
                      id={ExpCounter}
                      onChange={(e: any) => {
                        setExperience((prev: WorkExperience) => {
                          return { ...prev, is_working_currently: e.target.checked }
                        })
                        if (experience) {
                          if (!checkObjectExists(updateFormArray, experience.id)) {
                            const newObj: any = {
                              id: experience.id,
                              is_working_currently: e.target.checked,
                            }
                            setUpdateFormArray((prev: any) => [...prev, newObj])
                          } else {
                            const updatedArray = updateFormArray.map((obj: any) => {
                              if (obj.id === experience.id) {
                                return {
                                  ...obj,
                                  is_working_currently: e.target.checked,
                                }
                              }
                              return obj
                            })
                            setUpdateFormArray(updatedArray)
                          }
                        }
                        setFieldValue('isWorkHere', e.target.checked)
                      }}
                      experiences={experiences}
                    />
                  </div>

                  <div className="flex-col w-full">
                    <Textarea
                      value={values.description}
                      label={translate('description')}
                      onChange={(e: any) => {
                        setFieldValue('description', e.target.value)
                        setExperience((prev: WorkExperience) => {
                          return { ...prev, description: e.target.value }
                        })
                        if (experience) {
                          if (!checkObjectExists(updateFormArray, experience.id)) {
                            const newObj: any = {
                              id: experience.id,
                              description: e.target.value,
                            }
                            setUpdateFormArray((prev: any) => [...prev, newObj])
                          } else {
                            const updatedArray = updateFormArray.map((obj: any) => {
                              if (obj.id === experience.id) {
                                return {
                                  ...obj,
                                  description: e.target.value,
                                }
                              }
                              return obj
                            })
                            setUpdateFormArray(updatedArray)
                          }
                        }
                      }}
                      placeholder="Please enter experience description"
                    />

                    {experience ? (
                      <>
                        {errors.description ? (
                          <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                            {errors.description}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {errors.description && touched.description ? (
                          <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                            {errors.description}
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  {!isFirstJob && !experience && (
                    <div className="flex items-center flex-col justify-center space-x-5 w-full">
                      <AddMore
                        label={translate('add_more')}
                        onClick={() => {
                          if (dataSubmitted) {
                            setExperiences((prev: any) => {
                              if (Array.isArray(prev)) {
                                return [...prev, _experience]
                              } else return [_experience]
                            })
                            setDataSubmitted(false)
                            setShow(true)
                          } else {
                            notify('Please fill this experience first', 'error')
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
              )}
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
