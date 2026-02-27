'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from './DropDown'
import { useAuth } from '@/context/authContext'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const loggedIn = user != null
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link className="flex items-center space-x-3 group" href={'/'}>
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image 
                src="/assets/images/logo.png" 
                height={40}
                width={40} 
                alt="logo" 
                className='object-contain'
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              FindTheMissing
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/missingreport" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors relative group">
              Report Missing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-700 transition-all group-hover:w-full"></span>
            </Link>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors relative group">
              Resources
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-700 transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-700 transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-700 transition-all group-hover:w-full"></span>
            </a>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!loggedIn ? (
              <>
                <Link href="/login">
                  <button className="text-indigo-700 hover:text-indigo-900 font-medium px-5 py-2 rounded-lg transition-colors">
                    Đăng nhập
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Đăng ký
                  </button>
                </Link>
              </>
            ) : (
              <Dropdown />
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-indigo-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200/50 pt-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm font-medium text-indigo-700 hover:text-indigo-900 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Home
              </Link>
              <Link href="/missingreport" className="text-sm font-medium text-gray-700 hover:text-indigo-700 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Report Missing
              </Link>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Resources
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
                About
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-indigo-700 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Contact
              </a>
            </nav>
            
            {!loggedIn && (
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/login">
                  <button className="w-full text-indigo-700 hover:text-indigo-900 font-medium px-5 py-2 rounded-lg border border-indigo-700 hover:bg-indigo-50 transition-colors">
                    Đăng nhập
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all shadow-md">
                    Đăng ký
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
