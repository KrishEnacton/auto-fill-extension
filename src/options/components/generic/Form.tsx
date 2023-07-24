import Ethinicity from '../sections/Ethinicity'
import Basic from '../sections/Basic/Basic'
import Skills from '../sections/Skills'
import Socials from '../sections/Socials'
import WorkAuthorization from '../sections/WorkAuthorization'
import EducationBase from '../sections/Education/EducationBase'
import WorkExpBase from '../sections/Experience/WorkExpBase'
import useStorage from '../../hooks/use-Storage'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
    ethnicity: <Ethinicity setUserInfo={setUserInfo} />,
    skills: <Skills setUserInfo={setUserInfo} />,
    socials: <Socials setUserInfo={setUserInfo} />,
  }

  return <div>{components[currentTab ? currentTab : 'personal']}</div>
}
