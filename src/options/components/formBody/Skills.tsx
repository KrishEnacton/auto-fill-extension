import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { skillsOptions } from '../../../constants'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'
import Select from 'react-select'
import MultiSelectDropdownMenu from '../dropdowns/MultiSelectDropdown'
import SkillsElement from '../generic/SkillsElement'
const commonSkills = [
  'Adobe Illustrator',
  'Buisness Analytics',
  'Excel/Numbers/Sheets',
  'Git',
  'HTML/CSS',
  'Java',
  'MallChimp',
  'MATLAB',
  'Operations Research',
  'Python',
  'SEO',
  'Zendesk',
]
export default function Skills() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedSkills, setSelectedSkills] = useState([])

  const skillSchema = Yup.object().shape({
    value: Yup.string().required(translate('required_msg')),
    label: Yup.string().required(translate('required_msg')),
  })

  const FormSchema = Yup.object().shape({
    selectedSkills: Yup.array()
      .of(skillSchema)
      .min(1, `${translate('skills_require')}`),
  })

  return (
    <>
      <Formik
        initialValues={{
          selectedSkills: selectedSkills,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
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
          <div className="min-h-[calc(100vh-230px)] py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center min-h-[calc(100vh-230px)]">
              <div className="w-full text-black text-left max-w-[400px]">
                <FormTitle name={translate('skills_msg')} />
                <div className="block text-left text-sm my-3 font-medium leading-6 text-gray-900">
                  {translate('skills_sub_msg')}
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex-col">
                    <MultiSelectDropdownMenu
                      defaultValue={selectedSkills}
                      list={skillsOptions}
                      onChange={(e: any) => {
                        setSelectedSkills(e.map(({ value }: any) => value))
                        setFieldValue('selectedSkills', e)
                      }}
                    />
                    {errors.selectedSkills && touched.selectedSkills ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.selectedSkills}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-row items-center w-[400px] space-x-4">
                    {/* {commonSkills.map((elem) => (
                      <SkillsElement item={elem} />
                    ))} */}
                  </div>

                  <div className="!mt-6">
                    <PrimaryBtn
                      disabled={submit.disable}
                      onClick={(e: any) => {
                        handleSubmit()
                      }}
                      type="submit"
                      loader={submit.loader}
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('submit')}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
