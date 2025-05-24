'use client'

import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import JobCard from './components/JobCard'
import JobFilters from './components/JobFilters'
import { JobForm } from './components/JobForm'
import { useJobCardToggle } from '@/app/hooks/useJobCardToggle'

type JobPosting = {
  id: number
  jobTitle: string
  companyName: string
  companyLogo?: string
  location: string
  jobType: string
  salaryMin: string
  salaryMax: string
  jobDescription: string
  createdAt: string
}

export default function Home() {
  const { showCard } = useJobCardToggle()
  const [jobs, setJobs] = useState<JobPosting[]>([])

  const fetchJobs = (filters = {}) => {
    const params = new URLSearchParams(filters as any).toString()
    fetch(`/api/FetchJobs?${params}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Failed to fetch jobs", err))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-slate-50 text-black">
      {showCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      )}

      <div className={`${showCard ? 'opacity-50 pointer-events-none' : 'opacity-100'} transition-opacity duration-300 w-full`}>
        <div className="w-full max-w-7xl mx-auto py-4">
          <Navbar />
        </div>

        <div className="w-full bg-white shadow-md py-4 px-4">
          <JobFilters onApplyFilters={fetchJobs} />
        </div>

        <div className="my-10 grid w-full max-w-7xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <JobForm />
        </div>
      )}
    </main>
  )
}
