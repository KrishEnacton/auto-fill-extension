import { useRecoilState } from 'recoil'
import { ProjectsFormAtom, projectsListAtom, updateArray } from '../../../../atoms'
import Projects from './Projects'
import PrimaryBtn from '../../core/PrimaryBtn'
import { translate } from '../../../../utils/translate'
import { emptyFieldsValidation, hasEmptyValueWithDateValidation, notify } from '../../../../utils'
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
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)
  const { updateProjectsList } = useStorage()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const userInfo = getUserInfo()

  function onSubmiHandler() {
    if (emptyFieldsValidation(updateFormArray) == 'valid') {
      updateProjectsList(updateFormArray, setUpdateFormArray, false)
      const res = updateProjectsList(updateFormArray, setUpdateFormArray, true)
    } else if (emptyFieldsValidation(updateFormArray) == 'empty') {
      notify('All the fields are required', 'error')
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
        <div className="flex items-center flex-col justify-center space-x-5 w-full">
          <AddMore
            id={'internal-add-more'}
            label={translate('add_more')}
            onClick={() => {
              setShow(true)
            }}
          />
          <div className="flex !mt-8 items-center justify-between space-x-5 w-full">
            <div className="flex items-center justify-center">
              <PrimaryBtn
                type="submit"
                customLoaderClass={'!h-4 !w-4'}
                name={translate('save')}
                onClick={() => onSubmiHandler()}
              />
            </div>
            <div className="flex items-center justify-center">
              <PrimaryBtn
                customLoaderClass={'!h-4 !w-4'}
                name={translate('next')}
                type="submit"
                onClick={() => onSubmiHandler()}
                customClass="bg-secondary_button hover:bg-secondary_button/80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
