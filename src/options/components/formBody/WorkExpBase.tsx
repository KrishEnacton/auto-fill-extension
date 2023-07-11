import { useRecoilValue } from 'recoil'
import { experienceAtom, isFirstJobAtom } from '../../../atoms'
import WorkExp from './WorkExp'
import { WorkExperience } from '../../../global'
import { notify } from '../../../utils'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'
import { useEffect } from 'react'

export default function WorkExpBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const experiences = useRecoilValue(experienceAtom)
  const isFirstJob = useRecoilValue(isFirstJobAtom)
  function submitHandler() {
    console.log({ experiences })
    const result = setUserInfo(experiences)
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  useEffect(() => {
    console.log({ isFirstJob })
  }, [isFirstJob])

  return (
    <div className={`flex flex-col ${!isFirstJob ? 'items-center' : 'items-start'} my-8`}>
      {!experiences ? (
        <WorkExp key={1} ExpCounter={1} setUserInfo={setUserInfo} />
      ) : (
        experiences?.map((experience: WorkExperience, index: number) => (
          <WorkExp
            key={index}
            ExpCounter={index + 1}
            experience={experience}
            setUserInfo={setUserInfo}
          />
        ))
      )}
      {isFirstJob && (
        <div className="text-base text-lg items-start px-6">
          Simplify is the go-to platform for students to land their first job.
        </div>
      )}

      {!isFirstJob && (
        <div className="!mt-6">
          <PrimaryBtn
            type="submit"
            customLoaderClass={'!h-4 !w-4'}
            name={translate('submit')}
            onClick={submitHandler}
          />
        </div>
      )}
    </div>
  )
}
