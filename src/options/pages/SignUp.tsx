import { Formik } from 'formik'
import FormTitle from '../components/generic/FormTitle'
import * as Yup from 'yup'
import { translate } from '../../utils/translate'
import InputField from '../components/core/InputField'
import PrimaryBtn from '../components/core/PrimaryBtn'
import { useSupabase } from '../hooks/use-Supabase'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/use-localStorage'

export const Register = () => {
  const FormSchema = Yup.object().shape({
    email: Yup.string().required(translate('required_msg')),
    password: Yup.string().required(translate('required_msg')),
  })
  const navigate = useNavigate()
  const { getLocalStorage } = useLocalStorage()
  const { signUp } = useSupabase()

  useEffect(() => {
    const response = getLocalStorage('user')
    if (response?.email) {
      navigate('/')
    }
  }, [])
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values) => {
          const response: any = await signUp({ email: values.email, password: values.password })
          if (response?.id) {
            navigate('/')
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center">
            <div className="w-full text-black text-left lg:text-center  ">
              <FormTitle name={translate('register')} />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <div className="flex space-x-5 !mt-8">
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.email}
                      label={translate('email')}
                      onChange={(e: any) => {
                        setFieldValue('email', e.target.value)
                      }}
                      placeholder={'Please enter your email'}
                    />
                  </div>
                  <div className="flex-col">
                    <InputField
                      input_type="text"
                      value={values.password}
                      label={translate('password')}
                      onChange={(e: any) => {
                        setFieldValue('password', e.target.value)
                      }}
                      placeholder={'Please enter your email'}
                    />
                  </div>
                </div>

                <div className="!mt-8 flex items-center justify-center">
                  <PrimaryBtn
                    type="submit"
                    customLoaderClass={'!h-4 !w-4'}
                    name={translate('submit')}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
