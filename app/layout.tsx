// app/layout.tsx
import './globals.css'
import { JobCardProvider } from '@/app/context/JobCardContextType'
import {Toaster} from 'react-hot-toast'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head> <link
  href="https://api.fontshare.com/v2/css?f[]=satoshi-variable@1&display=swap"
  rel="stylesheet"
/>


      </head>
      <body>
        <JobCardProvider>
          {children}
          <Toaster position='bottom-right'/>
        </JobCardProvider>
      </body>
    </html>
  )
}
