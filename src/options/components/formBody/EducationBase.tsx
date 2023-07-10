import { useRecoilState } from 'recoil'
import { counterEducationAndExperience } from '../../../atoms'
import Education from './Education'

export default function EducationBase() {
  const [counter, setCounter] = useRecoilState(counterEducationAndExperience)

  return (
    <>
      <Education counter={1} />
      <Education counter={2} />
    </>
  )
}
