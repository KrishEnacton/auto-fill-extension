import { atom } from 'recoil'

export const selectedTabState = atom<string>({
  key: 'selectedTabState',
  default: 'Basic',
})

export const counterEducationAndExperience = atom<string>({
  key: 'counterEducationAndExperience',
  default: { experience: 1, education: 1 } as any,
})
