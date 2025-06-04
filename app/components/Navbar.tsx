"use client"
import { useState } from "react"
import { useJobCardToggle } from "@/app/hooks/useJobCardToggle"
import { Menu, X } from "lucide-react" // Install lucide-react if not already

const Navbar = () => {
  const { toggleCard } = useJobCardToggle()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-slate-50 shadow-sm font-normal shadow-slate-300 px-4 py-4 rounded-full max-w-[1000px] mx-auto mt-3 font-satoshi">
      <div className="flex items-center justify-between">
        <img src="cmwlogo (1) 1.svg" alt="logo" className="h-8 w-auto" />

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center">
          <h1 className="cursor-pointer">Home</h1>
          <h1 className="cursor-pointer">Find Jobs</h1>
          <h1 className="cursor-pointer">Find Talents</h1>
          <h1 className="cursor-pointer">About us</h1>
          <h1 className="cursor-pointer">Testimonials</h1>
        </div>

   
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <button
          className="hidden md:block rounded-full bg-gradient-purple px-4 py-1 text-white"
          onClick={toggleCard}
        >
          Create Jobs
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-2 md:hidden">
          <h1 className="cursor-pointer">Home</h1>
          <h1 className="cursor-pointer">Find Jobs</h1>
          <h1 className="cursor-pointer">Find Talents</h1>
          <h1 className="cursor-pointer">About us</h1>
          <h1 className="cursor-pointer">Testimonials</h1>
          <button
            className="mt-2  bg-purple-700 px-4 py-1 text-white"
            onClick={toggleCard}
          >
            Create Jobs
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
