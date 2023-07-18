import { useRecoilState } from 'recoil'
import { educationAtom, educationListAtom, showForm, updateArray } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import {
  getMonthIndex,
  getNextTabName,
  hasEmptyValueWithDateValidation,
  notify,
} from '../../../utils'
import { EducationProps, UserInfo } from '../../../global'
import { useEffect, useState } from 'react'
import FormTitle from '../generic/FormTitle'
import AddMore from '../core/AddMore'
import useStorage from '../../hooks/use-Storage'
import { useLocation, useNavigate } from 'react-router-dom'

export default function EducationBase({
  setUserInfo,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  getUserInfo: () => UserInfo
}) {
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [show, setShow] = useRecoilState(showForm)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)
  const { updateEducationList } = useStorage()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')

  useEffect(() => {
    if (_educationList?.length == 0) {
      setShow(true)
    }
  }, [_educationList, show])

  return (
    <div className="flex flex-col items-start mb-8">
      <FormTitle name={translate('education_history')} />
      <div className="divide-y">
        {_educationList &&
          _educationList?.map((education: EducationProps, index: number) => (
            <div key={education.id}>
              <Education EduCounter={index + 1} education={education} setUserInfo={setUserInfo} />
            </div>
          ))}
        {show && <Education setUserInfo={setUserInfo} getUserInfo={getUserInfo} />}
      </div>

      {!show && (
        <div className="flex items-center flex-col justify-center space-x-5 w-full">
          <AddMore
            label={translate('add_more')}
            onClick={() => {
              setShow(true)
            }}
          />
          <div className="flex items-center justify-between space-x-5 w-full">
            <div className="!mt-8 flex items-center justify-center">
              <PrimaryBtn
                type="submit"
                customLoaderClass={'!h-4 !w-4'}
                name={translate('save')}
                onClick={() => {
                  if (hasEmptyValueWithDateValidation(updateFormArray) == 'valid') {
                    updateEducationList(updateFormArray, setUpdateFormArray, false)
                  } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'validate') {
                    notify('Start date must be less then end date', 'error')
                  } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'empty') {
                    notify('All the fields are required', 'error')
                  }
                }}
              />
            </div>
            <div className="!mt-8 flex items-center justify-center">
              <PrimaryBtn
                customLoaderClass={'!h-4 !w-4'}
                name={translate('next')}
                type="submit"
                onClick={() => {
                  if (hasEmptyValueWithDateValidation(updateFormArray) == 'valid') {
                    updateEducationList(updateFormArray, setUpdateFormArray, true)
                  } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'validate') {
                    notify('Start date must be less then end date', 'error')
                  } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'empty') {
                    notify('All the fields are required', 'error')
                  }
                }}
                customClass="bg-secondary_button hover:bg-secondary_button/80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
