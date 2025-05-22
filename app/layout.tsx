// app/layout.tsx
import './globals.css'
import { JobCardProvider } from '@/app/context/JobCardContextType'
import {Toaster} from 'react-hot-toast'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JobCardProvider>
          {children}
          <Toaster position='bottom-right'/>
        </JobCardProvider>
      </body>
    </html>
  )
}
