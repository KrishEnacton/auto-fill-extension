import { useRecoilValue } from 'recoil'
import { experienceAtom } from '../../../atoms'
import WorkExp from './WorkExp'
import { WorkExperience } from '../../../global'
import { notify } from '../../../utils'
import { translate } from '../../../utils/translate'
import PrimaryBtn from '../core/PrimaryBtn'

export default function WorkExpBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const experiences = useRecoilValue(experienceAtom)
  function submitHandler() {
    const result = setUserInfo(experiences)
    if (result) {
      notify('Data Saved', 'success')
    }
  }
  return (
    <div className='flex flex-col justify-center items-center my-8'>
      {experiences.map((experience: WorkExperience, index: number) => (
        <WorkExp key={index} ExpCounter={index + 1} experience={experience} setUserInfo={setUserInfo} />
      ))}
      <div className="!mt-6">
        <PrimaryBtn
          type="submit"
          customLoaderClass={'!h-4 !w-4'}
          name={translate('submit')}
          onClick={submitHandler}
        />
      </div>
    </div>
  )
}
