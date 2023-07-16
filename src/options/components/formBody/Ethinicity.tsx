import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { ethnicity } from '../../../constants'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'
import { getNextTabName, notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'
import { selectedTabState } from '../../../atoms'
import { useRecoilState } from 'recoil'

const disabilityRadios = [
  { id: 1, title: 'Yes', name: 'disability', value: true },
  { id: 2, title: 'No', name: 'disability', value: false },
]
const veterianTadios = [
  { id: 3, title: 'Yes', name: 'veterian', value: true },
  { id: 4, title: 'No', name: 'veterian', value: false },
]
const lgtbRadios = [
  { id: 5, title: 'Yes', name: 'lgtb', value: true },
  { id: 6, title: 'No', name: 'lgtb', value: false },
]

const genders = [
  { id: 7, title: 'Male', name: 'gender', value: 'Male' },
  { id: 8, title: 'Female', name: 'gender', value: 'Female' },
  { id: 9, title: 'Non-Binary', name: 'gender', value: 'Non-Binary' },
]
export default function Ethinicity({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const [submit, setSubmit] = useState({ loader: false, disable: false })
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [next, setNext] = useState(false)
  const [options, setOptions] = useState({
    isDisable: '',
    isVeterian: '',
    isLgtb: '',
    gender: '',
    selectedEthinicity: '' as any,
  })
  const { getUserInfo } = useStorage()
  const ethinicity = getUserInfo().ethnicity

  const [_ethinicity, setEthnicity] = useState({
    isDisable: ethinicity?.is_disabled ?? null,
    isVeterian: ethinicity?.is_veteran ?? null,
    isLgtb: ethinicity?.is_lgbt ?? null,
    gender: ethinicity?.gender ?? null,
    selectedEthinicity: ethinicity?.ethnicity ?? '',
  })

  const FormSchema = Yup.object().shape({
    isDisable: Yup.boolean().required(translate('required_msg')),
    isVeterian: Yup.boolean().required(translate('required_msg')),
    isLgtb: Yup.boolean().required(translate('required_msg')),
    gender: Yup.string().required(translate('required_msg')),
    selectedEthinicity: Yup.object().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={_ethinicity}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== _ethinicity[key],
          )
          if (hasChanges) {
            const result = setUserInfo({
              ethnicity: {
                ethnicity: options.selectedEthinicity,
                is_disabled: values.isDisable,
                is_veteran: values.isVeterian,
                is_lgbt: values.isLgtb,
                gender: values.gender,
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
          <div className="flex items-center justify-center pb-14 ">
            <div className="w-full text-black text-left space-y-4  ">
              <FormTitle name={translate('tell_about_yourself')} />
              <div className="text-lg max-w-[800px] text-center">{translate('ethnicity_msg')}</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="text-center flex items-center justify-center flex-col space-y-6"
              >
                <div className="flex items-center justify-center flex-col !mt-8">
                  <div className="block text-left text-lg font-semibold mt-3 mb-2 leading-6 text-gray-900">
                    {translate('what_ethnicity')}
                  </div>
                  <InputDropdown
                    data={ethnicity}
                    selected={values.selectedEthinicity}
                    onChange={(e: any) => {
                      setFieldValue('selectedEthinicity', e)
                      setOptions((prev) => ({ ...prev, selectedEthinicity: e }))
                    }}
                    placeholder={'Please select your ethnicity  '}
                  />
                  {errors.selectedEthinicity && touched.selectedEthinicity ? (
                    <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                      {errors.selectedEthinicity as any}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between items-center w-full max-w-[550px] !mt-10">
                  <div className="flex-col">
                    <RadioField
                      options={disabilityRadios}
                      msg={translate('have_disability')}
                      value={values.isDisable}
                      onChange={(e: any) => {
                        setFieldValue(
                          'isDisable',
                          values.isDisable ? !values.isDisable : e.target.checked,
                        )
                      }}
                    />
                    {errors.isDisable && touched.isDisable ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isDisable}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <RadioField
                      options={veterianTadios}
                      msg={translate('is_veterian')}
                      value={values.isVeterian}
                      onChange={(e: any) => {
                        setFieldValue(
                          'isVeterian',
                          values.isVeterian ? !values.isVeterian : e.target.checked,
                        )
                      }}
                    />
                    {errors.isVeterian && touched.isVeterian ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isVeterian}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between w-full !mt-10">
                  <div className="flex-col">
                    <RadioField
                      options={lgtbRadios}
                      msg={translate('is_lgtb')}
                      value={values.isLgtb}
                      onChange={(e: any) => {
                        setFieldValue('isLgtb', values.isLgtb ? !values.isLgtb : e.target.checked)
                      }}
                    />
                    {errors.isLgtb && touched.isLgtb ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isLgtb}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex-col">
                    <RadioField
                      options={genders}
                      value={values.gender}
                      msg={translate('what_gender')}
                      onChange={(e: any) => {
                        setFieldValue('gender', e.target.value)
                        setOptions((prev) => ({ ...prev, isLgtb: e.target.value }))
                      }}
                    />
                    {errors.gender && touched.gender ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.gender}
                      </div>
                    ) : null}
                  </div>
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
