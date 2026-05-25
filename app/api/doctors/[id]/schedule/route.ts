import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { DoctorSchedule } from '@/models/DoctorSchedule'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    const { id } = await params

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const query: Record<string, unknown> = { doctorId: id }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const schedules = await DoctorSchedule.find(query).sort({ date: 1 })

    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching doctor schedule:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    const { id } = await params
    const body = await request.json()

    const schedule = await DoctorSchedule.findOneAndUpdate(
      { doctorId: id, date: new Date(body.date) },
      { ...body, doctorId: id },
      { upsert: true, new: true }
    )

    return NextResponse.json(schedule, { status: 201 })
  } catch (error) {
    console.error('Error creating doctor schedule:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
