import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import FormTitle from '../generic/FormTitle'
import { getNextTabName, notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'
import { selectedTabState } from '../../../atoms'
import { useRecoilState } from 'recoil'

const authorizedOptions = [
  { id: 11, title: 'Yes', name: 'authorized', value: true },
  { id: 12, title: 'No', name: 'authorized', value: false },
]

const sponsorshipOptions = [
  { id: 21, title: 'Yes', name: 'sponsorship', value: true },
  { id: 22, title: 'No', name: 'sponsorship', value: false },
]

export default function WorkAuthorization({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const { getUserInfo } = useStorage()
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)

  const userInfo = getUserInfo().authorization
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [next, setNext] = useState(false)
  const [authorized, setAuthorized] = useState({
    workAuth: userInfo?.is_authorized_in_us ?? null,
    requireFutureSpon: userInfo?.is_required_visa ?? null,
  })

  const FormSchema = Yup.object().shape({
    workAuth: Yup.boolean().required(translate('required_msg')),
    requireFutureSpon: Yup.boolean().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={authorized}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== authorized[key],
          )
          if (hasChanges) {
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
            const nextTab = getNextTabName(selectedTab)
            setSelectedTab(nextTab)
            setNext(false)
          }
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
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
                className="text-center space-y-10"
              >
                <div className="flex-col">
                  <RadioField
                    options={authorizedOptions}
                    msg={translate('authorized_to_work_msg')}
                    value={values.workAuth}
                    onChange={(e: any) => {
                      setFieldValue(
                        'workAuth',
                        values.workAuth ? !values.workAuth : e.target.checked,
                      )
                    }}
                  />
                  {errors.workAuth && touched.workAuth ? (
                    <div className="mt-2 text-center ml-1 text-xs text-red-500">
                      {errors.workAuth}
                    </div>
                  ) : null}
                </div>
                <div className="flex-col">
                  <RadioField
                    options={sponsorshipOptions}
                    value={values.requireFutureSpon}
                    msg={translate('sponsorship_msg')}
                    onChange={(e: any) => {
                      setFieldValue(
                        'requireFutureSpon',
                        values.requireFutureSpon ? !values.requireFutureSpon : e.target.checked,
                      )
                    }}
                  />
                  {errors.requireFutureSpon && touched.requireFutureSpon ? (
                    <div className="mt-2 ml-1 text-xs text-red-500">{errors.requireFutureSpon}</div>
                  ) : null}
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
