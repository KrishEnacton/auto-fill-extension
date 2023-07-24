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
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="text-center space-y-3"
                >
                  <div className="flex space-x-5 mt-8">
                    <FormField
                      type={'text'}
                      fieldKey={'school_name'}
                      value={values?.school_name}
                      onChange={(e: any) =>
                        onChangeHandler(
                          e,
                          setFieldValue,
                          'school_name',
                          values,
                          generateRandomString(5),
                        )
                      }
                      error={errors?.school_name}
                      touched={touched?.school_name}
                      placeholder={'Please enter your school name'}
                      education={education}
                    />
                    <FormField
                      type="dropdown"
                      dataList={majors}
                      fieldKey={'major'}
                      selected={majors.find((item) => item.name == options.major)}
                      error={errors?.major}
                      touched={touched?.major}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'major', values)}
                      placeholder={'Please enter your major name'}
                      education={education}
                    />
                  </div>

                  <div className="flex space-x-5 ">
                    <FormField
                      type="dropdown"
                      dataList={degrees}
                      fieldKey={'degree'}
                      selected={degrees.find((item) => item.name == options.degree)}
                      error={errors?.degree}
                      touched={touched?.degree}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'degree', values)}
                      placeholder={'Please enter your Degree name'}
                      education={education}
                    />
                    <FormField
                      fieldKey={'GPA'}
                      error={errors?.GPA}
                      touched={touched?.GPA}
                      type="number"
                      value={values.GPA}
                      education={education}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'GPA', values)}
                      placeholder={'Please enter your current GPA'}
                    />
                  </div>

                  <div className="flex space-x-5  items-center">
                    <FormField
                      type="dropdown"
                      dataList={months}
                      fieldKey={'start_month'}
                      education={education}
                      selected={months.find((item) => item.name == options.start_month)}
                      error={errors?.start_month}
                      touched={touched?.start_month}
                      onChange={(e: any) =>
                        onChangeHandler(e, setFieldValue, 'start_month', values)
                      }
                      placeholder={'Please enter start month of education'}
                    />
                    <FormField
                      type="dropdown"
                      dataList={startYears}
                      fieldKey={'start_year'}
                      selected={startYears.find((item) => item.name == options.start_year)}
                      error={errors?.start_year}
                      education={education}
                      touched={touched?.start_year}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'start_year', values)}
                      placeholder={'Please enter start year of education'}
                    />
                  </div>
                  <div className="flex space-x-5  items-center">
                    <FormField
                      type="dropdown"
                      dataList={months}
                      fieldKey={'end_month'}
                      education={education}
                      selected={months.find((item) => item.name == options.end_month)}
                      error={errors?.end_month}
                      touched={touched?.end_month}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_month', values)}
                      placeholder={'Please enter End month of education'}
                    />
                    <FormField
                      type="dropdown"
                      dataList={startYears}
                      education={education}
                      fieldKey={'end_year'}
                      selected={startYears.find((item) => item.name == options.end_year)}
                      error={errors?.end_year}
                      touched={touched?.end_year}
                      onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_year', values)}
                      placeholder={'Please enter End year of education'}
                    />
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
                      <div className="flex items-center justify-between space-x-5 mt-8 w-full">
                        <div className="flex items-center justify-center">
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
                            customClass="bg-secondary_button hover:bg-secondary_button"
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
