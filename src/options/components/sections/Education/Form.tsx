import { FormikErrors, FormikTouched } from 'formik'
import FormField from '../../core/FormField'
import { ChangeEvent } from 'react'
import { translate } from '../../../../utils/translate'
import { notify } from '../../../../utils'
import {
  OnChangeHandlerType,
  EducationProps,
  FormErrorProps,
  FormTouchedProps,
  SetFieldValueType,
  handleSubmitType,
} from '../../../../global'
import { degrees, majors, months, startYears } from '../../../../constants'
import PrimaryBtn from '../../core/PrimaryBtn'
import AddMore from '../../core/AddMore'
import { SetterOrUpdater } from 'recoil'

const EducationForm: React.FC<{
  errors: FormErrorProps
  touched: FormTouchedProps
  values: EducationProps
  educationElem: EducationProps | undefined
  options: EducationProps
  dataSubmitted: boolean
  educationItem: EducationProps
  setShow: SetterOrUpdater<boolean>
  setNext: React.Dispatch<React.SetStateAction<boolean>>
  setDataSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  setEducationList: SetterOrUpdater<EducationProps[]>
  handleSubmit: handleSubmitType
  setFieldValue: SetFieldValueType
  onChangeHandler: OnChangeHandlerType
  generateRandomString(length: number): string
}> = ({
  errors,
  touched,
  values,
  educationElem,
  options,
  dataSubmitted,
  educationItem,
  setShow,
  setNext,
  setEducationList,
  handleSubmit,
  setDataSubmitted,
  setFieldValue,
  onChangeHandler,
  generateRandomString,
}) => {
  return (
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
            onChangeHandler(e, setFieldValue, 'school_name', values, generateRandomString(5))
          }
          error={errors?.school_name}
          touched={touched?.school_name}
          placeholder={'Please enter your school name'}
          formElem={educationElem}
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
          formElem={educationElem}
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
          formElem={educationElem}
        />
        <FormField
          fieldKey={'GPA'}
          error={errors?.GPA}
          touched={touched?.GPA}
          type="number"
          value={values.GPA}
          formElem={educationElem}
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'GPA', values)}
          placeholder={'Please enter your current GPA'}
        />
      </div>

      <div className="flex space-x-5  items-center">
        <FormField
          type="dropdown"
          dataList={months}
          fieldKey={'start_month'}
          formElem={educationElem}
          selected={months.find((item) => item.name == options.start_month)}
          error={errors?.start_month}
          touched={touched?.start_month}
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'start_month', values)}
          placeholder={'Please enter start month of education'}
        />
        <FormField
          type="dropdown"
          dataList={startYears}
          fieldKey={'start_year'}
          selected={startYears.find((item) => item.name == options.start_year)}
          error={errors?.start_year}
          formElem={educationElem}
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
          formElem={educationElem}
          selected={months.find((item) => item.name == options.end_month)}
          error={errors?.end_month}
          touched={touched?.end_month}
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_month', values)}
          placeholder={'Please enter End month of education'}
        />
        <FormField
          type="dropdown"
          dataList={startYears}
          formElem={educationElem}
          fieldKey={'end_year'}
          selected={startYears.find((item) => item.name == options.end_year)}
          error={errors?.end_year}
          touched={touched?.end_year}
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'end_year', values)}
          placeholder={'Please enter End year of education'}
        />
      </div>

      {!educationElem && (
        <div className="flex items-center flex-col justify-center space-x-5 w-full">
          <AddMore
            label={translate('add_more')}
            onClick={() => {
              if (dataSubmitted) {
                setEducationList((prev) => {
                  if (Array.isArray(prev)) {
                    return [...prev, educationItem]
                  } else return [educationItem]
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
              <PrimaryBtn type="submit" customLoaderClass={'!h-4 !w-4'} name={translate('save')} />
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
  )
}

export default EducationForm
