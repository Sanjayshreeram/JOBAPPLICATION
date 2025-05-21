import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const jobTitle = searchParams.get('jobTitle')
  const location = searchParams.get('location')
  const jobType = searchParams.get('jobType')

  const filters: any = {}

  if (jobTitle) {
    filters.jobTitle = { contains: jobTitle, mode: 'insensitive' }
  }

  if (location) {
    filters.location = { contains: location, mode: 'insensitive' }
  }

  if (jobType) {
    filters.jobType = jobType
  }

  try {
    const jobs = await prisma.jobPosting.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
