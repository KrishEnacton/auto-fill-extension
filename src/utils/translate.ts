const translation = {
  login: 'Login',
  first_name: 'First Name',
  last_name: 'Last Name',
  education: 'Education ',
  register: 'Register Account',
  education_history: 'Education History',
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
  next: 'Next',
  add_more: 'Add more',
  required_msg: 'Field is required.',
  invalid_gpa: 'Please enter a valid GPA.',
  min_msg: 'Value must be greater than or equal to 1.',
  max_msg: 'Value must be less than or equal to 10.',
  authorized_to_work_msg: 'Are you authorized to work in US (or applicable country)?',
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
  email: 'Email',
  non_binary: 'Non-Binary',
  female: 'Female',
  select_skills: 'Select some Skills',
  skills_msg: 'What skills do you have enjoy working with?',
  skills_sub_msg:
    'Click on skills once to select/deselect. List all the skills for optimal job match.',
  skills_require: 'At least one skill is required.',
  linkedin_url: 'Linkedin URL',
  linkedin_base_url: 'https://www.linkedin.com/in/',
  github_url: 'GitHub URL',
  github_base_url: 'https://github.com/',
  portfolio_url: 'Portfolio URL',
  other_url: 'Other URL',
  base_url: 'https://',
  first_job_msg: 'It is my first job.',
  work_experience: 'Work Experience',
  company_name: 'Company Name',
  location: 'Location',
  remote: 'Remote',
  city: 'City',
  state: 'State',
  country: 'Country',
  position_title: 'Position Title',
  experience_type: 'Experience Type',
  currently_work_here: 'I currently work here.',
  description: 'Description',
  date_of_birth: 'Date of Birth',
  phone_number: 'Phone Number',
  country_code: 'Country Code',
  phone_Validation_msg: 'Invalid phone number. Check format.',
  socials: 'Socials',
  save: 'Save',
  experience: 'Experience',
  login_title: 'Login to your Account!',
  register_title: 'Register your Account',
  password: 'Password',
  confirm_password: 'Re-Enter Password',
} as { [key: string]: string }

export const translate = (str: string): string => {
  return translation[str] ?? str
}
