import { useRecoilValue } from 'recoil'
import { educationAtom } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {

  const _education = useRecoilValue(educationAtom)

  function submitHandler() {
    const result = setUserInfo(_education)
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-8">
      {_education.map((education, index: number) => (
        <Education key={index} education={education} EduCounter={index + 1} setUserInfo={setUserInfo} />
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
