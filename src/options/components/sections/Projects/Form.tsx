import { FormikErrors, FormikTouched } from 'formik'
import FormField from '../../core/FormField'
import { translate } from '../../../../utils/translate'
import { notify, sleep } from '../../../../utils'
import {
  OnChangeHandlerType,
  ProjectsProps,
  FormErrorProps,
  FormTouchedProps,
  SetFieldValueType,
  handleSubmitType,
} from '../../../../global'
import { degrees, majors, months, startYears } from '../../../../constants'
import PrimaryBtn from '../../core/PrimaryBtn'
import AddMore from '../../core/AddMore'
import { SetterOrUpdater } from 'recoil'

const ProjectsForm: React.FC<{
  errors: FormErrorProps
  touched: FormTouchedProps
  values: ProjectsProps
  ProjectsElem: ProjectsProps | undefined
  options: ProjectsProps
  dataSubmitted: boolean
  setShow: SetterOrUpdater<boolean>
  onSubmiHandler?: (values: any) => void
  setNext: React.Dispatch<React.SetStateAction<boolean>>
  setDataSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  setProjectsList: SetterOrUpdater<ProjectsProps[]>
  handleSubmit: handleSubmitType
  setFieldValue: SetFieldValueType
  onChangeHandler: OnChangeHandlerType
  generateRandomString(length: number): string
}> = ({
  errors,
  touched,
  values,
  ProjectsElem,
  onSubmiHandler,
  setNext,
  handleSubmit,
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
      <div className="flex flex-col space-y-5 mt-8">
        <FormField
          type={'text'}
          fieldKey={'Title'}
          value={values?.title}
          onChange={(e: any) =>
            onChangeHandler(e, setFieldValue, 'title', values, generateRandomString(5))
          }
          error={errors?.title}
          touched={touched?.title}
          placeholder={'Please enter title'}
          formElem={ProjectsElem}
        />
        <FormField
          type="textarea"
          fieldKey={'Project Description'}
          value={values?.project_description}
          // inputCustomClass={'w-[400px]'}
          onChange={(e: any) => onChangeHandler(e, setFieldValue, 'project_description', values)}
          error={errors?.project_description}
          touched={touched?.project_description}
          placeholder={'Please enter Project Description'}
          formElem={ProjectsElem}
        />
      </div>

      {!ProjectsElem && (
        <div className="flex items-center flex-col justify-center space-x-5 w-full">
          <AddMore
            label={translate('add_more')}
            onClick={() => {
              if (typeof onSubmiHandler === 'function') {
                Object.values(values).filter((e) => e == '').length == 0
                  ? onSubmiHandler(values)
                  : console.log()
                setTimeout(() => {
                  if (document.querySelector('#internal-add-more')) {
                    //@ts-ignore
                    document.querySelector('#internal-add-more').click()
                  }
                }, 50)
              }
            }}
          />
          <div className="flex items-center justify-between space-x-5 mt-8 w-full">
            <div className="flex items-center justify-center">
              <PrimaryBtn
                type="submit"
                customLoaderClass={'!h-4 !w-4'}
                name={translate('previous')}
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
  )
}

export default ProjectsForm
