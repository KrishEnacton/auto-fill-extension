import React, { useEffect, useState } from 'react'
import useStorage from '../../../options/hooks/use-Storage'
import PrimaryButton from '../PrimaryButton'

export default function Profile() {
  const { getUserDetails, getUserInfo } = useStorage()

  const userDetails = getUserDetails()
  const userExperience: any = getUserInfo()
  const [expriences, setExpriences] = useState(userExperience.experience || [])

  const experiences = userExperience.experience
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
            <div className="font-semibold">John Mary</div>
            <div>{userDetails ? userDetails.email : ''}</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="mx-5 font-bold text-start mt-3">Experience</div>
        <div className="space-y-6 max-h-[177px] overflow-auto overflow-y-auto scrollbar">
          {userExperience.experience ? (
            userExperience.experience.map((experience: any) => (
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
      {userExperience.experience != undefined && (
        <PrimaryButton
          text={'EDIT'}
          customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
        />
      )}
    </div>
  )
}
