const translation = {
  login: 'Login',
} as { [key: string]: string }

export const translate = (str: string): string => {
  return translation[str] ?? str
}
