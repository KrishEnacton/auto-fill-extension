type cityProps = {
  name: string
  latitude: number
  longitude: number
  country: string
  population: number
  is_capital: boolean
}

type countryCodeProps = { label: string; name: string; flag: string }

type locationProps = {
  name: string
  latitude: number
  longitude: number
  country: string
  population: number
  is_capital: boolean
}

type BasicInfo = {
  firstName: string
  lastName: string
  DateofBirth: Date
  phone: number
  email: string
  countryCode: countryCodeProps
  city: cityProps
}

type EducationProps = {
  id?: string
  school_name: string
  major: string
  degree: string
  GPA: string
  start_month: string
  end_month: string
  start_year: string
  end_year: string
}

type WorkExperience = {
  id?: string
  company_name: string
  position_title: string
  experience_type: string
  start_month: string
  location?: locationProps | string
  end_month: string
  start_year: string
  end_year: string
  description: string
  is_working_currently?: boolean
}

type WorkAuthorization = {
  is_authorized_in_us?: boolean
  is_required_visa?: boolean
}

type Ethnicity = {
  ethnicity: {
    name: string
    id: number
  }
  is_disabled: boolean | string
  is_veteran: boolean | string
  is_lgbt: boolean | string
  gender: 'male' | 'female' | 'non-binary' | ''
}

type Socials = {
  linkedIn_url: string
  github_url: string
  portfolio_url: string
  other_url: string
}

type selectorProps = {
  regex: RegExp
  first_name: string
  last_name: string
  email: string
  phone: string
}

export interface UserInfo {
  basicInfo: BasicInfo
  education: EducationProps[]
  work_experience: WorkExperience[]
  is_first_job?: boolean
  authorization: WorkAuthorization
  ethnicity: Ethnicity
  skills: string[]
  socials: Socials
}

export interface SkeletonLoaderProps {
  boxLoaderHeight?: string
  boxLoaderWidth?: string
  customClass?: string
  gridCount?: number
  className?: string
}

export interface ConfigProps {
  SUPABASE_URL: string
  SUPABASE_KEY: string
  SUPABASE_SERVICE_ROLE: string
}

type SectionProps =
  | EducationProps
  | BasicInfo
  | WorkExperience
  | WorkAuthorization
  | Ethnicity
  | Socials

type FormErrorProps = FormikErrors<SectionProps>

type FormTouchedProps = FormikTouched<SectionProps>

type handleSubmitType = (e?: React.FormEvent<HTMLFormElement> | undefined) => void

type OnChangeHandlerType = (
  e: ChangeEvent<HTMLInputElement>,
  setFieldValue: SetFieldValueType,
  key: string,
  values: ESectionProps,
  id?: string,
) => void

type SetFieldValueType = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined,
) => Promise<void | FormikErrors<SectionProps>>
