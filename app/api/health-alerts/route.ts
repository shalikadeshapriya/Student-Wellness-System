import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { HealthAlert } from '@/models/HealthAlert'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = searchParams.get('limit')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {}

    if (type && type !== 'all') {
      query.type = type
    }

    let queryBuilder = HealthAlert.find(query).sort({ date: -1 })

    if (limit) {
      queryBuilder = queryBuilder.limit(parseInt(limit))
    }

    const alerts = await queryBuilder

    return NextResponse.json({
      success: true,
      data: alerts,
    })
  } catch (error) {
    console.error('Error fetching health alerts:', error)
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
    const newAlert = await HealthAlert.create({
      ...body,
      date: new Date(),
    })

    return NextResponse.json(
      { success: true, data: newAlert },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating health alert:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
