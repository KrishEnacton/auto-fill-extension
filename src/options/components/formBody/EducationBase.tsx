import { useRecoilState } from 'recoil'
import { educationAtom, educationListAtom } from '../../../atoms'
import Education from './Education'
import PrimaryBtn from '../core/PrimaryBtn'
import { translate } from '../../../utils/translate'
import { notify } from '../../../utils'
import { EducationProps } from '../../../global'
import { useEffect } from 'react'
import FormTitle from '../generic/FormTitle'

export default function EducationBase({
  setUserInfo,
}: {
  setUserInfo: (userParams: any) => boolean
}) {
  const [_education, setEducation] = useRecoilState(educationAtom)
  const [_educationList, setEducationList] = useRecoilState(educationListAtom)

  useEffect(() => {
    //@ts-ignore
    Array.from(document.querySelector('#main-card').getElementsByTagName('input')).forEach(
      (item: any) => {
        item.value = ''
      },
    )
    console.log(_educationList, 'ggg')
  }, [_educationList])

  return (
    <div className="flex flex-col items-start mb-8">
      <FormTitle name={translate('education_history')} />
      <div className="divide-y">
        {_educationList &&
          _educationList?.map((education: EducationProps, index: number) => (
            <div key={index}>
              <Education EduCounter={index + 1} education={education} setUserInfo={setUserInfo} />
            </div>
          ))}
        <Education setUserInfo={setUserInfo} />
      </div>

      {/* <div className="flex items-center flex-col justify-center space-x-5 w-full">
        <AddMore
          label={translate('add_more')}
          onClick={() => {
            setEducationList((prev) => {
              if (Array.isArray(prev)) {
                return [...prev, _education]
              } else return [_education]
            })
          }}
        />
        <div className="flex items-center justify-between space-x-5 w-full">
          <div className="!mt-8 flex items-center justify-center">
            <PrimaryBtn
              type="submit"
              customLoaderClass={'!h-4 !w-4'}
              name={translate('save')}
              onClick={submitHandler}
            />
          </div>
          <div className="!mt-8 flex items-center justify-center">
            <PrimaryBtn
              type="submit"
              customLoaderClass={'!h-4 !w-4'}
              name={translate('next')}
              customClass="bg-secondary_button hover:bg-secondary_button/80"
            />
          </div>
        </div>
      </div> */}
    </div>
  )
}
