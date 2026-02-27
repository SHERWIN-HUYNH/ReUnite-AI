import React from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import SidebarDropdown from './SidebarDropdown'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : ''
    return setPageName(updatedPageName)
  }

  const pathname = usePathname()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = (item: any) => {
    if (item.route === pathname) return true
    if (item.children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return item.children.some((child: any) => isActive(child))
    }
    return false
  }

  const isItemActive = isActive(item)

  return (
    <>
      <li>
        <Link
          href={item.route}
          onClick={handleClick}
          className={`
            group relative flex items-center gap-3 rounded-xl px-4 py-3 font-medium
            transition-all duration-300 ease-in-out
            ${isItemActive 
              ? 'bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white shadow-lg shadow-cyan-500/30 scale-[1.02]' 
              : 'text-slate-700 dark:text-white hover:bg-indigo-100 dark:hover:bg-white/10 hover:translate-x-1'
            }
          `}
        >
          <span className={`transition-transform duration-300 ${isItemActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            {item.icon}
          </span>
          <span className={`${isItemActive ? 'font-semibold' : ''}`}>
            {item.label}
          </span>
          
          {/* Active indicator dot */}
          {isItemActive && (
            <span className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></span>
          )}
          
          {item.children && (
            <svg
              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-300 ${
                pageName === item.label.toLowerCase() && 'rotate-180'
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </Link>

        {item.children && (
          <div
            className={` translate-x-1 transform overflow-hidden ${
              pageName !== item.label.toLowerCase() && 'hidden'
            }`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  )
}

export default SidebarItem
