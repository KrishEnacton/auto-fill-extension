import useStorage from '../../../options/hooks/use-Storage'
import PrimaryButton from '../PrimaryButton'

export default function Profile() {
  const { getUserInfo } = useStorage()

  const userDetails: any = getUserInfo()

  const handleButtonClick = () => {
    // Append the query parameter 'tab' with the value 'work-experience'
    const optionsPageUrl = `${chrome.runtime.getURL('options.html#/')}?tab=work-experience`
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
        <div className="flex px-3 space-x-4">
          <div className="my-2 p-1.5">
            <span className="sr-only">Your profile</span>
            <img
              className="h-10 w-10 rounded-full bg-gray-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex justify-center flex-col items-start">
            <div className="font-semibold">
              {userDetails?.basicInfo
                ? userDetails?.basicInfo?.firstName + ' ' + userDetails?.basicInfo?.lastName
                : ''}
            </div>
            <div>{userDetails?.basicInfo ? userDetails?.basicInfo?.email : ''}</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="mx-5 font-bold text-start mt-3">Experience</div>
        <div className="space-y-6 max-h-[177px] overflow-auto overflow-y-auto scrollbar">
          {userDetails?.experience ? (
            userDetails?.experience.map((experience: any) => (
              <div key={experience.id} className="flex px-3 space-x-4 my-3">
                <div className="">
                  <span className="sr-only">Your profile</span>
                  <img
                    className="h-10 w-10 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="flex justify-center text-left flex-col items-start">
                  <div className="font-semibold text-[10px]">
                    {experience.company_name + ', ' + experience.location.name}
                  </div>
                  <div className="max-w-[153px] leading-4 text-[9px]">
                    {experience.position_title + ', ' + experience.experience_type}
                  </div>
                  <div className="max-w-[153px] leading-4 text-[9px]">
                    {experience.start_month +
                      ', ' +
                      experience.start_year +
                      ' - ' +
                      experience.end_month +
                      ', ' +
                      experience.end_year}
                  </div>
                  <div className="max-w-[153px] leading-4 text-[9px]">{experience.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="font-semibold text-start mx-5 my-2"> No experiences found.</div>
          )}
        </div>
      </div>
      {userDetails.experience != undefined && (
        <PrimaryButton
          text={'EDIT'}
          onClick={handleButtonClick}
          customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
        />
      )}
    </div>
  )
}
