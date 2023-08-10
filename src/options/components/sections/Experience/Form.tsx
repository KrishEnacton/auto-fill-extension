import { SetterOrUpdater } from 'recoil'
import {
  FormErrorProps,
  FormTouchedProps,
  OnChangeHandlerType,
  SetFieldValueType,
  WorkExperience,
  handleSubmitType,
  locationProps,
} from '../../../../global'
import { notify } from '../../../../utils'
import PrimaryBtn from '../../core/PrimaryBtn'
import { translate } from '../../../../utils/translate'
import { experienceTypes, months, startYears } from '../../../../constants'
import FormField from '../../core/FormField'
import AddMore from '../../core/AddMore'

export const ExprienceForm: React.FC<{
  errors: FormErrorProps
  touched: FormTouchedProps
  values: any
  experienceElem: WorkExperience | undefined
  experienceItem: WorkExperience
  options: WorkExperience
  dataSubmitted: boolean
  locationCurrent: string | locationProps
  isFirstJob: boolean
  onSubmitHandler?: (values: any) => void
  setLocationCurrent: React.Dispatch<React.SetStateAction<string | locationProps>>
  setShow: SetterOrUpdater<boolean>
  setNext: React.Dispatch<React.SetStateAction<boolean>>
  setDataSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: handleSubmitType
  setFieldValue: SetFieldValueType
  setExperiences: SetterOrUpdater<WorkExperience[]>
  onChangeHandler: OnChangeHandlerType
  generateRandomString(length: number): string
}> = ({
  errors,
  touched,
  values,
  dataSubmitted,
  experienceElem,
  experienceItem,
  locationCurrent,
  onSubmitHandler,
  isFirstJob,
  setLocationCurrent,
  setShow,
  setNext,
  handleSubmit,
  setExperiences,
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
      <div className="flex space-x-5">
        <FormField
          type={'text'}
          fieldKey={'company_name'}
          value={values?.company_name}
          onChange={(e: any) =>
            onChangeHandler(e, setFieldValue, 'company_name', values, generateRandomString(5))
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
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'position_title', values)}
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
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'experience_type', values)}
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
          inputCustomClass={values.isRemote ? '!bg-gray-200/80 pointer-events-none' : ''}
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
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'start_month', values)}
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
          inputCustomClass={values.is_working_currently ? `pointer-events-none` : ''}
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
          inputCustomClass={values.is_working_currently ? `pointer-events-none` : ''}
          selected={startYears.find((item) => item.name == values.end_year)}
          placeholder={'Select start year of experience'}
        />
      </div>
      <FormField
        type="checkbox"
        fieldKey={'is_working_currently'}
        value={values?.is_working_currently}
        onChange={(e: any) => onChangeHandler(e, setFieldValue, 'is_working_currently', values)}
        id={experienceElem?.id}
        formElem={experienceElem}
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
              if (typeof onSubmitHandler === 'function') {
                onSubmitHandler(values)
                setTimeout(() => {
                  //@ts-ignore
                  document.querySelector('#experience-add-more').click()
                }, 50)
              }
            }}
          />

          <div className="flex items-center justify-between mt-8 space-x-5 w-full">
            <div className=" flex items-center justify-center">
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
                customClass="bg-secondary_button hover:bg-secondary_button/80"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
