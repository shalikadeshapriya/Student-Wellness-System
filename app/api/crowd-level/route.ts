import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { CrowdLevel, CrowdHistory } from '@/models/CrowdLevel'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const includeHistory = searchParams.get('includeHistory')

    // Get current crowd level (or create default if none exists)
    let crowdLevel = await CrowdLevel.findOne().sort({ updatedAt: -1 })

    if (!crowdLevel) {
      crowdLevel = await CrowdLevel.create({
        level: 'low',
        currentCount: 15,
        maxCapacity: 100,
        waitTime: 5,
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: Record<string, any> = {
      current: {
        currentLevel: crowdLevel.level,
        currentPatients: crowdLevel.currentCount,
        maxCapacity: crowdLevel.maxCapacity,
        estimatedWaitTime: `${crowdLevel.waitTime}-${crowdLevel.waitTime + 5} minutes`,
        lastUpdated: crowdLevel.updatedAt,
      },
    }

    if (includeHistory === 'true') {
      const history = await CrowdHistory.find()
        .sort({ recordedAt: -1 })
        .limit(24)

      response.history = history.map((h) => ({
        time: h.recordedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        level: h.level,
        patients: h.count,
      }))
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error('Error fetching crowd level:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { level, currentCount, waitTime } = body

    // Update or create crowd level
    const crowdLevel = await CrowdLevel.findOneAndUpdate(
      {},
      { level, currentCount, waitTime, updatedAt: new Date() },
      { upsert: true, new: true }
    )

    // Record history
    await CrowdHistory.create({
      level,
      count: currentCount,
      recordedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      data: crowdLevel,
    })
  } catch (error) {
    console.error('Error updating crowd level:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
