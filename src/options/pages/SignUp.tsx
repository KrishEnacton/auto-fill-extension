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
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate('required_msg'))
      .matches(emailRegex, 'Invalid email address'),
    password: Yup.string()
      .required(translate('required_msg'))
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
        'Password must match all requirements:',
      ),
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
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
            <FormTitle name={translate('register_title')} />
            <form onSubmit={handleSubmit}>
              <div className="mt-8 space-y-5">
                <div>
                  <InputField
                    input_type="text"
                    value={values.email}
                    label={translate('email')}
                    onChange={(e: any) => {
                      setFieldValue('email', e.target.value)
                    }}
                    placeholder={'Please enter your email'}
                  />
                  {errors.email && touched.email ? (
                    <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.email}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <InputField
                    input_type={passwordShown ? 'text' : 'password'}
                    value={values.password}
                    label={translate('password')}
                    onChange={(e: any) => {
                      setFieldValue('password', e.target.value)
                    }}
                    placeholder={'Please enter your password'}
                  />
                  <button
                    type={'button'}
                    onClick={togglePassword}
                    className="absolute top-16 -translate-y-1/2 right-6"
                  >
                    {passwordShown ? (
                      <EyeSlashIcon className="h-5 w-7" />
                    ) : (
                      <EyeIcon className="h-5 w-7" />
                    )}
                  </button>
                  {errors.password && touched.password ? (
                    <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                      <div>{errors.password}</div>
                    </div>
                  ) : null}
                </div>

                <div className="text-gray-500">
                  <div>Password should meet the following criteria :</div>
                  <div> 1. At least 1 uppercase letter</div>
                  <div> 2. At least 1 number</div>
                  <div> 3. At least 1 special character</div>
                  <div> 4. Minimum 8 characters</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <PrimaryBtn
                  type="submit"
                  loader={loading}
                  customLoaderClass="h-5 w-5"
                  name={translate('submit')}
                  customClass="h-[55px]"
                />
              </div>
            </form>

            <div className="mt-4 text-center text-lg">
              <p>
                Already have an account?
                <span
                  className="px-2 text-blue-500 cursor-pointer hover:text-blue-700"
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
