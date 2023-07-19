import { useRecoilValue, useRecoilState } from 'recoil'
import {
  ExperienceForm,
  experienceAtom,
  experienceListAtom,
  isFirstJobAtom,
  updateExpArray,
} from '../../../atoms'
import WorkExp from './WorkExp'
import { UserInfo, WorkExperience } from '../../../global'
import { getNextTabName, hasEmptyValueWithDateValidation, notify } from '../../../utils'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import { useEffect } from 'react'
import Checkbox from '../core/Checkbox'
import useStorage from '../../hooks/use-Storage'
import FormTitle from '../generic/FormTitle'
import AddMore from '../core/AddMore'
import { useLocation, useNavigate } from 'react-router-dom'

export default function WorkExpBase({
  setUserInfo,
  getUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
  getUserInfo: () => UserInfo
}) {
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [show, setShow] = useRecoilState(ExperienceForm)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const { updateExpList } = useStorage()
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateExpArray)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')

  useEffect(() => {
    if (experiences?.length == 0) {
      setShow(true)
    }
  }, [experiences, show])

  return (
    <div className={`flex flex-col items-start mb-8`}>
      <FormTitle name={translate('work_experience')} />
      <Checkbox
        customClass="justify-center items-center w-full !my-0"
        label={translate('first_job_msg')}
        value={isFirstJob}
        onChange={(e: any) => {
          setIsFirstJob(e.target.checked)
          setUserInfo({ is_first_job: e.target.checked })
        }}
      />

      {!isFirstJob && (
        <div className="divide-y">
          {experiences && (
            <>
              {experiences?.map((experience: WorkExperience, index: number) => (
                <WorkExp
                  key={experience.id}
                  ExpCounter={index + 1}
                  experience={experience}
                  setUserInfo={setUserInfo}
                />
              ))}
            </>
          )}
          {show && <WorkExp setUserInfo={setUserInfo} getUserInfo={getUserInfo} />}
        </div>
      )}
      {isFirstJob && (
        <div className="text-primary_text text-lg items-start my-4 font-semibold px-6">
          Autofill is the ultimate platform for students, offers everything they need to
          successfully secure their first job.
        </div>
      )}

      {!isFirstJob && !show && (
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
                    updateExpList(updateFormArray, setUpdateFormArray, false)
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
                    updateExpList(updateFormArray, setUpdateFormArray, true)
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
