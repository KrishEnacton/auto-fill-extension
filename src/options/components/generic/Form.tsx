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

export default function Form() {
  const selectedTab = useRecoilValue(selectedTabState)

  const { setUserInfo} = useStorage()
  const components: { [key: string]: JSX.Element } = {
    Personal: <Basic setUserInfo={setUserInfo} />,
    Education: <EducationBase setUserInfo={setUserInfo} />,
    'Work Experience': <WorkExpBase setUserInfo={setUserInfo} />,
    'Work Authorization': <WorkAuthorization setUserInfo={setUserInfo} />,
    Ethnicity: <Ethinicity setUserInfo={setUserInfo} />,
    Skills: <Skills setUserInfo={setUserInfo} />,
    Socials: <Socials setUserInfo={setUserInfo} />,
  }

  return <div>{components[selectedTab]}</div>
}
