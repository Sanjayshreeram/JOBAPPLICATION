'use client'

import React, { useState } from 'react'
import { Search, LocationEdit, UserRound } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type Props = {
  onApplyFilters: (filters: { jobTitle: string; location: string; jobType: string }) => void
}

const JobFilters = ({ onApplyFilters }: Props) => {
  const [salaryRange, setSalaryRange] = useState([20000, 300000]) // unused in filtering
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  const handleApply = () => {
    onApplyFilters({ jobTitle, location, jobType })
  }

  const handleClear = () => {
    setJobTitle('')
    setLocation('')
    setJobType('')
    onApplyFilters({ jobTitle: '', location: '', jobType: '' })
  }

  return (
    <div className="mt-4 flex w-full flex-wrap justify-around gap-4 bg-white px-4 py-3 shadow-2xl text-gray-400 font-satoshi">
      <div className='flex flex-row gap-2 items-center'>
        <Search />
        <Input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Search By Job Title, Role"
          className="w-64 text-black"
        />
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <LocationEdit />
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Preferred Location"
          className="w-48 text-black"
        />
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <UserRound />
        <Select onValueChange={(val) => setJobType(val)} value={jobType}>
          <SelectTrigger className="w-40 text-black">
            <span>{jobType || 'Job Type'}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <span className='text-black font-semibold'>
          Salary Per Month
        </span>
        <Slider min={20000} max={300000} step={5000} value={salaryRange} onValueChange={(value) => setSalaryRange(value)} className="h-2 w-64" />
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Button onClick={handleApply} className="bg-blue-600 text-white">Apply</Button>
        <Button onClick={handleClear} variant="outline">Clear</Button>
      </div>
    </div>
  )
}

export default JobFilters
