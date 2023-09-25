import { useRecoilState } from 'recoil'
import { educationListAtom, showForm, updateArray } from '../../../../atoms'
import Education from './Education'
import PrimaryBtn from '../../core/PrimaryBtn'
import { translate } from '../../../../utils/translate'
import {
  getNextTabName,
  getPrevTabName,
  hasEmptyValueWithDateValidation,
  notify,
} from '../../../../utils'
import { EducationProps, UserInfo } from '../../../../global'
import { useEffect, useLayoutEffect } from 'react'
import FormTitle from '../../generic/FormTitle'
import AddMore from '../../core/AddMore'
import useStorage from '../../../hooks/use-Storage'
import { useLocation, useNavigate } from 'react-router-dom'

export default function EducationBase({
  setUserInfo,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  getUserInfo: () => UserInfo
}) {
  const [educationList, setEducationList] = useRecoilState(educationListAtom)
  const [show, setShow] = useRecoilState(showForm)
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateArray)
  const { updateEducationList } = useStorage()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const userInfo = getUserInfo()

  function onSubmiHandler(type?: string) {
    if (hasEmptyValueWithDateValidation(updateFormArray) == 'valid') {
      updateEducationList(updateFormArray, setUpdateFormArray, false)
      const res = updateEducationList(updateFormArray, setUpdateFormArray, true)
      // if (res) {
      //   const nextTab = getNextTabName(currentTab)
      //   navigate(`/?tab=${nextTab}`)
      // }
    } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'validate') {
      notify('Start date must be less then end date', 'error')
    } else if (hasEmptyValueWithDateValidation(updateFormArray) == 'empty') {
      notify('All the fields are required', 'error')
    }
    if (educationList.length == 0) return
    if (type === 'previous') {
      const prevTab = getPrevTabName(currentTab)
      navigate(`/?tab=${prevTab}`)
    }
    if (type === 'next') {
      const nextTab = getNextTabName(currentTab)
      navigate(`/?tab=${nextTab}`)
    }
  }

  useEffect(() => {
    if (educationList?.length == 0) {
      setShow(true)
    }
  }, [educationList, show])

  useLayoutEffect(() => {
    setEducationList(userInfo?.education)
    if (userInfo?.education?.length > 0) setShow(false)
  }, [])

  return (
    <div className="flex flex-col items-start mb-8">
      <FormTitle name={translate('education_history')} />
      <div className="divide-y">
        {educationList &&
          educationList?.map((education: EducationProps, index: number) => (
            <div key={education.id + '' + index}>
              <Education
                EduCounter={index + 1}
                educationElem={education}
                setUserInfo={setUserInfo}
              />
            </div>
          ))}
        {show && (
          <Education
            onSubmiHandler={onSubmiHandler}
            setUserInfo={setUserInfo}
            getUserInfo={getUserInfo}
          />
        )}
      </div>

      {!show && (
        <div className="flex items-center flex-col justify-center space-x-5 w-full">
          <AddMore
            id={'internal-add-more'}
            label={translate('add_more')}
            onClick={() => {
              setShow(true)
            }}
          />
          <div className="flex !mt-8 items-center justify-between space-x-5 w-full">
            <div className="flex items-center justify-center">
              <PrimaryBtn
                type="submit"
                customLoaderClass={'!h-4 !w-4'}
                name={translate('previous')}
                onClick={() => onSubmiHandler('previous')}
              />
            </div>
            <div className="flex items-center justify-center">
              <PrimaryBtn
                customLoaderClass={'!h-4 !w-4'}
                name={translate('next')}
                type="submit"
                onClick={() => onSubmiHandler('next')}
                customClass="bg-secondary_button hover:bg-secondary_button/80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
