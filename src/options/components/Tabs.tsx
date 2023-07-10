import { selectedTabState } from '../../atoms'
import { useRecoilState } from 'recoil'
import { tabs } from '../../constants'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)
  return (
    <div className="w-[1250px] shadow-md">
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
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-2 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
              )}
              onClick={() => setSelectedTab(tab.name)}
              // aria-current={tab.current ? 'page' : undefined}
            >
              <span className='uppercase'>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  selectedTab == tab.name ? 'bg-base' : 'bg-transparent',
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
