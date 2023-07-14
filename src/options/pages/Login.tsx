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

export default function Login() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState<{
    google?: boolean
    normal?: boolean
  }>({
    google: false,
    normal: false,
  })
  const FormSchema = Yup.object().shape({
    email: Yup.string().required(translate('required_msg')),
    password: Yup.string().required(translate('required_msg')),
  })
  const navigate = useNavigate()

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
    console.log({ authResponse })
    if (response?.email || authResponse?.user?.id) {
      navigate('/')
    }
  }, [])

  return (
    <div className='flex items-center justify-center h-screen bg-custom_white'>
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
          console.log(response)
          if (response.data?.user?.id) {
            navigate('/')
          }
          if (response?.error?.status == 400) {
            notify(response.error.message, 'error')
          }
          setLoading({ normal: false })
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <div className='w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md'>
            <FormTitle name={translate('personal_info')} />
            <form
              className='mt-8 space-y-6'
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <div className='space-y-4'>
                <InputField
                  input_type='text'
                  value={values.email}
                  label={translate('email')}
                  onChange={(e: any) => {
                    setFieldValue('email', e.target.value)
                  }}
                  placeholder={'Please enter your email'}
                />

                <InputField
                  input_type='password'
                  value={values.password}
                  label={translate('password')}
                  onChange={(e: any) => {
                    setFieldValue('password', e.target.value)
                  }}
                  placeholder={'Please enter your password'}
                />
              </div>

              <div className='flex items-center justify-center'>
                <PrimaryBtn
                  type='submit'
                  loader={loading.normal}
                  customLoaderClass='h-6 w-6'
                  name={translate('submit')}
                />
              </div>
            </form>

            <div className='mt-6'>
              <button
                onClick={() => loginWithGoogle()}
                ref={buttonRef}
                className='flex items-center justify-center w-full px-4 py-2 border border-slate-400 rounded-lg text-gray-300 text-xl hover:border-slate-200 hover:text-gray-100 hover:shadow transition duration-150'
              >
                {!loading && (
                  <img
                    className='w-5 h-5'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    loading='lazy'
                    alt='google logo'
                  />
                )}
                <span className='ml-2'>
                  {loading.google ? <SpinnerLoader className='h-6' /> : 'Login with Google'}
                </span>
              </button>
            </div>

            <div className='mt-6 flex items-center justify-center text-base text-lg'>
              <span className='mr-2'>New to AutoFill?</span>
              <span
                className='cursor-pointer text-base text-blue-500 hover:text-blue-700'
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
