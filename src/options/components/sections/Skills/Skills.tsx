import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { skillsOptions } from '../../../../constants'
import { translate } from '../../../../utils/translate'
import PrimaryBtn from '../../core/PrimaryBtn'
import MultiSelectDropdownMenu from '../../dropdowns/MultiSelectDropdown'
import FormTitle from '../../generic/FormTitle'
import SkillsElement from '../../generic/SkillsElement'
import useStorage from '../../../hooks/use-Storage'
import { getNextTabName, getPrevTabName, notify } from '../../../../utils'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Skills({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const { getUserInfo } = useStorage()
  const userInfo = getUserInfo()
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(userInfo?.skills ?? [])
  const [initialValues, setInitialValues] = useState(selectedSkills)

  const skillSchema = Yup.object().shape({
    value: Yup.string().required(translate('required_msg')),
    label: Yup.string().required(translate('required_msg')),
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const FormSchema = Yup.object().shape({
    selectedSkills: Yup.array()
      .of(skillSchema)
      .min(1, `${translate('skills_require')}`),
  })

  function onSubmitHandler(values: { selectedSkills: any }) {
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
      const nextTab = getNextTabName(currentTab)
      navigate(`/?tab=${nextTab}`)
      setNext(false)
    }
    //@ts-ignore
    if (prev) {
      const prevTab = getPrevTabName(currentTab)
      navigate(`/?tab=${prevTab}`)
      setNext(false)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          selectedSkills: selectedSkills,
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
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
                className="text-center space-y-2"
              >
                <div className="flex-col">
                  <MultiSelectDropdownMenu
                    value={selectedSkills}
                    list={skillsOptions}
                    onChange={(e: any) => {
                      setSelectedSkills(e)
                      setNext(false)
                      setFieldValue('selectedSkills', e)
                    }}
                    onKeyDown={(event: any) => {
                      if (event.key === 'Enter') {
                        setNext(false)
                        event.preventDefault() // Prevent form submission
                        const searchValue = (event.target as HTMLInputElement).value

                        function filterSelectedSkills(skillsOptions: any, selectedSkills: any) {
                          return skillsOptions.filter(
                            (skill: any) =>
                              !selectedSkills.some(
                                (selectedSkill: any) => selectedSkill.value === skill.value,
                              ),
                          )
                        }
                        const remainingSkills = filterSelectedSkills(skillsOptions, selectedSkills)
                        const matchingOption = remainingSkills.find((option: any) =>
                          option.value.toLowerCase().includes(searchValue.toLowerCase()),
                        )
                        const matchingOptionFromList = selectedSkills.find((option: any) =>
                          option.value.toLowerCase().includes(searchValue.toLowerCase()),
                        )
                        if (!matchingOption && !matchingOptionFromList) {
                          const obj = {
                            value: searchValue,
                            label: searchValue.charAt(0).toUpperCase() + searchValue.slice(1),
                          }
                          setFieldValue('selectedSkills', [...selectedSkills, obj])
                          setSelectedSkills((prev: any) => [...prev, obj])
                        } else if (matchingOption) {
                          setFieldValue('selectedSkills', [...selectedSkills, matchingOption])
                          setSelectedSkills((prev: any) => [...prev, matchingOption])
                        } else if (matchingOptionFromList) {
                          notify('This skill already been selected', 'error')
                        }
                      }
                    }}
                  />
                  {errors.selectedSkills && touched.selectedSkills ? (
                    <div className="ml-1 text-xs text-red-500 text-left">
                      {errors.selectedSkills as any}
                    </div>
                  ) : (
                    <div className="invisible mt-2 text-xs ml-1"> error</div>
                  )}
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
                      name={translate('previous')}
                      onClick={() => {
                        setPrev(true)
                      }}
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
