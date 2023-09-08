// import Ethnicity from '../sections/Ethnicity/Ethnicity'
import Basic from '../sections/Basic/Basic'
import Skills from '../sections/Skills/Skills'
import Socials from '../sections/Socials/Socials'
import WorkAuthorization from '../sections/WorkAuthorization/WorkAuthorization'
import EducationBase from '../sections/Education/Base'
import WorkExpBase from '../sections/Experience/Base'
import useStorage from '../../hooks/use-Storage'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Ethnicity from '../sections/Ethnicity/Ethinicity'
import ProjectBase from '../sections/Projects/Base'

export default function Form() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const { setUserInfo, getUserInfo } = useStorage()
  useEffect(() => {}, [location.search])

  const components: { [key: string]: JSX.Element } = {
    personal: <Basic setUserInfo={setUserInfo} />,
    education: <EducationBase setUserInfo={setUserInfo} getUserInfo={getUserInfo} />,
    'work-experience': <WorkExpBase setUserInfo={setUserInfo} getUserInfo={getUserInfo} />,
    'work-authorization': <WorkAuthorization setUserInfo={setUserInfo} />,
    ethnicity: <Ethnicity setUserInfo={setUserInfo} />,
    skills: <Skills setUserInfo={setUserInfo} />,
    projects: <ProjectBase setUserInfo={setUserInfo} getUserInfo={getUserInfo} />,
    socials: <Socials setUserInfo={setUserInfo} />,
  }

  return <div>{components[currentTab ? currentTab : 'personal']}</div>
}
