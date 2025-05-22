import { Building2, Layers, User } from 'lucide-react'

type JobProps = {
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
function getDaysAgo(createdAt: string | Date) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffInMs = now.getTime() - created.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays === 0 ? "Today" : `${diffInDays} day${diffInDays > 1 ? 's' : ''} Ago`;
}

const JobCard = ({ job }: { job: JobProps }) => {
  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center">
        <div className="flex h-14 items-center justify-between w-full">
  <div className="flex h-14 w-14 items-center justify-center rounded-md shadow-xl">
    <span className="block h-10 w-10 rounded-full">
      <img
        src={job.companyLogo || 'https://via.placeholder.com/40'}
        alt="Company Logo"
        className="h-full w-full rounded-full object-contain"
      />
    </span>
  </div>
  <p className="text-xs text-black w-auto h-6 p-2  bg-sky-300 font-semibold rounded-md flex items-center" >
   <span>
     {getDaysAgo(job.createdAt)}
     </span>
  </p>
</div>

      </div>
      <h1 className="mb-1 font-sans text-lg font-semibold">{job.jobTitle}</h1>
      <h2 className="mb-2 text-sm text-gray-700">{job.companyName}</h2>

      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span className="flex flex-row gap-1 items-center">
          <User />
          <span>{job.jobType}</span>
        </span>
        <span className="flex flex-row gap-1 items-center">
          <Building2 />
          <span>{job.location}</span>
        </span>
        <span className="flex flex-row gap-1 items-center">
          <Layers />
          <span>12LPA</span>
        </span>
      </div>

     <ul className="mb-4 list-disc pl-5 text-sm text-gray-700 font-sans font-medium">
  {job.jobDescription
    .split('\n')          
    .map((line, index) => (
      <li key={index}>{line}</li>   
    ))}
</ul>

      <button className="mt-auto w-full rounded-md bg-sky-500 py-2 text-white hover:bg-sky-600">
        Apply Now
      </button>
    </div>
  )
}

export default JobCard
