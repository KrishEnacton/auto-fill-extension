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
  { id: 1, title: 'Yes' , name:"disability"},
  { id: 2, title: 'No' , name:"disability"},
]
const veterianTadios = [
  { id: 1, title: 'Yes' , name:"veterian"},
  { id: 2, title: 'No' ,name:"veterian"},
]
const lgtbRadios = [
  { id: 1, title: 'Yes' ,  name:"lgtb"},
  { id: 2, title: 'No' ,  name:"lgtb"},
]

const genders = [
  { id: 1, title: 'Male' , name:"gender"},
  { id: 2, title: 'Female' , name:"gender"},
  { id: 3, title: 'Non-Binary', name:"gender" },
]
export default function Ethinicity() {
  const [submit, setSubmit] = useState({ loader: false, disable: false })

  const [options, setOptions] = useState({
    isDisable: "",
    isVeterian: "",
    isLgtb: "",
    gender:"",
    selectedEthinicity: "" as any,
  })

  const FormSchema = Yup.object().shape({
    isDisable: Yup.string().required(translate('required_msg')),
    isVeterian: Yup.string().required(translate('required_msg')),
    isLgtb: Yup.string().required(translate('required_msg')),
    gender: Yup.string().required(translate('required_msg')),
    selectedEthinicity: Yup.string().required(translate('required_msg')),
  })

  return (
    <>
      <Formik
        initialValues={{
          isDisable: options.isDisable,
          isVeterian: options.isVeterian,
          isLgtb: options.isLgtb,
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
          <div className="  py-4 px-6 lg:px-0">
            <div className="flex items-center justify-center  ">
              <div className="w-full text-black text-left space-y-4 max-w-[400px]">
                <FormTitle name={translate('tell_about_yourself')} />
                <div>{translate('ethnicity_msg')}</div>

                <form onSubmit={(e) => e.preventDefault()} className="text-center space-y-6">
                  <div className="flex-col">
                    <div className="block text-left text-md mt-3 mb-2 font-medium leading-6 text-gray-900">
                      {translate('what_ethnicity')}
                    </div>
                    <InputDropdown
                      data={ethnicity}
                      selected={options.selectedEthinicity}
                      onChange={(e: any) => {
                        setFieldValue('selectedEthinicity', e.name)
                        setOptions((prev) => ({ ...prev, selectedEthinicity: e }))
                      }}
                      placeholder={"Please select your ethnicity  "}
                    />
                    {errors.selectedEthinicity && touched.selectedEthinicity ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.selectedEthinicity as any}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-col">
                    <RadioField
                      options={disabilityRadios}
                      selected={options.isDisable}
                      msg={translate('have_disability')}
                      onChange={(e: any) => {
                        setFieldValue('isDisable', e.target.name)
                        setOptions((prev) => ({ ...prev, isDisable: e }))
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
                      selected={options.isVeterian}
                      msg={translate('is_veterian')}
                      onChange={(e: any) => {
                        setFieldValue('isVeterian', e.target.value)
                        setOptions((prev) => ({ ...prev, isVeterian: e }))
                      }}
                    />
                    {errors.isVeterian && touched.isVeterian ? (
                      <div className="mt-2 ml-1 text-xs text-red-500 text-left">
                        {errors.isVeterian}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex-col">
                    <RadioField
                      options={lgtbRadios}
                      selected={options.isLgtb}
                      msg={translate('is_lgtb')}
                      onChange={(e: any) => {
                        setFieldValue('isLgtb', e.target.value)
                        setOptions((prev) => ({ ...prev, isLgtb: e }))
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
