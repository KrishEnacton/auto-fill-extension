import { useRecoilState } from 'recoil'
import { counterEducationAndExperience } from '../../../atoms'
import Education from './Education'
import { EducationProps } from '../../../global'

export default function EducationBase({
  setEducation,
}: {
  setEducation: (userParams: EducationProps) => Promise<boolean>
}) {
  const [counter, setCounter] = useRecoilState(counterEducationAndExperience)

  // Create an array of numbers from 1 to counter
  const counterArray = [...Array(counter.education).keys()]

  return (
    <>
      {counterArray.map((num) => (
        <Education key={num} EduCounter={num + 1} setEducation={setEducation} />
      ))}
    </>
  )
}
