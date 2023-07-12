import { useRecoilValue, useRecoilState } from 'recoil'
import { experienceAtom, experienceListAtom, isFirstJobAtom } from '../../../atoms'
import WorkExp from './WorkExp'
import { WorkExperience } from '../../../global'
import { notify } from '../../../utils'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import { useEffect } from 'react'
import Checkbox from '../core/Checkbox'
import useStorage from '../../hooks/use-Storage'
import FormTitle from '../generic/FormTitle'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function WorkExpBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [experiences, setExperiences] = useRecoilState(experienceListAtom)
  const [experience, setExperience] = useRecoilState(experienceAtom)
  const { getUserInfo } = useStorage()
  const [isFirstJob, setIsFirstJob] = useRecoilState(isFirstJobAtom)
  function submitHandler() {
    setExperiences((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, experience]
      } else return [experience]
    })
    const result = setUserInfo({ experience: [...experiences, experience] })
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  useEffect(() => {
    //@ts-ignore
    if (document?.querySelector('#main-card')?.getElementsByTagName('input'))
      //@ts-ignore
      Array.from(document?.querySelector('#main-card').getElementsByTagName('input')).forEach(
        (item: any) => {
          item.value = ''
        },
      )
    //@ts-ignore
    if (document?.querySelector('#main-card')?.getElementsByTagName('textarea'))
      //@ts-ignore
      Array.from(document?.querySelector('#main-card').getElementsByTagName('textarea')).forEach(
        (item: any) => {
          if (item.type === 'checkbox') item.checked = false
          item.value = ''
        },
      )
  }, [experiences])
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
      {!isFirstJob &&
        experiences &&
        experiences?.map((experience: WorkExperience, index: number) => (
          <WorkExp
            key={index}
            ExpCounter={index + 1}
            experience={experience}
            setUserInfo={setUserInfo}
          />
        ))}
      {!isFirstJob && <WorkExp setUserInfo={setUserInfo} />}
      {isFirstJob && (
        <div className="text-primary_text text-lg items-start my-4 font-semibold px-6">
          Simplify is the go-to platform for students to land their first job.
        </div>
      )}

      {!isFirstJob && (
        <div className="flex items-center justify-center space-x-5 w-full">
          <div className="!mt-8 flex items-center justify-center">
            <PrimaryBtn
              type="submit"
              onClick={() => {
                setExperiences((prev) => {
                  if (Array.isArray(prev)) {
                    return [...prev, experience]
                  } else return [experience]
                })
              }}
              customLoaderClass={'!h-4 !w-4'}
              customClass="bg-primary_button hover:bg-primary_button/80"
              name={translate('add_more')}
              rightIcon={<PlusCircleIcon className="h-5 w-5" />}
            />
          </div>
          <div className="!mt-8 flex items-center justify-center">
            <PrimaryBtn
              type="submit"
              customLoaderClass={'!h-4 !w-4'}
              name={translate('submit')}
              onClick={submitHandler}
            />
          </div>
        </div>
      )}
    </div>
  )
}
