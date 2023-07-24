import { Formik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../../utils/translate'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import { experienceTypes, months, startYears } from '../../../../constants'
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
import { ExprienceForm } from './Form'

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
              <div
                className={
                  'text-2xl text-center font-bold text-gray-700 flex justify-between ' +
                  `${
                    (!ExpCounter ? (!experiences ? 1 : experiences?.length + 1) : ExpCounter) == 1
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
              {!values.isFirstJob && (
                <ExprienceForm
                  isFirstJob={isFirstJob}
                  onChangeHandler={onChangeHandler}
                  setExperiences={setExperiences}
                  setLocationCurrent={setLocationCurrent}
                  locationCurrent={locationCurrent}
                  generateRandomString={generateRandomString}
                  errors={errors}
                  touched={touched}
                  values={values}
                  dataSubmitted={dataSubmitted}
                  options={options}
                  handleSubmit={handleSubmit}
                  setDataSubmitted={setDataSubmitted}
                  setFieldValue={setFieldValue}
                  setNext={setNext}
                  setShow={setShow}
                  experienceElem={_experience}
                />
              )}
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
