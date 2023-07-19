export const WabTecConfig = {
  key: 'wabtec',
  regex:
    /^https:\/\/wabtec\.wd1\.myworkdayjobs\.com\/en-US\/wabtec_careers\/job\/[^/]+\/[^/]+\/apply\/applyManually$/,
  section: "h2[class='css-1j9bnzb']",
  next_button:
    'div[class="css-1s1r74k"] button[data-automation-id="bottom-navigation-next-button"]',
  firstName: 'input[data-automation-id="legalNameSection_firstName"]',
  lastName: 'input[data-automation-id="legalNameSection_lastName"]',
  city: 'input[data-automation-id="addressSection_city"]',
  phone: 'input[data-automation-id="phone-number"]',
  countryDropdown: 'ul[role="listbox"]',
  work_experienceForm: (index: number) => `div[data-automation-id="workExperience-${index}"]`,
  educationForm: (index: number) => `div[data-automation-id="education-${index}"]`,
  countryCode: 'button[data-automation-id="countryDropdown"]',
  experience_add_more_button: `button[aria-label="Add Another Work Experience"]`,
  education_add_more_button: `button[aria-label="Add Another Education"]`,
  experience: {
    position_title: (parent: string) => `${parent} input[data-automation-id="jobTitle"]`,
    company_name: (parent: string) => `${parent} input[data-automation-id="company"]`,
    location: (parent: string) => `${parent} input[data-automation-id="location"]`,
    is_working_currently: (parent: string) =>
      `${parent} input[data-automation-id="currentlyWorkHere"]`,
    start_month: (parent: string) =>
      `${parent} div[data-automation-id="formField-startDate"] div div div div:first-child`,
    start_year: (parent: string) =>
      `${parent} div[data-automation-id="formField-startDate"] div div div div:last-child`,
    end_month: (parent: string) =>
      `${parent} div[data-automation-id="formField-endDate"] div div div div:first-child`,
    end_year: (parent: string) =>
      `${parent} div[data-automation-id="formField-endDate"] div div div div:last-child`,
    description: (parent: string) => `${parent} textarea[data-automation-id="description"]`,
  },
  education: {
    school_name: (parent: string) => `${parent} input[data-automation-id="school"]`,
    degree: (parent: string) => `${parent}  button[data-automation-id="degree"]`,
    // major: (parent: string) => `${parent} button[data-automation-id=""]`,
    start_year: (parent: string) =>
      `${parent} div[data-automation-id="formField-startDate"] div div div div:last-child`,
    end_year: (parent: string) =>
      `${parent} div[data-automation-id="formField-endDate"] div div div div:last-child`,
  },
  gender: 'button[data-automation-id="gender"]',
  ethinicity: 'button[data-automation-id="ethnicityDropdown"]',
  dropdown: 'ul[role="listbox"]',
}
