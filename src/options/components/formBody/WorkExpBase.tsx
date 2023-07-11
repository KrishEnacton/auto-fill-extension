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
    const result = setUserInfo({experience: [...experiences, experience]})
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  useEffect(() => {
    //@ts-ignore
    Array.from(document.querySelector('#main-card').getElementsByTagName('input')).forEach(
      (item: any) => {
        item.value = ''
      },
    )
    //@ts-ignore
    Array.from(document.querySelector('#main-card').getElementsByTagName('textarea')).forEach(
      (item: any) => {
        item.value = ''
      },
    )
  }, [experiences])
  return (
    <div className={`flex flex-col ${!isFirstJob ? 'items-center' : 'items-start'} my-8`}>
      <div className='text-3xl font-bold'>{translate('work_experience')}</div>
      <div className='flex-col w-[820px]'>
        <Checkbox
          label={translate('first_job_msg')}
          value={isFirstJob}
          onChange={(e: any) => {
            setIsFirstJob(e.target.checked)
            setUserInfo({ isFirstJob: e.target.checked })
          }}
        />
      </div>
      {!isFirstJob && experiences &&
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
        <div className='text-base text-lg items-start px-6'>
          Simplify is the go-to platform for students to land their first job.
        </div>
      )}

      {!isFirstJob && (
        <>
          <div className='!mt-6'>
            <PrimaryBtn
              type='submit'
              onClick={() => {
                setExperiences((prev) => {
                  if (Array.isArray(prev)) {
                    return [...prev, experience]
                  } else return [experience]
                })
              }}
              customLoaderClass={'!h-4 !w-4'}
              name={translate('add_more')}
            />
          </div>
          <div className='!mt-6'>
            <PrimaryBtn
              type='submit'
              customLoaderClass={'!h-4 !w-4'}
              name={translate('submit')}
              onClick={submitHandler}
            />
          </div>
        </>
      )}
    </div>
  )
}
