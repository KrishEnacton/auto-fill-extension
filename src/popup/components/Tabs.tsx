import React, { useState } from 'react';

const tabs = [
  { name: 'My Account', href: '#', icon: 'home', activeIcon: 'home.svg', inactiveIcon: 'home-gray.svg' },
  { name: 'Company', href: '#', icon: 'profile', activeIcon: 'person.svg', inactiveIcon: 'person-gray.svg' },
];

export default function Tabs({currentTab,setCurrentTab}:any) {

  const handleTabClick = (tabIndex:any) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div>
      <div className="absolute w-full flex justify-center items-center bottom-1">
        <nav className="flex space-x-16" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <a
              key={tab.name}
              href={tab.href}
              className="py-2"
              aria-current={index === currentTab ? 'page' : undefined}
            >
              <button onClick={() => handleTabClick(index)}>
                {currentTab === index ? (
                  <img src={`icons/${tab.activeIcon}`} alt={`${tab.name} Icon`} />
                ) : (
                  <img src={`icons/${tab.inactiveIcon}`} alt={`${tab.name} Icon (Gray)`} />
                )}
              </button>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
