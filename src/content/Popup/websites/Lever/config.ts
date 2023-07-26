export const LeverConfig = {
  key: 'lever',
  regex: /^https:\/\/jobs\.lever\.co\/[^/]+\/[^/]+\/apply$/,
  radioElem: 'div[class*="multiple-"]',
  parentSelector: `[class*='application-question']`,
  selectors: {
    full_name: "input[name='name']",
    email: 'Email',
    phone: 'Phone',
    current_company: "input[name='org']",
    linkedIn_url: `LinkedIn `,
    github_url: `GitHub `,
    portfolio_url: `Portfolio `,
    other_url: `Other`,
    is_authorized_in_us: 'authorized to work|eligible to work',
    is_required_visa: 'visa',
    secondary_email: `Email Address`,
    secondary_phone: 'Phone Number',
    city: `located`,
    gender: `gender`,
    ethnicity: `race`,
    is_veteran: 'veteran',
  },
}
