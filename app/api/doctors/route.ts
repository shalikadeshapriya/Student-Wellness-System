import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Doctor } from '@/models/Doctor'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const specialization = searchParams.get('specialization')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {}

    if (specialization && specialization !== 'all' && specialization !== 'All Specializations') {
      query.specialization = specialization
    }

    if (status) {
      query.status = status
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
      ]
    }

    const doctors = await Doctor.find(query).sort({ name: 1 })

    return NextResponse.json({
      success: true,
      data: doctors,
    })
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const newDoctor = await Doctor.create(body)

    return NextResponse.json(
      { success: true, data: newDoctor },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating doctor:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
