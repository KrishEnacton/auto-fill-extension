import { useRecoilState } from 'recoil'
import { counterEducationAndExperience } from '../../../atoms'
import WorkExp from './WorkExp'

export default function WorkExpBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [counter, setCounter] = useRecoilState(counterEducationAndExperience)

  const counterArray = [...Array(counter.experience).keys()]

  return (
    <>
      {counterArray.map((num) => (
        <WorkExp key={num} ExpCounter={num + 1} setUserInfo={setUserInfo} />
      ))}
    </>
  )
}
