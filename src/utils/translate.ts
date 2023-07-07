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
} as { [key: string]: string }

export const translate = (str: string): string => {
  return translation[str] ?? str
}
