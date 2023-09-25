import { useRecoilState } from 'recoil'
import {
  ProjectsFormAtom,
  projectsListAtom,
  updateArray,
  updateProjectsArray,
} from '../../../../atoms'
import Projects from './Projects'
import PrimaryBtn from '../../core/PrimaryBtn'
import { translate } from '../../../../utils/translate'
import {
  emptyFieldsValidation,
  getNextTabName,
  getPrevTabName,
  hasEmptyValueWithDateValidation,
  notify,
} from '../../../../utils'
import { ProjectsProps, UserInfo } from '../../../../global'
import { useEffect, useLayoutEffect } from 'react'
import FormTitle from '../../generic/FormTitle'
import AddMore from '../../core/AddMore'
import useStorage from '../../../hooks/use-Storage'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ProjectBase({
  setUserInfo,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  getUserInfo: () => UserInfo
}) {
  const [projectsList, setProjectsList] = useRecoilState(projectsListAtom)
  const [show, setShow] = useRecoilState(ProjectsFormAtom)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateProjectsArray)
  const { updateProjectsList } = useStorage()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const userInfo = getUserInfo()

  function onSubmiHandler(type?: string) {
    if (emptyFieldsValidation(updateFormArray) == 'valid') {
      updateProjectsList(updateFormArray, setUpdateFormArray, false)
      const res = updateProjectsList(updateFormArray, setUpdateFormArray, true)
    } else if (emptyFieldsValidation(updateFormArray) == 'empty') {
      notify('All the fields are required', 'error')
    }
    if (projectsList.length == 0) return
    if (type === 'previous') {
      const prevTab = getPrevTabName(currentTab)
      navigate(`/?tab=${prevTab}`)
    }
    if (type === 'next') {
      const nextTab = getNextTabName(currentTab)
      navigate(`/?tab=${nextTab}`)
    }
  }

  useEffect(() => {
    if (projectsList?.length == 0) {
      setShow(true)
    }
  }, [projectsList, show])

  useLayoutEffect(() => {
    setProjectsList(userInfo?.projects)
    if (userInfo?.projects?.length > 0) setShow(false)
  }, [])

  return (
    <div className="flex flex-col items-start mb-8">
      <FormTitle name={translate('projects')} />
      <div className="divide-y">
        {projectsList &&
          projectsList?.map((project: ProjectsProps, index: number) => (
            <div key={project.id + '' + index}>
              <Projects
                projectsCounter={index + 1}
                projectsElem={project}
                setUserInfo={setUserInfo}
              />
            </div>
          ))}
        {show && (
          <Projects
            onSubmiHandler={onSubmiHandler}
            setUserInfo={setUserInfo}
            getUserInfo={getUserInfo}
          />
        )}
      </div>

      {!show && (
        <div className="grid grid-rows-2">
          <AddMore
            id={'internal-add-more'}
            label={translate('add_more')}
            onClick={() => {
              setShow(true)
            }}
          />
          <div className="grid grid-cols-2 gap-x-3">
            <div className="">
              <PrimaryBtn
                type="submit"
                customLoaderClass={'!h-4 !w-4'}
                name={translate('previous')}
                onClick={() => {
                  onSubmiHandler('previous')
                }}
              />
            </div>
            <div className="">
              <PrimaryBtn
                customLoaderClass={'!h-4 !w-4'}
                name={translate('next')}
                type="submit"
                onClick={() => onSubmiHandler('next')}
                customClass="bg-secondary_button hover:bg-secondary_button/80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
