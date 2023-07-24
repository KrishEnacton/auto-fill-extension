import { Formik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../../utils/translate'
import Checkbox from '../../core/Checkbox'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import InputField from '../../core/InputField'
import { experienceTypes, months, startYears } from '../../../../constants'
import InputDropdown from '../../dropdowns/InputDropdown'
import Textarea from '../../core/TextArea'
import { useRecoilState } from 'recoil'
import {
  ExperienceForm,
  experienceAtom,
  experienceListAtom,
  isFirstJobAtom,
  updateExpArray,
} from '../../../../atoms'
import { SetFieldValueType, UserInfo, WorkExperience } from '../../../../global'
import CustomModal from '../../generic/CustomModal'
import PrimaryBtn from '../../core/PrimaryBtn'
import AddMore from '../../core/AddMore'
import {
  generateRandomString,
  getMonthIndex,
  getNextTabName,
  notify,
  setFormFields,
  updateFormFields,
} from '../../../../utils'
import { checkObjectExists } from '../../../../utils/index'
import { useLocation, useNavigate } from 'react-router-dom'
import FormField from '../../core/FormField'

export default function WorkExp({
  setUserInfo,
  experienceElem,
  ExpCounter,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  experienceElem?: WorkExperience
  ExpCounter?: number
  getUserInfo?: () => UserInfo
}) {
  const [_experience, setExperience] = useRecoilState(experienceAtom)
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useRecoilState(ExperienceForm)
  const [next, setNext] = useState(false)
  const [locationCurrent, setLocationCurrent] = useState(experienceElem?.location ?? '')
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateExpArray)
  const [options, setOptions] = useState({
    isFirstJob: isFirstJob ?? false,
    company_name: experienceElem?.company_name ?? '',
    position_title: experienceElem?.position_title ?? '',
    experience_type: experienceElem?.experience_type ?? '',
    is_working_currently: experienceElem?.is_working_currently ?? false,
    location: experienceElem?.location ?? '',
    isRemote: false,
    description: experienceElem?.description ?? '',
    start_month: experienceElem?.start_month ?? '',
    start_year: experienceElem?.start_year ?? '',
    end_month: experienceElem?.end_month ?? '',
    end_year: experienceElem?.end_year ?? '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const FormSchema = Yup.object()
    .shape({
      company_name: Yup.string().required(translate('required_msg')),
      position_title: Yup.string().required(translate('required_msg')),
      experience_type: Yup.string().required(translate('required_msg')),
      description: Yup.string().required(translate('required_msg')),
      location: Yup.object().required(translate('required_msg')),
      isRemote: Yup.boolean().required(translate('required_msg')),
      isFirstJob: Yup.boolean().required(translate('required_msg')),
      is_working_currently: Yup.boolean().required(translate('required_msg')),
      start_month: Yup.string().required(translate('required_msg')),
      start_year: Yup.number().required(translate('required_msg')).integer(),
      end_month: Yup.string().test('required-when', translate('required_msg'), function (value) {
        const is_working_currently = this.resolve(Yup.ref('is_working_currently'))

        if (!is_working_currently) {
          return value !== undefined && value !== ''
        }

        return true
      }),
      end_year: Yup.number().test('required-when', translate('required_msg'), function (value) {
        const is_working_currently = this.resolve(Yup.ref('is_working_currently'))
        const isFirstJob = this.resolve(Yup.ref('isFirstJob'))

        if (!is_working_currently) {
          return value !== undefined
        }

        return true
      }),
    })
    .test('date-range', 'Start date must be before end date', function (values) {
      const { start_month, start_year, end_month, end_year } = values

      const startDate = new Date(start_year, getMonthIndex(start_month))
      if (end_year) {
        const endDate = new Date(end_year, getMonthIndex(end_month))

        if (startDate > endDate) {
          return this.createError({
            message: 'Start date must be before end date',
            path: 'start_month',
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

  function checkDuplicates(experiences: any, companyName: any, position_title: any) {
    for (const experience of experiences) {
      if (experience.company_name === companyName && experience.position_title === position_title) {
        return true
      }
    }
    return false
  }

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValueType,
    key: string,
    values: WorkExperience,
    id?: string,
  ) => {
    id
      ? setFormFields(e, setFieldValue, setExperience, setOptions, key, setNext, id)
      : setFormFields(e, setFieldValue, setExperience, setOptions, key, setNext)

    if (experienceElem) {
      updateFormFields(
        e,
        updateFormArray,
        experienceElem,
        setUpdateFormArray,
        key,
        checkObjectExists,
        values,
        setNext,
      )
    }
  }

  function onSubmitHandler(values: WorkExperience) {
    if (getUserInfo) {
      const res: any = getUserInfo()
      let isExpExists = false
      if (res?.experience || res?.experience?.length > 0) {
        isExpExists = checkDuplicates(
          res?.experience ? res.experience : [],
          values.company_name,
          values.position_title,
        )
      }

      if (!isExpExists || res.experience.length == 0 || res.experience == undefined) {
        if (!experienceElem) {
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
            const nextTab = getNextTabName(currentTab)
            navigate(`/?tab=${nextTab}`)
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
      } else {
        notify('Experience with this position already exists', 'error')
      }
    }
  }

  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div id={!experienceElem ? 'main-card' : ''} className="flex items-center justify-center">
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
                      `${
                        (!ExpCounter ? (!experiences ? 1 : experiences?.length + 1) : ExpCounter) ==
                        1
                          ? 'my-5'
                          : 'mt-8'
                      }`
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
                            confirm(experienceElem?.id)
                            if (show && experiences?.length > 0) {
                              setShow(false)
                            }
                          }}
                          id={'' + experienceElem?.id}
                          closeModal={closeModal}
                          isOpen={isOpen}
                          modal_title={`Delete this Education!`}
                          modal_description={`Are you sure you want to delete this Keyword?`}
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-5">
                    <FormField
                      type={'text'}
                      fieldKey={'company_name'}
                      value={values?.company_name}
                      onChange={(e: any) =>
                        onChangeHandler(
                          e,
                          setFieldValue,
                          'company_name',
                          values,
                          generateRandomString(5),
                        )
                      }
                      error={errors?.company_name}
                      touched={touched?.company_name}
                      placeholder={'Please enter your company name'}
                      formElem={experienceElem}
                    />
                    <FormField
                      type={'text'}
                      fieldKey={'position_title'}
                      value={values?.position_title}
                      onChange={(e: any) =>
                        onChangeHandler(e, setFieldValue, 'position_title', values)
                      }
                      error={errors?.position_title}
                      touched={touched?.position_title}
                      placeholder={'Please enter your position'}
                      formElem={experienceElem}
                    />
                  </div>
                  <div className="flex space-x-5  items-center">
                    <FormField
                      type="dropdown"
                      dataList={experienceTypes}
                      fieldKey={'experience_type'}
                      formElem={experienceElem}
                      selected={experienceTypes.find((item) => item.name == values.experience_type)}
                      error={errors?.experience_type}
                      touched={touched?.experience_type}
                      onChange={(e: any) =>
                        onChangeHandler(e, setFieldValue, 'experience_type', values)
                      }
                      placeholder={'Please enter your experience'}
                    />
                    <FormField
                      type="dropdown"
                      dataList={[]}
                      fieldKey={'location'}
                      formElem={experienceElem}
                      error={errors?.location}
                      touched={touched?.location}
                      placeholder={'Please enter your location'}
                      selected={locationCurrent}
                      onChange={(e: any) => {
                        onChangeHandler(e, setFieldValue, 'location', values)
                        setLocationCurrent(e)
                      }}
                      inputCustomClass={
                        values.isRemote ? '!bg-gray-200/80 pointer-events-none' : ''
                      }
                      getLocationsFromApi={true}
                    />
                  </div>

                  <div className="flex space-x-5  items-center">
                    <FormField
                      type="dropdown"
                      dataList={months}
                      fieldKey={'start_month'}
                      formElem={experienceElem}
                      error={errors?.start_month}
                      touched={touched?.start_month}
                      onChange={(e: any) =>
                        onChangeHandler(e, setFieldValue, 'start_month', values)
                      }
                      selected={months.find((item) => item.name == values.start_month)}
                      placeholder={'Select start month of experience'}
                    />
                    <FormField
                      type="dropdown"
                      dataList={startYears}
                      fieldKey={'start_year'}
                      formElem={experienceElem}
                      error={errors?.start_year}
                      touched={touched?.start_year}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'start_year', values)}
                      selected={startYears.find((item) => item.name == values.start_year)}
                      placeholder={'Select start year of experience'}
                    />
                  </div>
                  <div className="flex space-x-5  items-center">
                    <FormField
                      type="dropdown"
                      dataList={months}
                      fieldKey={'end_month'}
                      formElem={experienceElem}
                      error={errors?.end_month}
                      touched={touched?.end_month}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_month', values)}
                      selected={months.find((item) => item.name == values.end_month)}
                      placeholder={'Select end month of experience'}
                    />
                    <FormField
                      type="dropdown"
                      dataList={startYears}
                      fieldKey={'end_year'}
                      formElem={experienceElem}
                      error={errors?.end_year}
                      touched={touched?.end_year}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_year', values)}
                      selected={startYears.find((item) => item.name == values.end_year)}
                      placeholder={'Select start year of experience'}
                    />
                  </div>
                  <FormField
                    type="checkbox"
                    fieldKey={'is_working_currently'}
                    onChange={(e: any) =>
                      onChangeHandler(e, setFieldValue, 'is_working_currently', values)
                    }
                    id={experienceElem?.id}
                    formElem={experiences}
                  />
                  <FormField
                    type="textarea"
                    fieldKey={'description'}
                    value={values.description}
                    onChange={(e: any) => onChangeHandler(e, setFieldValue, 'description', values)}
                    error={errors?.description}
                    touched={touched?.description}
                    placeholder="Please enter experience description"
                  />

                  {!isFirstJob && !experienceElem && (
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

                      <div className="flex items-center justify-between mt-8 space-x-5 w-full">
                        <div className=" flex items-center justify-center">
                          <PrimaryBtn
                            type="submit"
                            customLoaderClass={'!h-4 !w-4'}
                            name={translate('save')}
                          />
                        </div>
                        <div className=" flex items-center justify-center">
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
