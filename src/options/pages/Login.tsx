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

export default function Login() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState(false)
  const FormSchema = Yup.object().shape({
    email: Yup.string().required(translate('required_msg')),
    password: Yup.string().required(translate('required_msg')),
  })
  const navigate = useNavigate()

  const { loginWithEmailPassword, signInWithGoogle } = useSupabase()
  const { getLocalStorage } = useLocalStorage()
  async function loginWithGoogle() {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
  }

  useEffect(() => {
    const response = getLocalStorage('user')
    const authResponse = getLocalStorage('sb-fxwbkyonnbbvdnqbmppu-auth-token')
    console.log({ authResponse })
    if (response?.email || authResponse?.user?.id) {
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
          console.log('called')
          const response = await loginWithEmailPassword({
            password: values.password,
            email: values.email,
          })
          if (response.data?.user?.id) {
            navigate('/')
          }
          console.log(response)
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center">
            <div className="w-full text-black text-left lg:text-center  ">
              <FormTitle name={translate('personal_info')} />
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
            <div>
              <button
                onClick={() => loginWithGoogle()}
                ref={buttonRef}
                className={`px-4 py-2 w-60 border flex gap-2 border-slate-400 rounded-lg text-gray-300 text-xl hover:border-slate-200 hover:text-gray-100 hover:shadow transition items-center justify-center duration-150 ${
                  loading && 'disabled'
                }`}
              >
                {!loading && (
                  <img
                    className="w-5 h-5"
                    src={'https://www.svgrepo.com/show/475656/google-color.svg'}
                    loading="lazy"
                    alt="google logo"
                  />
                )}
                <span className="text-base">
                  {loading ? <SpinnerLoader className="h-6" /> : 'Login with Google'}
                </span>
              </button>
            </div>
            <div className="flex justify-between text-base text-lg">
              <span>New to AutoFill</span>
              <span>
                <a onClick={() => navigate('/register')} href="#">
                  Create a account?Create a account?
                </a>
              </span>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
