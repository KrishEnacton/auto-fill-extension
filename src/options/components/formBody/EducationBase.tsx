import { useRecoilState, useRecoilValue } from 'recoil'
import { counterEducationAndExperience, educationAtom } from '../../../atoms'
import Education from './Education'
import { EducationProps } from '../../../global'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'
import useStorage from '../../hooks/use-Storage'

export default function EducationBase({
  setEducation,
}: {
  setEducation: (userParams: any) => Promise<boolean>
}) {
  const { getUserInfo } = useStorage()

  const userInfo = getUserInfo()
  const [counter, setCounter] = useRecoilState(counterEducationAndExperience)
  const _education = useRecoilValue(educationAtom)

  // Create an array of numbers from 1 to counter
  const counterArray = [...Array(counter.education).keys()]
  console.log(counter.education)

  async function submitHandler() {
    console.log(_education)
    const result = await setEducation(_education)
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-8">
      {counterArray.map((num) => (
        <Education key={num} EduCounter={num + 1} setEducation={setEducation} />
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
