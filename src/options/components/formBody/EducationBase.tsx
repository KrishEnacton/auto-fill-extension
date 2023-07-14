import { useRecoilState } from 'recoil'
import {
  educationAtom,
  educationListAtom,
  selectedTabState,
  showForm,
  updateArray,
} from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { getNextTabName, notify } from '../../../utils'
import { EducationProps } from '../../../global'
import { useEffect, useState } from 'react'
import FormTitle from '../generic/FormTitle'
import AddMore from '../core/AddMore'
import useStorage from '../../hooks/use-Storage'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [show, setShow] = useRecoilState(showForm)
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)
  const { updateUserInfo } = useStorage()
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
            <div key={index}>
              <Education EduCounter={index + 1} education={education} setUserInfo={setUserInfo} />
            </div>
          ))}
        {show && <Education setUserInfo={setUserInfo} />}
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
                  console.log('hhhhhhhh')
                  console.log({ updateFormArray })
                  updateUserInfo(updateFormArray)
                }}
              />
            </div>
            <div className="!mt-8 flex items-center justify-center">
              <PrimaryBtn
                customLoaderClass={'!h-4 !w-4'}
                name={translate('next')}
                type="submit"
                onClick={() => {
                  const nextTab = getNextTabName(selectedTab)
                  setSelectedTab(nextTab)
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
