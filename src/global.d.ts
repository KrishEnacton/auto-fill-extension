type BasicInfo = {
  firstName: string
  lastName: string
  DateofBirth: Date
  phone: number
  email: string
  countryCode: { label: string; name: string; flag: string }
  city: {
    name: string
    latitude: number
    longitude: number
    country: string
    population: number
    is_capital: boolean
  }
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
  location?: {
    name: string
    latitude: number
    longitude: number
    country: string
    population: number
    is_capital: boolean
  }
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
  is_disabled: boolean
  is_veteran: boolean
  is_lgbt: boolean
  gender: 'male' | 'female' | 'non-binary'
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
}

type FormErrorProps = FormikErrors<{
  school_name: string
  major: string
  degree: string
  GPA: string
  start_month: string
  start_year: string
  end_month: string
  end_year: string
}>

type FormTouchedProps = FormikTouched<{
  school_name: string
  major: string
  degree: string
  GPA: string
  start_month: string
  start_year: string
  end_month: string
  end_year: string
}>

type EducationValues = {
  school_name: string
  major: string
  degree: string
  GPA: string
  start_month: string
  start_year: string
  end_month: string
  end_year: string
}

type handleSubmitType = (e?: React.FormEvent<HTMLFormElement> | undefined) => void

type EducationOnChangeHandlerType = (
  e: ChangeEvent<HTMLInputElement>,
  setFieldValue: any,
  key: string,
  values: EducationValues,
  id?: string,
) => void

type SetEducationFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined,
) => Promise<void | FormikErrors<EducationValues>>
