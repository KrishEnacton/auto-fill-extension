import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { countryCodes } from '../../../../constants'
import { translate } from '../../../../utils/translate'
import InputField from '../../core/InputField'
import PrimaryBtn from '../../core/PrimaryBtn'
import CountryDropdown from '../../dropdowns/CountryDropdown'
import FormTitle from '../../generic/FormTitle'
import { getNextTabName, notify } from '../../../../utils'
import useStorage from '../../../hooks/use-Storage'
import InputDropdown from '../../dropdowns/InputDropdown'
import { useLocation, useNavigate } from 'react-router-dom'
import { BasicInfo } from '../../../../global'
import BasicForm from './Form'

export default function Basic({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const { getUserInfo, getUserDetails } = useStorage()
  const [next, setNext] = useState(false)
  const { basicInfo } = getUserInfo()
  const userInfo: BasicInfo = basicInfo
  const userAuthDetails = getUserDetails()
  const [city, setCity] = useState(userInfo?.city || '')
  const [_userInfo, _setuserInfo] = useState({
    firstName: userInfo?.firstName ?? '',
    lastName: userInfo?.lastName ?? '',
    DateofBirth: userInfo?.DateofBirth ?? '',
    city: userInfo?.city ?? '',
    phone: userInfo?.phone ?? '',
    email: userInfo ? userInfo?.email : userAuthDetails?.email,
    countryCode: userInfo?.countryCode ?? { label: 'IN', name: 'India', flag: 'in' },
  })

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const nameValidationRegex = /^[A-Za-z\s]+$/

  const FormSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(translate('required_msg'))
      .matches(nameValidationRegex, 'Field cannot have special characters'),

    lastName: Yup.string()
      .required(translate('required_msg'))
      .matches(nameValidationRegex, 'Field cannot have special characters'),
    DateofBirth: Yup.string().required(translate('required_msg')),
    countryCode: Yup.object().required(translate('required_msg')),
    email: Yup.string()
      .required(translate('required_msg'))
      .matches(emailRegex, 'Invalid email address'),
    city: Yup.object().required(translate('required_msg')),
    phone: Yup.string()
      .matches(/^\d{10}$/, translate('phone_Validation_msg'))
      .required(translate('required_msg')),
  })
  const [maxDate, setMaxDate] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    setMaxDate(formattedDate)
  }, [])

  function onSubmitHandler(values: BasicInfo) {
    //@ts-ignore
    if (
      userInfo == undefined ||
      userInfo.DateofBirth != values.DateofBirth ||
      userInfo.city.name != values.city.name ||
      userInfo.countryCode.name != values.countryCode.name ||
      userInfo.firstName != values.firstName ||
      userInfo.lastName != values.lastName ||
      userInfo.phone != values.phone
    ) {
      const result = setUserInfo({
        basicInfo: {
          firstName: values?.firstName,
          lastName: values?.lastName,
          DateofBirth: values?.DateofBirth,
          phone: values?.phone,
          city: city,
          email: values?.email,
          countryCode: values?.countryCode,
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
  }

  return (
    <>
      <Formik
        initialValues={_userInfo}
        validationSchema={FormSchema}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center">
            <div className="w-full text-black text-left lg:text-center  ">
              <FormTitle name={translate('personal_info')} />
              <BasicForm
                errors={errors}
                touched={touched}
                values={values}
                maxDate={maxDate}
                city={city}
                setCity={setCity}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
                setNext={setNext}
              />
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
