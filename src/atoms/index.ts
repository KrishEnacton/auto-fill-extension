import { atom } from 'recoil'
import { EducationProps } from '../global'

export const selectedTabState = atom<string>({
  key: 'selectedTabState',
  default: 'Personal',
})

export const counterEducationAndExperience = atom<CounterState>({
  key: 'counterEducationAndExperience',
  default: { experience: 1, education: 1 } as any,
})

export interface CounterState {
  experience: number
  education: number
}

export const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('userInfo') || '{}'),
})

export const educationAtom = atom({
  key: 'educationAtom',
  default: [] as EducationProps[],
})
