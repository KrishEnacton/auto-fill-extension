import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTabState } from '../../../atoms';
import Education from '../formBody/Education';
import Ethinicity from '../formBody/Ethinicity';
import Basic from '../formBody/Basic';
import Skills from '../formBody/Skills';
import Socials from '../formBody/Socials';
import WorkAuthorization from '../formBody/WorkAuthorization';
import WorkExp from '../formBody/WorkExp';
import PersonalInfo from '../formBody/Personal';

export default function Form() {
  const selectedTab = useRecoilValue(selectedTabState);
  const components: { [key: string]: JSX.Element } = {
    Basic: <Basic />,
    Education: <Education />,
    'Work Experience': <WorkExp />,
    'Work Authorization': <WorkAuthorization />,
    Ethnicity: <Ethinicity />,
    Skills: <Skills />,
    Personal: <PersonalInfo />,
    Socials: <Socials />,
  };

  return (
    <div>
      {components[selectedTab]}
    </div>
  );
}
