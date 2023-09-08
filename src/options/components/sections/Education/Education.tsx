import { Formik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as Yup from 'yup'
import { educationAtom, educationListAtom, showForm, updateArray } from '../../../../atoms'
import { translate } from '../../../../utils/translate'
import { EducationProps, SetFieldValueType, UserInfo } from '../../../../global'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import CustomModal from '../../generic/CustomModal'
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
import EducationForm from './Form'

export default function Education({
  setUserInfo,
  educationElem,
  EduCounter,
  onSubmiHandler,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  educationElem?: EducationProps
  EduCounter?: number
  onSubmiHandler?: () => void
  getUserInfo?: () => UserInfo
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [next, setNext] = useState(false)
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [educationList, setEducationList] = useRecoilState(educationListAtom)
  const [show, setShow] = useRecoilState(showForm)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)

  const [options, setOptions] = useState({
    school_name: educationElem?.school_name ?? '',
    major: educationElem?.major ?? '',
    degree: educationElem?.degree ?? '',
    GPA: educationElem?.GPA ?? '',
    start_month: educationElem?.start_month ?? '',
    start_year: educationElem?.start_year ?? '',
    end_month: educationElem?.end_month ?? '',
    end_year: educationElem?.end_year ?? '',
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
    const filtered = educationList.filter((item) => item.id !== index)
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

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValueType,
    key: string,
    values: EducationProps,
    id?: string,
  ) => {
    id
      ? setFormFields(e, setFieldValue, setEducation, setOptions, key, setNext, id)
      : setFormFields(e, setFieldValue, setEducation, setOptions, key, setNext)
    if (educationElem) {
      updateFormFields(
        e,
        updateFormArray,
        educationElem,
        setUpdateFormArray,
        key,
        checkObjectExists,
        values,
        setNext,
      )
    }
  }

  function _onSubmitHandler(values: any) {
    if (getUserInfo) {
      const res: any = getUserInfo()
      const hasMajor = res?.education?.some(
        (obj: any) => obj.major === values.major && obj.degree === values.degree,
      )
      if (!hasMajor || res.education == undefined || res.education.length == 0) {
        if (educationElem) {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== (educationElem[key] as EducationProps),
          )
          if (hasChanges) {
            const result = setUserInfo({
              education: educationList && [...educationList, _education],
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }
        } else {
          const result = setUserInfo({
            education: educationList ? [...educationList, _education] : [_education],
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
        onSubmit={(values) => _onSubmitHandler(values)}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div id={!educationElem ? 'main-card' : ''} className="mb-8">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <div
                  className={
                    'text-2xl  text-center font-bold text-gray-700 flex justify-between ' +
                    `${
                      (!EduCounter
                        ? !educationList
                          ? 1
                          : educationList?.length + 1
                        : EduCounter) == 1
                        ? 'mb-5'
                        : '!mt-8'
                    }`
                  }
                >
                  <span className="w-full">
                    {translate('education')}
                    {!EduCounter ? (!educationList ? 1 : educationList?.length + 1) : EduCounter}
                  </span>
                  {(educationElem || (show && educationList?.length > 0)) && (
                    <span className="flex">
                      <button type="button" onClick={openModal}>
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                      <CustomModal
                        confirm={() => {
                          confirm(educationElem?.id)
                          if (show && educationList?.length > 0) {
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
                  educationElem={educationElem}
                  dataSubmitted={dataSubmitted}
                  options={options}
                  handleSubmit={handleSubmit}
                  setDataSubmitted={setDataSubmitted}
                  setFieldValue={setFieldValue}
                  setNext={setNext}
                  setShow={setShow}
                  onSubmiHandler={_onSubmitHandler}
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
