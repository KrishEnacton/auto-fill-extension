type BasicInfo = {
  firstName: string
  lastName: string
}

type EducationProps = {
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
  company_name: string
  position_title: string
  experience_type: string
  start_month: string
  end_month: string
  start_year: string
  end_year: string
  description: string
  is_working_currently?: boolean
  is_first_job?: boolean
}

type WorkAuthorization = {
  is_authorized_in_us?: boolean
  is_required_visa?: boolean
}

type Ethinicity = {
  ethinicity: string
  is_disabled: boolean
  is_veteran: boolean
  is_lgbt: boolean
  gender: 'male' | 'female' | 'non-binary'
}

type Personal = {
  DateofBirth: Date
  phone: number
  city: string
}

type Socials = {
  linkedIn_url: string
  github_url: string
  portfolio_url: string
  other_url: string
}

export interface UserInfo
  extends BasicInfo,
    WorkAuthorization,
    Ethinicity,
    skills,
    Personal,
    Socials {
  education: EducationProps[]
  work_experience: WorkExperience[]
  skills: string[]
}
