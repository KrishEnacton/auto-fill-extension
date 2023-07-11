import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { addMore, educationAtom, educationCounter, educationListAtom } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'
import { EducationProps } from '../../../global'
import AddIcon from '@heroicons/react/24/outline/PlusCircleIcon'
import { useEffect } from 'react'
import useStorage from '../../hooks/use-Storage'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)
  const [counter, setCounter] = useRecoilState(educationCounter)

  function submitHandler() {
    console.log({ _education })
    setEducationList((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, _education]
      } else return [_education]
    })
    const result = setUserInfo({
      education: Array.isArray(_educationList) ? [..._educationList, _education] : [_education],
    })
    if (result) {
      setEducation({
        id: 0,
        school_name: '',
        major: '',
        degree: '',
        GPA: '',
        start_month: '',
        end_month: '',
        start_year: '',
        end_year: '',
      })
      notify('Data Saved', 'success')
    }
  }

  useEffect(() => {
    const { getUserInfo } = useStorage()

    const userInfo = getUserInfo()?.education
    if (userInfo) {
      setEducationList(userInfo)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="text-3xl font-bold">{translate('education_history')}</div>
      {_educationList &&
        _educationList?.map((education: EducationProps, index: number) => (
          <Education
            key={index}
            EduCounter={index + 1}
            education={education}
            setUserInfo={setUserInfo}
          />
        ))}
      <div className="!mt-6">
        <button
          className="flex gap-x-6 border bg-base rounded-md py-2 px-6"
          onClick={(e: any) => {
            console.log({ _education })
            if (Object.values(_education).length == 9) {
              console.log('check', _education)
              setEducationList((prev) => {
                if (Array.isArray(prev)) {
                  return [...prev, _education]
                } else return [_education]
              })
              setEducation({
                id: 0,
                school_name: '',
                major: '',
                degree: '',
                GPA: '',
                start_month: '',
                end_month: '',
                start_year: '',
                end_year: '',
              })
            }
          }}
        >
          <span className="text-2xl font-bold mt-1">{translate('add_more')}</span>
          <AddIcon className="w-8 h-8" />
        </button>
      </div>
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
