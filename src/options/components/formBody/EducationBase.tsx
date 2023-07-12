import { useRecoilState, useRecoilValue } from 'recoil'
import { educationAtom, educationCounter, educationListAtom } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'
import { EducationProps } from '../../../global'
import { useEffect } from 'react'
import FormTitle from '../generic/FormTitle'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [counter, setEducationCounter] = useRecoilState(educationCounter)

  function submitHandler() {
    setEducationList((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, _education]
      } else return [_education]
    })
    const result = setUserInfo({
      education: [..._educationList, _education],
    })
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
  }, [_educationList])
  return (
    <div className="flex flex-col items-start mb-8">
      <FormTitle name={translate('education_history')} />
      {_educationList &&
        _educationList?.map((education: EducationProps, index: number) => (
          <Education
            key={index}
            EduCounter={index + 1}
            education={education}
            setUserInfo={setUserInfo}
          />
        ))}
      <Education setUserInfo={setUserInfo} />
      <div className="flex items-center justify-center space-x-5 w-full">
        <div className="!mt-8 flex items-center justify-center">
          <PrimaryBtn
            type="submit"
            customClass="bg-primary_button hover:bg-primary_button/80"
            customLoaderClass={'!h-4 !w-4'}
            name={translate('add_more')}
            onClick={() => {
              setEducationList((prev) => {
                if (Array.isArray(prev)) {
                  return [...prev, _education]
                } else return [_education]
              })
            }}
            rightIcon={<PlusCircleIcon className="h-5 w-5" />}
          />
        </div>
        <div className="!mt-8 flex items-center justify-center">
          <PrimaryBtn
            type="submit"
            customLoaderClass={'!h-4 !w-4'}
            name={translate('submit')}
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  )
}
