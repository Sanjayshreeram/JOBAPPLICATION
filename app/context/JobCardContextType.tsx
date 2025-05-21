
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type JobCardContextType = {
  showCard: boolean
  toggleCard: () => void
  openCard: () => void
  closeCard: () => void
}

export const JobCardContext = createContext<JobCardContextType | undefined>(undefined)

export const JobCardProvider = ({ children }: { children: ReactNode }) => {
  const [showCard, setShowCard] = useState(false)

  const toggleCard = () => setShowCard((prev) => !prev)
  const openCard = () => setShowCard(true)
  const closeCard = () => setShowCard(false)

  return (
    <JobCardContext.Provider value={{ showCard, toggleCard, openCard, closeCard }}>
      {children}
    </JobCardContext.Provider>
  )
}

export const useJobCardToggle = () => {
  const context = useContext(JobCardContext)
  if (!context) {
    throw new Error('useJobCardToggle must be used within a JobCardProvider')
  }
  return context
}
