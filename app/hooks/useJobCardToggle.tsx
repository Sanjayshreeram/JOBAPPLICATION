import { createContext, useContext, useState, ReactNode } from 'react'
import {JobCardContext} from "@/app/context/JobCardContextType"
export const useJobCardToggle = () => {
  const context = useContext(JobCardContext)
  if (!context) {
    throw new Error('useJobCardToggle must be used within a JobCardProvider')
  }
  return context
}
