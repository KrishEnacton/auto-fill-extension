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
  default: JSON.parse(localStorage.getItem('userInfo') || '{}')?.education as EducationProps[],
})

export const educationCounter = atom({
  key: 'educationCounter',
  default: (JSON.parse(localStorage.getItem('userInfo') || '{}')?.education?.length + 1 ??
    0) as number,
})

export const experienceAtom = atom({
  key: 'experienceAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || '{}')?.experience as WorkExperience[],
})

export const experienceCounter = atom({
  key: 'experienceCounter',
  default: (JSON.parse(localStorage.getItem('userInfo') || '{}')?.experience?.length + 1 ??
    0) as number,
})
