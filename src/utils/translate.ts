const translation = {
  login: 'Login',
  first_name: 'First Name',
  last_name: 'Last Name',
  education: 'Education',
  submit: 'Submit',
  school_name: 'School Name',
  major: 'Major',
  degree: 'Degree',
  gpa: 'GPA',
  start_month: 'Start Month',
  personal_info: 'Personal Information',
  start_year: 'Start Year',
  end_year: 'End Year',
  end_month: 'End Month',
  add_more: 'Add more',
  required_msg: 'Field is required.',
  invalid_gpa: 'Please enter a valid GPA.',
  min_msg: 'Value must be greater than or equal to 1.',
  max_msg: 'Value must be less than or equal to 10.',
  authorized_to_work_msg: 'Are you authorized to work in the US?',
  sponsorship_msg: 'Will you now or in the future require sponsorship for employment visa status?',
  work_authorization: 'Work Authorization',
  tell_about_yourself: 'Tell us about yourself.',
  ethnicity_msg:
    "We don't share this data with anyone. This information is only used to autofill your job applications and will never hurt your chances of landing a job.",
  what_ethnicity: 'What is your ethnicity?',
  have_disability: 'Do you have a disability?',
  is_veterian: 'Are you a veteran?',
  is_lgtb: 'Do you identify as LGBTQ+?',
  what_gender: 'What is your gender?',
  male: 'Male',
  non_binary: 'Non-Binary',
  female: 'Female',
} as { [key: string]: string }

export const translate = (str: string): string => {
  return translation[str] ?? str
}
