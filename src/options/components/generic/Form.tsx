import { selectedTabState } from '../../../atoms'
import Ethinicity from '../formBody/Ethinicity'
import Basic from '../formBody/Basic'
import Skills from '../formBody/Skills'
import Socials from '../formBody/Socials'
import WorkAuthorization from '../formBody/WorkAuthorization'
import EducationBase from '../formBody/EducationBase'
import WorkExpBase from '../formBody/WorkExpBase'
import useStorage from '../../hooks/use-Storage'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Form() {
  const selectedTab = useRecoilValue(selectedTabState)
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
