export const LaceworkConfig = {
  isIframe: true,
  href: 'https://www.lacework.com/careers/job-openings/',
  rootElem: (document: Document) => document.getElementById('grnhse_iframe'),
  first_name: (document: Document) => document.querySelector("input[id='first_name']"),
  last_name: (document: Document) => document.querySelector("input[id='last_name']"),
}
