import { Formik } from 'formik'
import * as Yup from 'yup'
import { translate } from '../../utils/translate'
import InputField from '../components/core/InputField'
import PrimaryBtn from '../components/core/PrimaryBtn'
import FormTitle from '../components/generic/FormTitle'
import { useSupabase } from '../hooks/use-Supabase'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SpinnerLoader from '../components/loaders/SpinnerLoader'
import { useLocalStorage } from '../hooks/use-localStorage'
import { notify } from '../../utils'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState<{
    google?: boolean
    normal?: boolean
  }>({
    google: false,
    normal: false,
  })
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate('required_msg'))
      .matches(emailRegex, 'Invalid email address'),
    password: Yup.string()
      .required(translate('required_msg'))
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
        'Password should match all requirements',
      ),
  })
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const { loginWithEmailPassword, signInWithGoogle } = useSupabase()
  const { getLocalStorage } = useLocalStorage()
  async function loginWithGoogle() {
    setLoading({ google: true })
    await signInWithGoogle()
    setLoading({ google: false })
  }

  useEffect(() => {
    const response = getLocalStorage('user')
    const authResponse = getLocalStorage('sb-fxwbkyonnbbvdnqbmppu-auth-token')
    if (response?.email || authResponse?.user?.id) {
      navigate('/')
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-custom_white">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async (values) => {
          setLoading({ normal: true })
          const response: any = await loginWithEmailPassword({
            password: values.password,
            email: values.email,
          })
          if (response.data?.user?.id) {
            navigate(`/?tab=personal`)
          }
          if (response?.error?.status == 400) {
            notify(response.error.message, 'error')
          }
          setLoading({ normal: false })
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
            <FormTitle name={translate('login_title')} />
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <div className="space-y-5">
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

              <div className="flex items-center justify-center">
                <PrimaryBtn
                  type="submit"
                  loader={loading.normal}
                  customLoaderClass="h-6 w-6"
                  name={translate('submit')}
                  customClass="h-[55px]"
                />
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => loginWithGoogle()}
                ref={buttonRef}
                className="flex items-center justify-center w-[70%] px-4 py-2 border border-slate-400 rounded-lg text-gray-300 text-xl hover:border-slate-200 hover:text-gray-100 hover:shadow transition duration-150"
              >
                <img
                  className="w-5 h-5"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span className="ml-2 text-base">
                  {loading.google ? <SpinnerLoader className="h-6" /> : 'Login with Google'}
                </span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center text-base text-lg">
              <span className="mr-2">New to AutoFill?</span>
              <span
                className="cursor-pointer text-base text-blue-500 hover:text-blue-700"
                onClick={() => navigate('/register')}
              >
                Create an account
              </span>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
