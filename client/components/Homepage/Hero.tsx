'use client'
import React from 'react'
import Link from 'next/link'
import { HeartHandshake, Search, Users } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
                    <HeartHandshake className="w-4 h-4" />
                    <span className="text-sm font-medium">Reuniting Families Since 2024</span>
                </div>
                
                {/* Main heading with gradient */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Helping Reconnect <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">Missing Persons</span> with Their Families
                </h1>
                
                <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Our platform assists in locating missing individuals through community reporting, advanced facial recognition search tools, and nationwide alerts.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <Link href="/missingreport">
                        <button className="group bg-white text-indigo-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Report Missing Person
                        </button>
                    </Link>
                    <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" />
                        Learn How to Help
                    </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/20">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">10K+</div>
                        <div className="text-sm md:text-base opacity-80">Reports Filed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">5K+</div>
                        <div className="text-sm md:text-base opacity-80">Reunited Families</div>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                        <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                        <div className="text-sm md:text-base opacity-80">Support Available</div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 md:h-16 fill-current text-slate-50 dark:text-slate-800" viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,32L80,29.3C160,27,320,21,480,21.3C640,21,800,27,960,32C1120,37,1280,43,1360,45.3L1440,48L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z"></path>
            </svg>
        </div>
    </section>
  )
}

export default Hero
