import { Ref, useRef } from 'react'
import { atom, atomFamily } from 'recoil'
import { EducationProps, UserInfo, WorkExperience } from '../global'

export const selectedTabState = atom<string>({
  key: 'selectedTabState',
  default: 'Personal',
})

export const isFirstJobAtom = atom({
  key: 'isFirstJobAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || 'false').is_first_job as boolean,
})

export const showForm = atom({
  key: 'showForm',
  default: true as boolean,
})
export const ExperienceForm = atom({
  key: 'ExperienceForm',
  default: true as boolean,
})

export const addMore = atom({
  key: 'addMore',
  default: false as boolean,
})

export const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || '{}') as UserInfo,
})

export const educationAtom = atom({
  key: 'educationAtom',
  default: {} as EducationProps,
})

export const educationListAtom = atom({
  key: 'educationListAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || '{}')?.education as EducationProps[],
})

export const educationCounter = atom({
  key: 'educationCounter',
  default: (JSON.parse(localStorage.getItem('userInfo') || '{}')?.education
    ? JSON.parse(localStorage.getItem('userInfo') || '{}')?.education?.length + 1
    : 1) as number,
})

export const experienceAtom = atom({
  key: 'experienceAtom',
  default: {} as WorkExperience,
})

export const experienceListAtom = atom({
  key: 'experienceListAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || '{}')?.experience as WorkExperience[],
})
export const experienceCounter = atom({
  key: 'experienceCounter',
  default: (JSON.parse(localStorage.getItem('userInfo') || '{}')?.experience
    ? JSON.parse(localStorage.getItem('userInfo') || '{}')?.experience?.length + 1
    : 1) as number,
})
