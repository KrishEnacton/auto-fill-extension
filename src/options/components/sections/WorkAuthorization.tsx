import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import FormTitle from '../generic/FormTitle'
import { getNextTabName, notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'
import { useLocation, useNavigate } from 'react-router-dom'

const authorizedOptions = [
  { id: 11, title: 'Yes', name: 'authorized', value: 'Yes' },
  { id: 12, title: 'No', name: 'authorized', value: 'No' },
]

const sponsorshipOptions = [
  { id: 21, title: 'Yes', name: 'sponsorship', value: 'Yes' },
  { id: 22, title: 'No', name: 'sponsorship', value: 'No' },
]

export default function WorkAuthorization({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const { getUserInfo } = useStorage()

  const userDetails = getUserInfo()
  const userInfo = userDetails && userDetails.authorization

  const [next, setNext] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')

  const [authorized, setAuthorized] = useState({
    workAuth: userInfo?.is_authorized_in_us ?? '',
    requireFutureSpon: userInfo?.is_required_visa ?? '',
  })

  const FormSchema = Yup.object().shape({
    workAuth: Yup.string().required(translate('required_msg')),
    requireFutureSpon: Yup.string().required(translate('required_msg')),
  })
  return (
    <>
      <Formik
        initialValues={authorized}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          if (
            userInfo == undefined ||
            userInfo?.is_authorized_in_us != values?.workAuth ||
            userInfo?.is_required_visa != values?.requireFutureSpon
          ) {
            const result = setUserInfo({
              authorization: {
                is_authorized_in_us: values.workAuth,
                is_required_visa: values.requireFutureSpon,
              },
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }

          if (next) {
            const nextTab = getNextTabName(currentTab)
            navigate(`/?tab=${nextTab}`)
            setNext(false)
          }
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center  ">
            <div className="w-full text-black text-left  ">
              <FormTitle name={translate('work_authorization')} />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="text-center space-y-3"
              >
                <div className="flex-col">
                  <RadioField
                    options={authorizedOptions}
                    msg={translate('authorized_to_work_msg')}
                    value={values.workAuth}
                    onChange={(e: any) => {
                      setNext(false)
                      setFieldValue('workAuth', e.target.value)
                    }}
                  />
                  {errors.workAuth && touched.workAuth ? (
                    <div className="mt-2 text-center ml-1 text-xs text-red-500">
                      {errors.workAuth as any}
                    </div>
                  ) : (
                    <div className="invisible mt-2 text-xs ml-1"> error</div>
                  )}
                </div>
                <div className="flex-col">
                  <RadioField
                    options={sponsorshipOptions}
                    value={values.requireFutureSpon}
                    msg={translate('sponsorship_msg')}
                    onChange={(e: any) => {
                      setNext(false)
                      setFieldValue('requireFutureSpon', e.target.value)
                    }}
                  />
                  {errors.requireFutureSpon && touched.requireFutureSpon ? (
                    <div className="mt-2 ml-1 text-xs text-red-500">
                      {errors.requireFutureSpon as any}
                    </div>
                  ) : (
                    <div className="invisible mt-2  text-xs ml-1"> error</div>
                  )}
                </div>

                <div className="flex items-center justify-between space-x-5 w-full">
                  <div className="!mt-8 flex items-center justify-center">
                    <PrimaryBtn
                      type="submit"
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('save')}
                    />
                  </div>
                  <div className="!mt-8 flex items-center justify-center">
                    <PrimaryBtn
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('next')}
                      type="submit"
                      onClick={() => {
                        setNext(true)
                      }}
                      customClass="bg-secondary_button hover:bg-secondary_button/80"
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
