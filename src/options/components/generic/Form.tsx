import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedTabState } from '../../../atoms'
import Education from '../formBody/Education'
import Ethinicity from '../formBody/Ethinicity'
import Basic from '../formBody/Basic'
import Skills from '../formBody/Skills'
import Socials from '../formBody/Socials'
import WorkAuthorization from '../formBody/WorkAuthorization'
import PersonalInfo from '../formBody/Personal'
import EducationBase from '../formBody/EducationBase'
import WorkExpBase from '../formBody/WorkExpBase'

export default function Form() {
  const selectedTab = useRecoilValue(selectedTabState)
  const components: { [key: string]: JSX.Element } = {
    Personal: <Basic />,
    Education: <EducationBase />,
    'Work Experience': <WorkExpBase />,
    'Work Authorization': <WorkAuthorization />,
    Ethnicity: <Ethinicity />,
    Skills: <Skills />,
    Socials: <Socials />,
  }

  return <div>{components[selectedTab]}</div>
}
