import { prisma } from '@/lib/prisma';
export async function POST(req: Request) {
    console.log('called me ')
  try {
    const formData = await req.json()

    const newJob = await prisma.jobPosting.create({
      data: {
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        companyLogo: formData.companyLogo,
        location: formData.location,
        jobType: formData.jobType,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        applicationDeadline: formData.applicationDeadline,
        jobDescription: formData.jobDescription,
      },
    })

    return Response.json({ success: true, data: newJob }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return Response.json({ success: false, error: 'Failed to submit job' }, { status: 500 })
  }
}