import { Formik, setIn } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { skillsOptions } from '../../../constants'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import MultiSelectDropdownMenu from '../dropdowns/MultiSelectDropdown'
import FormTitle from '../generic/FormTitle'
import SkillsElement from '../generic/SkillsElement'
import useStorage from '../../hooks/use-Storage'
import { getNextTabName, notify } from '../../../utils'
import { selectedTabState } from '../../../atoms'
import { useRecoilState } from 'recoil'
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
  const [next, setNext] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(userInfo.skills ?? [])
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [initialValues, setInitialValues] = useState(selectedSkills)

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
          const hasChanges = JSON.stringify(values.selectedSkills) != JSON.stringify(initialValues)
          if (hasChanges) {
            const result = setUserInfo({
              skills: values.selectedSkills,
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }
          setInitialValues(selectedSkills)
          //@ts-ignore
          if (next) {
            const nextTab = getNextTabName(selectedTab)
            setSelectedTab(nextTab)
            setNext(false)
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
          <div className="flex items-center justify-center ">
            <div className="w-full text-black max-w-[700px]">
              <FormTitle name={translate('skills_msg')} />
              <div className="block text-center text-lg my-3  font-medium leading-6 text-gray-900">
                {translate('skills_sub_msg')}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="text-center space-y-3"
              >
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
                <div className="flex flex-wrap items-center justify-center overflow-y-auto space-x-2">
                  {selectedSkills &&
                    selectedSkills.map((elem: any) => (
                      <SkillsElement
                        item={elem.label}
                        key={elem.value}
                        onClick={() => {
                          const currentElement = selectedSkills.find(
                            (skill: any) => skill.label === elem.label,
                          )
                          if (currentElement) {
                            const filteredArray = selectedSkills.filter(
                              (skill: any) => skill.label !== elem.label,
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
                          selectedSkills.find((skill: any) => skill.label === elem.label)
                            ? 'bg-base'
                            : ''
                        }
                      />
                    ))}
                </div>
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
                      type="submit"
                      onClick={() => {
                        setNext(true)
                      }}
                      customClass="bg-secondary_button hover:bg-secondary_button/80"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
