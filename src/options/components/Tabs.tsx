import { tabs } from '../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  // const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  const location = useLocation()
  const navigate = useNavigate()
  // Get the 'tab' query parameter from the current URL
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  // Initialize the selectedTab state with the currentTab value
  const [selectedTab, setSelectedTab] = useState(currentTab || tabs[0].name)

  // Update the selectedTab state and the 'tab' query parameter when clicking on a tab
  const handleTabClick = (tabName: any, slug: any) => {
    setSelectedTab(tabName)
    queryParams.set('tab', tabName)
    navigate(`/?tab=${slug}`)
  }

  // Listen for changes in the location to update the selectedTab state accordingly
  useEffect(() => {
    const updatedTab = queryParams.get('tab') || tabs[0].name
    setSelectedTab(updatedTab)
  }, [location.search])
  return (
    <div className="w-[1265px] shadow-md">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-base focus:ring-base"
          // defaultValue={tabs.find((tab: any) => tab.current)?.name}
          defaultValue={selectedTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="isolate flex rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              className={classNames(
                selectedTab == tab.name ? 'text-base' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-2 text-center text-sm font-medium hover:bg-gray-50 outline-none focus:z-10',
              )}
              onClick={() => handleTabClick(tab.name, tab.slug)}
              // aria-current={tab.current ? 'page' : undefined}
            >
              <span className="uppercase font-bold">{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  currentTab == tab.slug ? 'bg-base' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
