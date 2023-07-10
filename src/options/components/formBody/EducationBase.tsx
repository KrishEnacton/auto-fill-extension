import { useRecoilState } from 'recoil'
import { counterEducationAndExperience } from '../../../atoms'
import Education from './Education'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => Promise<boolean>
}) {
  const [counter, setCounter] = useRecoilState(counterEducationAndExperience)

  // Create an array of numbers from 1 to counter
  const counterArray = [...Array(counter.education).keys()]

  return (
    <>
      {counterArray.map((num) => (
        <Education key={num} EduCounter={num + 1} setUserInfo={setUserInfo} />
      ))}
    </>
  )
}
