import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { ethnicity } from '../../../constants'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import RadioField from '../core/RadioField'
import InputDropdown from '../dropdowns/InputDropdown'
import FormTitle from '../generic/FormTitle'

const disabilityRadios = [
  { id: 11, title: 'Yes', name: 'disability' },
  { id: 12, title: 'No', name: 'disability' },
]
const veterianTadios = [
  { id: 21, title: 'Yes', name: 'veterian' },
  { id: 22, title: 'No', name: 'veterian' },
]
const lgtbRadios = [
  { id: 31, title: 'Yes', name: 'lgtb' },
  { id: 32, title: 'No', name: 'lgtb' },
]

const genders = [
  { id: 41, title: 'Male', name: 'gender' },
  { id: 42, title: 'Female', name: 'gender' },
  { id: 43, title: 'Non-Binary', name: 'gender' },
]
export default function Ethinicity() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const [options, setOptions] = useState({
    gender: '',
    selectedEthinicity: '' as any,
  })

  const FormSchema = Yup.object().shape({
    isDisable: Yup.boolean().required(translate('required_msg')),
    isVeterian: Yup.boolean().required(translate('required_msg')),
    isLgtb: Yup.boolean().required(translate('required_msg')),
    gender: Yup.string().required(translate('required_msg')),
    selectedEthinicity: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          isDisable: '',
          isVeterian: '',
          isLgtb: '',
          gender: options.gender,
          selectedEthinicity: options.selectedEthinicity.name,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          setSubmit((prev) => ({ ...prev, loader: true, disable: true }))

          setSubmit((prev) => ({ ...prev, loader: false, disable: false }))
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
          <div className="py-4 px-6">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left space-y-4  ">
                <FormTitle name={translate('tell_about_yourself')} />
                <div className="text-lg max-w-[800px]">{translate('ethnicity_msg')}</div>

                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-6">
                  <div className="flex-col !mt-8">
                    <div className="block text-left text-lg font-semibold mt-3 mb-2 leading-6 text-gray-900">
                      {translate('what_ethnicity')}
                    </div>
                    <InputDropdown
                      data={ethnicity}
                      selected={options.selectedEthinicity}
                      onChange={(e: any) => {
                        setFieldValue('selectedEthinicity', e.name)
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
                  <div className="flex space-x-44 !mt-10">
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
                  <div className="flex space-x-44 !mt-10">
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
                        selected={options.gender}
                        msg={translate('what_gender')}
                        onChange={(e: any) => {
                          setFieldValue('gender', e.target.value)
                          setOptions((prev) => ({ ...prev, isVeterian: e }))
                        }}
                      />
                      {errors.gender && touched.gender ? (
                        <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                          {errors.gender}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="!mt-6">
                    <PrimaryBtn
                      disabled={submit.disable}
                      onClick={(e: any) => {
                        handleSubmit()
                      }}
                      type="submit"
                      loader={submit.loader}
                      customLoaderClass={'!h-4 !w-4'}
                      name={translate('submit')}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
