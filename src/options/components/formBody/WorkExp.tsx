import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import Checkbox from '../core/Checkbox'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import InputField from '../core/InputField'
import FormTitle from '../generic/FormTitle'
import { experienceTypes, months, startYears } from '../../../constants'
import InputDropdown from '../dropdowns/InputDropdown'
import Textarea from '../core/TextArea'
import { useRecoilState } from 'recoil'
import {
  experienceAtom,
  experienceListAtom,
  isFirstJobAtom,
  selectedTabState,
} from '../../../atoms'
import useLocation from '../../hooks/use-location'
import { WorkExperience } from '../../../global'
import CustomModal from '../generic/CustomModal'
import PrimaryBtn from '../core/PrimaryBtn'
import AddMore from '../core/AddMore'
import { getNextTabName, notify } from '../../../utils'

export default function WorkExp({
  setUserInfo,
  experience,
  ExpCounter,
}: {
  setUserInfo: (userParams: any) => boolean
  experience?: WorkExperience
  ExpCounter?: number
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [_experience, setExperience] = useRecoilState(experienceAtom)
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState({
    isFirstJob: isFirstJob ?? false,
    nameCom: experience?.company_name ?? '',
    positionTitle: experience?.position_title ?? '',
    expType: experience?.experience_type ?? '',
    isWorkHere: experience?.is_working_currently ?? false,
    location: '',
    isRemote: false,
    description: experience?.description ?? '',
    startMonth: experience?.start_month ?? '',
    startYear: experience?.start_year ?? '',
    endMonth: experience?.end_month ?? '',
    endYear: experience?.end_year ?? '',
  })
  const FormSchema = Yup.object().shape({
    nameCom: Yup.string().required(translate('required_msg')),
    positionTitle: Yup.string().required(translate('required_msg')),
    expType: Yup.string().required(translate('required_msg')),
    description: Yup.string().required(translate('required_msg')),
    startMonth: Yup.string().required(translate('required_msg')),
    startYear: Yup.string().required(translate('required_msg')),
    endMonth: Yup.string().required(translate('required_msg')),
    endYear: Yup.string().required(translate('required_msg')),
    location: Yup.string().required(translate('required_msg')),
    isRemote: Yup.boolean().required(translate('required_msg')),
    isFirstJob: Yup.boolean().required(translate('required_msg')),
    isWorkHere: Yup.boolean().required(translate('required_msg')),
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  async function confirm(index: number) {
    setExperiences((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter((i) => i.id != index)
      } else return []
    })
    setUserInfo({ education: experiences.filter((item) => item.id != index) })
    closeModal()
  }

  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          // setCounter((prev) => ({ ...prev, experience: prev.experience + 1 }))
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
          console.log(_experience)
          if (!experience) {
            const result = setUserInfo({
              experience: experiences ? [...experiences, _experience] : [_experience],
            })
            if (result) {
              notify('Data Saved', 'success')
            }

            setDataSubmitted(true)
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
                    {ExpCounter && ExpCounter > 0 && (
                      <span className="flex">
                        <button onClick={openModal}>
                          <DeleteIcon className="h-8 w-8" />
                        </button>
                        <CustomModal
                          confirm={() => confirm(ExpCounter)}
                          id={'' + ExpCounter}
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
                          setExperience((prev: WorkExperience) => {
                            return {
                              ...prev,
                              company_name: e.target.value,
                              id: experiences ? experiences.length : 0,
                            }
                          })
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
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, position_title: e.target.value }
                          })
                        }}
                        placeholder="Please enter your position"
                      />
                      {errors.positionTitle && touched.positionTitle ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.positionTitle}
                        </div>
                      ) : null}
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
                          setOptions((prev) => ({ ...prev, expType: e }))
                          setExperience((prev: WorkExperience) => {
                            console.log({ e })
                            return { ...prev, experience_type: e.name }
                          })
                        }}
                        placeholder={'Please enter your experience'}
                      />
                      {errors.expType && touched.expType ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.expType as any}
                        </div>
                      ) : null}
                    </div>
                    <div className={'flex-col' + `${values.isRemote ? 'pointer-events-none' : ''}`}>
                      <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                        {translate('location')}
                      </div>

                      <InputDropdown
                        data={[]}
                        selected={options.location}
                        onChange={(e: any) => {
                          setFieldValue('location', e.name)
                          setOptions((prev) => ({ ...prev, location: e }))
                        }}
                        inputCustomClass={
                          values.isRemote ? '!bg-gray-200/80 pointer-events-none' : ''
                        }
                        getLocationsFromApi={true}
                        placeholder={'Select start month of experience'}
                      />
                      {errors.location && touched.location ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.location as React.ReactNode}
                        </div>
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
                        selected={months.find((item) => item.name == values.startMonth)}
                        onChange={(e: any) => {
                          setFieldValue('startMonth', e.name)
                          setOptions((prev) => ({ ...prev, startMonth: e }))
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, start_month: e.name }
                          })
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
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, end_month: e.name }
                          })
                          setOptions((prev) => ({ ...prev, endMonth: e }))
                        }}
                        placeholder={'Select end month of experience'}
                        inputCustomClass={`${
                          values.isWorkHere ? '!bg-gray-200/80 pointer-events-none' : ''
                        }`}
                      />
                      {errors.endMonth && touched.endMonth ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.endMonth as React.ReactNode}
                        </div>
                      ) : null}
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
                          setExperience((prev: WorkExperience) => {
                            return { ...prev, end_year: e.name }
                          })
                        }}
                        inputCustomClass={`${
                          values.isWorkHere ? '!bg-gray-200/80 pointer-events-none' : ''
                        }`}
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
                    <Checkbox
                      label={translate('currently_work_here')}
                      value={values.isWorkHere}
                      onChange={(e: any) => {
                        setExperience((prev: WorkExperience) => {
                          return { ...prev, is_working_currently: e.target.checked }
                        })
                        setFieldValue('isWorkHere', e.target.checked)
                      }}
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
                      }}
                      placeholder="Please enter experience description"
                    />
                    {errors.description && touched.description ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.description}
                      </div>
                    ) : null}
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
                            onClick={() => {
                              const nextTab = getNextTabName(selectedTab)
                              setSelectedTab(nextTab)
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
