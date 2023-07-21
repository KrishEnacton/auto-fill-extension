import useStorage from '../../../options/hooks/use-Storage'
import PrimaryButton from '../PrimaryButton'

export default function Profile() {
  const { getUserInfo, getUserDetails } = useStorage()

  const userDetails: any = getUserInfo()
  const userLoginDetails: any = getUserDetails()

  const handleButtonClick = (slug: any) => {
    // Append the query parameter 'tab' with the value 'work-experience'
    const optionsPageUrl = `${chrome.runtime.getURL('options.html#/')}?tab=${slug}`
    const optionsPage = `${chrome.runtime.getURL('options.html#/')}`

    // Check if the options page is already open with any query parameters
    chrome.tabs.query({}, (tabs) => {
      const matchingTab: any = tabs.find((tab: any) => tab.url.startsWith(optionsPage))
      if (matchingTab) {
        // If the options page is already open with the query parameters, activate that tab
        chrome.tabs.update(matchingTab.id, { active: true, url: optionsPageUrl }, () => {
          // Get the current popup window and close it
          const views = chrome.extension.getViews({ type: 'popup' })
          if (views && views.length > 0) {
            views[0].close()
          }
        })
      } else {
        chrome.tabs.create({ url: optionsPageUrl }, () => {
          // Get the current popup window and close it
          const views = chrome.extension.getViews({ type: 'popup' })
          if (views && views.length > 0) {
            views[0].close()
          }
        })
      }
    })
  }

  return (
    <div className="mx-3">
      <div className="border-b border-gray-300">
        <div className="flex px-3 my-1 space-x-4">
          <div className="my-2">
            <span className="sr-only">Your profile</span>
            <img
              className="h-10 w-10 rounded-full bg-gray-800"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2LCSUO1MdStx7Ye8EMX4HkLf3-jhpodNNbrISg0Dm8_AlQ644V6AUNDZMVjYH2ckiZA&usqp=CAU"
              alt=""
            />
          </div>
          <div className="flex justify-center flex-col items-start">
            <div className="font-semibold">
              {userDetails?.basicInfo
                ? userDetails?.basicInfo?.firstName + ' ' + userDetails?.basicInfo?.lastName
                : ''}
            </div>
            <div>
              {userDetails?.basicInfo ? userDetails?.basicInfo?.email : userLoginDetails.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[275px] space-y-5 overflow-auto overflow-y-auto  mt-5 px-3 scrollbar">
        <div>
          <div className="flex mt-2 space-x-5">
            <div className="">
              <span className="sr-only">Your profile</span>
              <img
                className="h-10 w-10 rounded-full bg-gray-800"
                src="https://static.vecteezy.com/system/resources/thumbnails/004/263/549/small/education-logo-open-book-dictionary-textbook-or-notebook-with-graduation-hat-icon-modern-emblem-idea-concept-design-for-business-libraries-schools-universities-educational-courses-free-vector.jpg"
                alt=""
              />
            </div>
            <div className="mx-5 font-bold text-start mt-3 text-[17px]">Educations</div>
          </div>
          <div className="space-y-6 ">
            {userDetails?.education ? (
              userDetails?.education.map((education: any) => (
                <div key={education.id} className="flex pl-16 space-x-4">
                  {/* <div className="py-1">
                    <span className="sr-only">Your profile</span>
                    <img
                      className="h-2 w-2 rounded-full bg-gray-800"
                      src="https://static.thenounproject.com/png/584014-200.png"
                      alt=""
                    />
                  </div> */}
                  <div className="flex justify-center text-left flex-col items-start">
                    <div className="font-semibold text-[12px]">
                      {education.school_name + ' - ' + education.GPA}
                    </div>
                    <div className="max-w-[180px] leading-5 text-[11px]">
                      {education.major + ', ' + education.degree}
                    </div>
                    <div className="max-w-[180px] leading-5 text-[11px]">
                      {education.start_month +
                        ', ' +
                        education.start_year +
                        ' - ' +
                        education.end_month +
                        ', ' +
                        education.end_year}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-semibold text-start mx-5 pl-9 my-2">
                {' '}
                No education found. Please enter some.
              </div>
            )}
          </div>
          {/* {userDetails && userDetails?.education != undefined && (
            <PrimaryButton
              text={'EDIT'}
              onClick={() => handleButtonClick('education')}
              customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
            />
          )} */}
        </div>
        <div>
          <div className="flex space-x-5">
            <div className="">
              <span className="sr-only">Your profile</span>
              <img
                className="h-10 w-10 rounded-full bg-gray-800"
                src="https://png.pngtree.com/png-clipart/20220705/original/pngtree-customer-experience-line-icon-png-image_8326042.png"
                alt=""
              />
            </div>
            <div className="mx-5 font-bold text-start mt-3 text-[17px]">Experiences</div>
          </div>
          <div className="space-y-6 ">
            {userDetails?.experience ? (
              userDetails?.experience.map((experience: any) => (
                <div key={experience.id} className="flex pl-16 space-x-4">
                  {/* <div className="py-1">
                    <span className="sr-only">Your profile</span>
                    <img
                      className="h-2 w-2 rounded-full bg-gray-800"
                      src="https://static.thenounproject.com/png/584014-200.png"
                      alt=""
                    />
                  </div> */}
                  <div className="flex justify-center text-left flex-col items-start">
                    <div className="font-semibold text-[12px]">
                      {experience.company_name + ', ' + experience.position_title}
                    </div>
                    <div className="max-w-[180px] leading-5 text-[11px]">
                      {experience.experience_type}
                    </div>
                    <div className="max-w-[180px] leading-5 text-[11px]">
                      {experience.start_month +
                        ', ' +
                        experience.start_year +
                        ' - ' +
                        experience.end_month +
                        ', ' +
                        experience.end_year}
                    </div>
                    <div className="max-w-[180px] leading-5 text-[11px] line-clamp-2">
                      {experience.description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-semibold text-start mx-5 pl-9 my-2">
                {' '}
                No experience found. Please enter some.
              </div>
            )}
          </div>
          {/* {userDetails && userDetails?.experience != undefined && (
            <PrimaryButton
              text={'EDIT'}
              onClick={() => handleButtonClick('work-experience')}
              customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
            />
          )} */}
        </div>
        <div>
          <div className="flex space-x-5">
            <div className="">
              <span className="sr-only">Your profile</span>
              <img
                className="h-10 w-10 rounded-full bg-gray-800"
                src="https://thumbs.dreamstime.com/b/skills-icon-vector-illustration-white-background-skills-icon-vector-illustration-119366579.jpg"
                alt=""
              />
            </div>
            <div className="mx-5 font-bold text-start mt-3 text-[17px]">Skills</div>
          </div>
          <div className="flex flex-wrap items-center justify-center overflow-y-auto pl-10 space-x-2">
            {userDetails?.skills ? (
              userDetails?.skills.map((experience: any) => (
                <button
                  key={experience.id}
                  className="bg-gray-200 rounded px-1 py-1 my-1 font-semibold text-[10px]"
                >
                  {experience.label}
                </button>
              ))
            ) : (
              <div className="font-semibold text-start mx-2 pl-6 ">
                No experience found. Please enter some.
              </div>
            )}
          </div>
          {userDetails && (
            <PrimaryButton
              text={'EDIT'}
              onClick={() => handleButtonClick('personal')}
              customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
            />
          )}
        </div>
      </div>
    </div>
  )
}
