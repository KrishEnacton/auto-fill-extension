import { Formik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as Yup from 'yup'
import { educationAtom, educationListAtom, showForm, updateArray } from '../../../../atoms'
import { degrees, majors, months, startYears } from '../../../../constants'
import { translate } from '../../../../utils/translate'
import { EducationProps, UserInfo } from '../../../../global'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import CustomModal from '../../generic/CustomModal'
import PrimaryBtn from '../../core/PrimaryBtn'
import {
  generateRandomString,
  getMonthIndex,
  getNextTabName,
  notify,
  setFormFields,
  updateFormFields,
} from '../../../../utils'
import AddMore from '../../core/AddMore'
import { checkObjectExists } from '../../../../utils/index'
import FormField from '../../core/FormField'
import { useLocation, useNavigate } from 'react-router-dom'
import EducationForm from './EducationForm'

export default function Education({
  setUserInfo,
  education,
  EduCounter,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  education?: EducationProps
  EduCounter?: number
  getUserInfo?: () => UserInfo
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [next, setNext] = useState(false)
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [show, setShow] = useRecoilState(showForm)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)

  const [options, setOptions] = useState({
    school_name: education?.school_name ?? '',
    major: education?.major ?? '',
    degree: education?.degree ?? '',
    GPA: education?.GPA ?? '',
    start_month: education?.start_month ?? '',
    start_year: education?.start_year ?? '',
    end_month: education?.end_month ?? '',
    end_year: education?.end_year ?? '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const FormSchema = Yup.object()
    .shape({
      school_name: Yup.string().required(translate('required_msg')),
      major: Yup.string().required(translate('required_msg')),
      degree: Yup.string().required(translate('required_msg')),
      GPA: Yup.number()
        .min(1, `${translate('min_msg')}`)
        .max(10, `${translate('max_msg')}`)
        .required(translate('required_msg')),
      start_month: Yup.string().required(translate('required_msg')),
      start_year: Yup.number().required(translate('required_msg')).integer(),
      end_month: Yup.string().required(translate('required_msg')),
      end_year: Yup.number().required(translate('required_msg')).integer(),
    })
    .test('date-range', 'Start date must be before end date', function (values) {
      const { start_month, start_year, end_month, end_year } = values

      const startDate = new Date(start_year, getMonthIndex(start_month))
      const endDate = new Date(end_year, getMonthIndex(end_month))

      if (startDate > endDate) {
        return this.createError({
          message: 'Start date must be before end date',
          path: 'start_month',
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
    if (!index) return
    if (index !== '') {
      const updatedEducationList = filtered.map((item) => ({ ...item }))
      setEducationList((prev) => {
        return prev.filter((item) => item.id !== index)
      })
      const result: any = setUserInfo({ education: updatedEducationList })
      if (result) {
        notify('Education deleted successfully', 'success')
      }
    }
    closeModal()
  }

  function onChangeHandler(
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    key: string,
    values: {
      school_name: string
      major: string
      degree: string
      GPA: string
      start_month: string
      start_year: string
      end_month: string
      end_year: string
    },
    id?: string,
  ) {
    id
      ? setFormFields(e, setFieldValue, setEducation, setOptions, key, setNext, id)
      : setFormFields(e, setFieldValue, setEducation, setOptions, key, setNext)
    if (education) {
      updateFormFields(
        e,
        updateFormArray,
        education,
        setUpdateFormArray,
        key,
        checkObjectExists,
        values,
        setNext,
      )
    }
  }

  function onSubmitHandler(values: any) {
    if (getUserInfo) {
      const res: any = getUserInfo()
      const hasMajor = res?.education?.some(
        (obj: any) => obj.major === values.major && obj.degree === values.degree,
      )
      if (!hasMajor || res.education == undefined || res.education.length == 0) {
        if (education) {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== (education[key] as EducationProps),
          )
          if (hasChanges) {
            const result = setUserInfo({
              education: _educationList && [..._educationList, _education],
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }
        } else {
          const result = setUserInfo({
            education: _educationList ? [..._educationList, _education] : [_education],
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
        setEducationList((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, _education]
          } else return [_education]
        })
        setShow(false)
      } else {
        notify('Education with this major & degree already exists', 'error')
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
          <div id={!education ? 'main-card' : ''} className="mb-8">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <div
                  className={
                    'text-2xl  text-center font-bold text-gray-700 flex justify-between ' +
                    `${
                      (!EduCounter
                        ? !_educationList
                          ? 1
                          : _educationList?.length + 1
                        : EduCounter) == 1
                        ? 'mb-5'
                        : '!mt-8'
                    }`
                  }
                >
                  <span className="w-full">
                    {translate('education')}
                    {!EduCounter ? (!_educationList ? 1 : _educationList?.length + 1) : EduCounter}
                  </span>
                  {(education || (show && _educationList?.length > 0)) && (
                    <span className="flex">
                      <button type="button" onClick={openModal}>
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                      <CustomModal
                        confirm={() => {
                          confirm(education?.id)
                          if (show && _educationList?.length > 0) {
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
                <EducationForm
                  onChangeHandler={onChangeHandler}
                  generateRandomString={generateRandomString}
                  errors={errors}
                  touched={touched}
                  values={values}
                  education={education}
                  dataSubmitted={dataSubmitted}
                  options={options}
                  handleSubmit={handleSubmit}
                  setEducationList={setEducationList}
                  setDataSubmitted={setDataSubmitted}
                  setFieldValue={setFieldValue}
                  setNext={setNext}
                  setShow={setShow}
                  educationItem={_education}
                />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
