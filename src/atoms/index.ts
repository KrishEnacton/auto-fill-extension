import { atom } from 'recoil'
import { EducationProps, WorkExperience } from '../global'

export const isFirstJobAtom = atom({
  key: 'isFirstJobAtom',
  default: false as boolean,
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

export const educationAtom = atom({
  key: 'educationAtom',
  default: {} as EducationProps,
})

export const educationListAtom = atom({
  key: 'educationListAtom',
  default: [
    {
      school_name: '',
      major: '',
      degree: '',
      GPA: '',
      start_month: '',
      start_year: '',
      end_month: '',
      end_year: '',
    },
  ] as EducationProps[],
})

export const experienceAtom = atom({
  key: 'experienceAtom',
  default: {} as WorkExperience,
})

export const experienceListAtom = atom({
  key: 'experienceListAtom',
  default: [
    {
      company_name: '',
      position_title: '',
      experience_type: '',
      start_month: '',
      location: {
        name: '',
        latitude: 0,
        longitude: 0,
        country: '',
        population: 0,
        is_capital: false,
      },
      end_month: '',
      start_year: '',
      end_year: '',
      description: '',
      is_working_currently: false,
    },
  ] as WorkExperience[],
})

export const updateArray = atom({
  key: 'updateArray',
  default: [] as any,
})

export const updateExpArray = atom({
  key: 'updateExpArray',
  default: [] as any,
})
