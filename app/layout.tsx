// app/layout.tsx
import './globals.css'
import { JobCardProvider } from '@/app/context/JobCardContextType'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JobCardProvider>
          {children}
        </JobCardProvider>
      </body>
    </html>
  )
}
