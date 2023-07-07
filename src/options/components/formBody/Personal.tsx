import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import InputField from '../core/InputField'

export default function Register() {
  const [registerData, setRegisterData] = useState({})
  const [verifyOTP, setVerifyOTP] = useState(false)
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const FormSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email()
      .matches(/@[^.]*\./)
      .required('Required'),
    userPassword: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
  })

  return (
    <>
      <Formik
        initialValues={{
          userEmail: '',
          userPassword: '',
          name: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setRegisterData(values)
          setTimeout(() => {
            setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
            setVerifyOTP(true)
          }, 500)
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
          <div className="min-h-[calc(100vh-230px)] py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center min-h-[calc(100vh-230px)]">
              <div className="w-full text-black text-left lg:text-center max-w-[400px]">
                <h2 className="text-[19px] lg:text-3xl text-zinc-700 font-bold mt-2 lg:mt-10">
                  {translate('create_your_account')}
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="text-center">
                  <div className="flex-col">
                    <InputField
                      type="text"
                      value={values.name}
                      onChange={(e: any) => {
                        setFieldValue('name', e.target.value)
                      }}
                      placeHolder="NAME"
                      className="mt-[18px] rounded-2xl py-1 lg:py-3"
                      inputClass="px-7 placeholder:text-gray-600 text-sm lg:text-lg placeholder:text-xs lg:placeholder:text-base"
                    />
                    {errors.name && touched.name ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">{errors.name}</div>
                    ) : null}
                    <InputField
                      type="text"
                      placeHolder="EMAIL"
                      value={values.userEmail}
                      onChange={(e: any) => {
                        setFieldValue('userEmail', e.target.value)
                      }}
                      className="mt-[18px] rounded-2xl py-1 lg:py-3"
                      inputClass="px-7 placeholder:text-gray-600 text-sm md:text-lg placeholder:text-xs lg:placeholder:text-base"
                    />
                    {errors.userEmail && touched.userEmail ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.userEmail}
                      </div>
                    ) : null}
                    <div className="relative">
                      <InputField
                        type={passwordShown ? 'text' : 'password'}
                        placeHolder="PASSWORD"
                        value={values.userPassword}
                        onChange={(e: any) => {
                          setFieldValue('userPassword', e.target.value)
                        }}
                        className="mt-[18px] rounded-2xl py-1 lg:py-3"
                        inputClass="px-7 placeholder:text-gray-600 text-sm lg:text-lg placeholder:text-xs lg:placeholder:text-base"
                      />
                      <button
                        type={'button'}
                        onClick={togglePassword}
                        className="absolute top-1/2 -translate-y-1/2 right-6"
                      >
                        {/* {passwordShown ? (
                          <EyeSlashIcon className="h-5 w-7" />
                        ) : (
                          <EyeIcon className="h-5 w-7" />
                        )} */}
                      </button>
                    </div>
                    {errors.userPassword && touched.userPassword ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.userPassword}
                      </div>
                    ) : null}
                  </div>
                  {/* <ButtonWithText
                    disabled={submit.disable}
                    onClick={(e) => {
                      handleSubmit()
                    }}
                    type="submit"
                    loader={submit.loader}
                    customLoaderClass={'!h-5 !w-5'}
                    className="w-[200px] my-10 lg:w-[250px] rounded-2xl border-2 border-green-dot py-1 lg:py-3 text-xl text-zinc-600 flex items-center justify-center mx-auto space-x-4"
                    name={translate('create_account')}
                  /> */}
                  <div className="border-b-2 border-gray-300"></div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
