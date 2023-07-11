import { useRecoilState, useRecoilValue } from 'recoil'
import { educationAtom, educationCounter } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'
import { EducationProps } from '../../../global'
import { useEffect } from 'react'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const _education = useRecoilValue(educationAtom)
  const [counter, setEducationCounter] = useRecoilState(educationCounter)

  function submitHandler() {
    const result = setUserInfo({ education: _education })
    if (result) {
      notify('Data Saved', 'success')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="text-3xl font-bold">{translate('education_history')}</div>
      {_education &&
        _education?.map((education: EducationProps, index: number) => (
          <Education
            key={index}
            EduCounter={index + 1}
            education={education}
            setUserInfo={setUserInfo}
          />
        ))}
      <Education key={counter} EduCounter={counter} setUserInfo={setUserInfo} />
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
