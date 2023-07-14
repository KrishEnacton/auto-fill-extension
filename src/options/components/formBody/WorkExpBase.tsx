import { useRecoilValue, useRecoilState } from 'recoil'
import {
  ExperienceForm,
  experienceAtom,
  experienceListAtom,
  isFirstJobAtom,
  selectedTabState,
  updateExpArray,
} from '../../../atoms'
import WorkExp from './WorkExp'
import { WorkExperience } from '../../../global'
import { getNextTabName, notify } from '../../../utils'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import { useEffect } from 'react'
import Checkbox from '../core/Checkbox'
import useStorage from '../../hooks/use-Storage'
import FormTitle from '../generic/FormTitle'
import AddMore from '../core/AddMore'

export default function WorkExpBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [experience, setExperience] = useRecoilState(experienceAtom)
  const { getUserInfo } = useStorage()
  const [show, setShow] = useRecoilState(ExperienceForm)
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const { updateExpData } = useStorage()
  const [updateFormArray, setUpdateFormArray] = useRecoilState(updateExpArray)

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
          setUserInfo({ isFirstJob: e.target.checked })
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
          {show && <WorkExp setUserInfo={setUserInfo} />}
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
                  updateExpData(updateFormArray)
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
