import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { skillsOptions } from '../../../constants'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import MultiSelectDropdownMenu from '../dropdowns/MultiSelectDropdown'
import FormTitle from '../generic/FormTitle'
import SkillsElement from '../generic/SkillsElement'
import useStorage from '../../hooks/use-Storage'
import { notify } from '../../../utils'
const commonSkills = [
  'HTML',
  'React',
  'Responsive Web Design',
  'Agile Methodology',
  'Quality Assurance',
  'RESTful APIs',
  'Cloud Computing',
  'Blockchain',
  'Microservices',
  'GraphQL',
  'Git',
  'Java',
]
export default function Skills({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const { getUserInfo } = useStorage()

  const userInfo = getUserInfo()
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedSkills, setSelectedSkills] = useState(userInfo.skills ?? [])

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
          const result = setUserInfo({
            skills: values.selectedSkills,
          })
          if (result) {
            notify('Data Saved', 'success')
          }
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
          <div className="py-4 px-6">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left max-w-[600px]">
                <FormTitle name={translate('skills_msg')} />
                <div className="block text-left text-lg my-3  font-medium leading-6 text-gray-900">
                  {translate('skills_sub_msg')}
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
                  <div className="flex-col">
                    <MultiSelectDropdownMenu
                      value={selectedSkills}
                      list={skillsOptions}
                      onChange={(e: any) => {
                        setSelectedSkills(e)
                        setFieldValue('selectedSkills', e)
                      }}
                    />
                    {errors.selectedSkills && touched.selectedSkills ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.selectedSkills}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center justify-center overflow-y-auto space-x-2 space-y-3">
                    {commonSkills.map((elem, index) => (
                      <div key={index}>
                        <SkillsElement
                          item={elem}
                          onClick={() => {
                            const alreadySelected = selectedSkills.find(
                              (skill: any) => skill.label === elem,
                            )

                            if (alreadySelected) {
                              const filteredArray = selectedSkills.filter(
                                (skill: any) => skill.label !== elem,
                              )
                              setSelectedSkills(filteredArray)
                              setFieldValue('selectedSkills', filteredArray)
                            } else {
                              const selectedSkill = skillsOptions.find(
                                (skill) => skill.label === elem,
                              )
                              const updatedSkills: any = [...values.selectedSkills, selectedSkill]
                              setSelectedSkills(updatedSkills)
                              setFieldValue('selectedSkills', updatedSkills)
                            }
                          }}
                          className={
                            selectedSkills.find((skill: any) => skill.label === elem)
                              ? 'bg-base'
                              : ''
                          }
                        />
                      </div>
                    ))}
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
