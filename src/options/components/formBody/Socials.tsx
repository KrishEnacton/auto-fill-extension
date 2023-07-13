import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'
import SocialUrl from '../generic/SocialUrl'
import { notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'
import { selectedTabState } from '../../../atoms'
import { useRecoilState } from 'recoil'

export default function Socials({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)

  const { getUserInfo } = useStorage()
  const userInfo = getUserInfo().socials
  const [_socials, setSocials] = useState({
    linkedin: userInfo?.linkedIn_url ?? '',
    github: userInfo?.github_url ?? '',
    portfolio: userInfo?.portfolio_url ?? '',
    otherUrl: userInfo?.other_url ?? '',
  })

  const FormSchema = Yup.object().shape({
    linkedin: Yup.string(),
    github: Yup.string(),
    portfolio: Yup.string(),
    otherUrl: Yup.string(),
  })
  const socials = [
    {
      label: translate('linkedin_url'),
      base_url: translate('linkedin_base_url'),
      fieldName: 'linkedin',
    },
    {
      label: translate('github_url'),
      base_url: translate('github_base_url'),
      fieldName: 'github',
    },
    {
      label: translate('portfolio_url'),
      base_url: translate('base_url'),
      fieldName: 'portfolio',
    },
    {
      label: translate('other_url'),
      base_url: translate('base_url'),
      fieldName: 'otherUrl',
    },
  ]
  return (
    <>
      <Formik
        initialValues={_socials}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          if (Object.values(values).every((value) => value === '')) {
            notify('Enter atleast one social media url to save', 'error')
          } else {
            const hasChanges = JSON.stringify(values) != JSON.stringify(_socials)
            if (hasChanges) {
              const result = setUserInfo({
                socials: {
                  linkedIn_url: values.linkedin,
                  github_url: values.github,
                  portfolio_url: values.portfolio,
                  other_url: values.otherUrl,
                },
              })
              if (result) {
                notify('Data Saved', 'success')
                setSocials(values)
              }
            }
          }

          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center min-w-[851px] pb-14">
            <div className="w-full text-black text-left lg:text-center  ">
              <FormTitle name={translate('socials')} />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="text-center space-y-3"
              >
                {socials.map((elem) => (
                  <div className="flex-col" key={elem.fieldName}>
                    <SocialUrl
                      label={elem.label}
                      baseUrl={elem.base_url}
                      value={values[elem.fieldName as keyof typeof values]}
                      onChange={(e: any) => {
                        setFieldValue(elem.fieldName as keyof typeof values, e.target.value)
                      }}
                    />
                    {errors[elem.fieldName as keyof typeof errors] &&
                    touched[elem.fieldName as keyof typeof values] ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors[elem.fieldName as keyof typeof errors]}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="flex items-center justify-center space-x-5 w-full">
                  <div className="!mt-8 flex items-center justify-center">
                    <PrimaryBtn
                      type="submit"
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('save')}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
