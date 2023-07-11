import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import Checkbox from '../core/Checkbox'
import InputField from '../core/InputField'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'
import { experienceTypes, months, startYears } from '../../../constants'
import InputDropdown from '../dropdowns/InputDropdown'
import Textarea from '../core/TextArea'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { counterEducationAndExperience, experienceAtom, isFirstJobAtom } from '../../../atoms'
import useLocation from '../../hooks/use-location'
import { WorkExperience } from '../../../global'

export default function WorkExp({
  setUserInfo,
  experience,
  ExpCounter,
}: {
  setUserInfo: (userParams: any) => boolean
  experience?: WorkExperience
  ExpCounter: number
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const setCounter = useSetRecoilState(counterEducationAndExperience)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const { getLocation } = useLocation()
  const setExperience = useSetRecoilState(experienceAtom)
  const [locationOptions, setLocationOptions] = useState([])

  const [options, setOptions] = useState({
    isFirstJob: isFirstJob,
    nameCom: experience?.company_name ?? '',
    positionTitle: experience?.position_title ?? '',
    expType: experience?.experience_type ?? '',
    isWorkHere: experience?.is_working_currently ?? '',
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

  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))
          setCounter((prev) => ({ ...prev, experience: prev.experience + 1 }))
          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
          const experience = {
            is_first_job: values.isFirstJob,
            company_name: values.nameCom,
            experience_type: values.expType,
            location: values.location,
            description: values.description,
            start_month: values.startMonth,
            start_year: values.startYear,
            end_month: values.endMonth,
            end_year: values.endYear,
            is_working_currently: values.isWorkHere,
          }
          setExperience((prev: any) => {
            if (Array.isArray(prev)) {
              return [...prev, experience]
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
          <div className="py-4 px-6">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center">
                <div className="flex-col w-[820px]">
                  <Checkbox
                    label={translate('first_job_msg')}
                    value={values.isFirstJob}
                    onChange={(e: any) => {
                      setFieldValue('isFirstJob', e.target.checked)
                      setUserInfo({ isFirstJob: e.target.checked })
                      setIsFirstJob(e.target.checked)
                    }}
                  />
                </div>

                {!values.isFirstJob && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                    }}
                    className="text-center space-y-3"
                  >
                    <FormTitle name={translate('work_experience')} />
                    <div className="text-[18px] my-5 text-left font-bold text-gray-700">
                      {translate('experience')} {ExpCounter}
                    </div>
                    <div className="flex space-x-3">
                      <div className="flex-col">
                        <InputField
                          input_type="text"
                          value={values.nameCom}
                          label={translate('company_name')}
                          onChange={(e: any) => {
                            setFieldValue('nameCom', e.target.value)
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
                    <div className="flex-col">
                      <Checkbox
                        label={translate('remote')}
                        value={values.isRemote}
                        onChange={(e: any) => {
                          setFieldValue('isRemote', e.target.checked)
                        }}
                      />
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
                            setFieldValue('expType', e)
                            setOptions((prev) => ({ ...prev, expType: e }))
                          }}
                          placeholder={'Please enter your experience'}
                        />
                        {errors.expType && touched.expType ? (
                          <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                            {errors.expType as any}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={'flex-col' + `${values.isRemote ? 'pointer-events-none' : ''}`}
                      >
                        <div className="block text-left text-lg font-bold leading-6 text-gray-800">
                          {translate('location')}
                        </div>

                        <InputDropdown
                          data={locationOptions}
                          selected={options.location}
                          onChange={(e: any) => {
                            console.log(e)
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
                        }}
                        placeholder="Please enter experience description"
                      />
                      {errors.description && touched.description ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="!mt-6">
                      <PrimaryBtn
                        disabled={submit.disable}
                        type="submit"
                        onClick={() => {
                          handleSubmit()
                        }}
                        loader={submit.loader}
                        customLoaderClass={'!h-4 !w-4'}
                        name={translate('save')}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
