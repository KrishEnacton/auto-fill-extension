import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import FormTitle from '../generic/FormTitle'
import SocialUrl from '../generic/SocialUrl'
import { notify } from '../../../utils'

export default function Socials({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => Promise<boolean>
}) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const FormSchema = Yup.object().shape({
    linkedin: Yup.string().required(translate('required_msg')),
    github: Yup.string().required(translate('required_msg')),
    portfolio: Yup.string().required(translate('required_msg')),
    otherUrl: Yup.string().required(translate('required_msg')),
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
        initialValues={{
          linkedin: '',
          github: '',
          portfolio: '',
          otherUrl: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values, props) => {
          const result = await setUserInfo({
            linkedIn_url: values.linkedin,
            github_url: values.github,
            portfolio_url: values.portfolio,
            other_url: values.otherUrl,
          })
          if (result) {
            notify('Data Saved', 'success')
          }
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="  py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left lg:text-center  ">
                <FormTitle name={translate('socials')} />
                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-3">
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
                  <div className="!mt-6">
                    <PrimaryBtn
                      disabled={submit.disable}
                      onClick={(e: any) => {
                        handleSubmit()
                      }}
                      type="submit"
                      loader={submit.loader}
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('submit')}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
