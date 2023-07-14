import { Formik } from 'formik'
import FormTitle from '../components/generic/FormTitle'
import * as Yup from 'yup'
import { translate } from '../../utils/translate'
import InputField from '../components/core/InputField'
import PrimaryBtn from '../components/core/PrimaryBtn'
import { useSupabase } from '../hooks/use-Supabase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { notify } from '../../utils'

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const FormSchema = Yup.object().shape({
    email: Yup.string().required(translate('required_msg')),
    password: Yup.string().required(translate('required_msg')),
  })
  const navigate = useNavigate()
  const { signUp } = useSupabase()

  return (
    <div className="flex items-center justify-center h-screen bg-custom_white">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values) => {
          setLoading(true)
          const response: any = await signUp({ email: values.email, password: values.password })
          if (response?.data?.user?.id) {
            navigate('/')
          }
          if (response.error.status == 400) {
            notify(response.error.message, 'error')
          }
          setLoading(false)
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
            <FormTitle name={translate('register_title')} />
            <form onSubmit={handleSubmit}>
              <div className="mt-8">
                <div className="flex-col mb-4">
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
                    placeholder={'Please enter your password'}
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <PrimaryBtn
                  type="submit"
                  loader={loading}
                  customLoaderClass="h-5 w-5"
                  name={translate('submit')}
                />
              </div>
            </form>

            <div className="mt-4 text-center text-lg">
              <p>
                Already have an account?
                <span
                  className=" px-2 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => navigate('/login')}
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
