import { Formik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as Yup from 'yup'
import {
  projectsAtom,
  projectsListAtom,
  updateProjectsArray,
  ProjectsFormAtom,
} from '../../../../atoms'
import { translate } from '../../../../utils/translate'
import { ProjectsProps, SetFieldValueType, UserInfo } from '../../../../global'
import DeleteIcon from '@heroicons/react/24/outline/XCircleIcon'
import CustomModal from '../../generic/CustomModal'
import {
  generateRandomString,
  getNextTabName,
  notify,
  setFormFields,
  updateFormFields,
} from '../../../../utils'
import { checkObjectExists } from '../../../../utils/index'
import { useLocation, useNavigate } from 'react-router-dom'
import ProjectsForm from './Form'

export default function Projects({
  setUserInfo,
  projectsElem,
  projectsCounter,
  onSubmiHandler,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  projectsElem?: ProjectsProps
  projectsCounter?: number
  onSubmiHandler?: () => void
  getUserInfo?: () => UserInfo
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [next, setNext] = useState(false)
  const [_projects, setProjects] = useRecoilState(projectsAtom)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [projectsList, setProjectsList] = useRecoilState(projectsListAtom)
  const [show, setShow] = useRecoilState(ProjectsFormAtom)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateProjectsArray)

  const [options, setOptions] = useState({
    title: projectsElem?.title ?? '',
    project_description: projectsElem?.project_description ?? '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const FormSchema = Yup.object().shape({
    title: Yup.string().required(translate('required_msg')),
    project_description: Yup.string().required(translate('required_msg')),
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function confirm(index?: string) {
    const filtered = projectsList.filter((item) => item.id !== index)
    if (!index) return
    if (index !== '') {
      const updatedProjectList = filtered.map((item) => ({ ...item }))
      setProjectsList((prev) => {
        return prev.filter((item) => item.id !== index)
      })
      const result: any = setUserInfo({ projects: updatedProjectList })
      if (result) {
        notify('Project deleted successfully', 'success')
      }
    }
    closeModal()
  }

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValueType,
    key: string,
    values: ProjectsProps,
    id?: string,
  ) => {
    id
      ? setFormFields(e, setFieldValue, setProjects, setOptions, key, setNext, id)
      : setFormFields(e, setFieldValue, setProjects, setOptions, key, setNext)
    if (projectsElem) {
      updateFormFields(
        e,
        updateFormArray,
        projectsElem,
        setUpdateFormArray,
        key,
        checkObjectExists,
        values,
        setNext,
      )
    }
  }

  function _onSubmitHandler(values: any) {
    if (getUserInfo) {
      const res: any = getUserInfo()
      const hasdescription = res?.projects?.some(
        (obj: any) => obj.project_description === values.project_description,
      )
      if (!hasdescription || res.projects == undefined || res.projects.length == 0) {
        if (projectsElem) {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== (projectsElem[key] as ProjectsProps),
          )
          if (hasChanges) {
            const result = setUserInfo({
              projects: projectsList && [...projectsList, _projects],
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }
        } else {
          const result = setUserInfo({
            projects: projectsList ? [...projectsList, _projects] : [_projects],
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
        setProjectsList((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, _projects]
          } else return [_projects]
        })
        setShow(false)
      } else {
        notify('Project with this project_description & degree already exists', 'error')
      }
    }
  }

  return (
    <>
      <Formik
        initialValues={options}
        validationSchema={FormSchema}
        onSubmit={(values) => _onSubmitHandler(values)}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div id={!projectsElem ? 'main-card' : ''} className="mb-8">
            <div className="flex items-center justify-center">
              <div className="w-full text-black text-left lg:text-center  ">
                <div
                  className={
                    'text-2xl  text-center font-bold text-gray-700 flex justify-between ' +
                    `${
                      (!projectsCounter
                        ? !projectsList
                          ? 1
                          : projectsList?.length + 1
                        : projectsCounter) == 1
                        ? 'mb-5'
                        : '!mt-8'
                    }`
                  }
                >
                  <span className="w-full">
                    {translate('projects')}
                    {!projectsCounter
                      ? !projectsList
                        ? 1
                        : projectsList?.length + 1
                      : projectsCounter}
                  </span>
                  {(projectsElem || (show && projectsList?.length > 0)) && (
                    <span className="flex">
                      <button type="button" onClick={openModal}>
                        <DeleteIcon className="h-8 w-8" />
                      </button>
                      <CustomModal
                        confirm={() => {
                          confirm(projectsElem?.id)
                          if (show && projectsList?.length > 0) {
                            setShow(false)
                          }
                        }}
                        id={'' + projectsCounter}
                        closeModal={closeModal}
                        isOpen={isOpen}
                        modal_title={`Delete this Project!`}
                        modal_description={`Are you sure you want to delete this Project?`}
                      />
                    </span>
                  )}
                </div>
                <ProjectsForm
                  onChangeHandler={onChangeHandler}
                  generateRandomString={generateRandomString}
                  errors={errors}
                  touched={touched}
                  values={values}
                  ProjectsElem={projectsElem}
                  dataSubmitted={dataSubmitted}
                  options={options}
                  handleSubmit={handleSubmit}
                  setProjectsList={setProjectsList}
                  setDataSubmitted={setDataSubmitted}
                  setFieldValue={setFieldValue}
                  setNext={setNext}
                  setShow={setShow}
                  onSubmiHandler={_onSubmitHandler}
                />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
