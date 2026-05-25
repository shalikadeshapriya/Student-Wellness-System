import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Appointment } from '@/models/Appointment'
import { DoctorSchedule } from '@/models/DoctorSchedule'
import { Notification } from '@/models/Notification'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const doctorId = searchParams.get('doctorId')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {}

    if (userId) {
      query.userId = userId
    }

    if (status) {
      query.status = status
    }

    if (doctorId) {
      query.doctorId = doctorId
    }

    const appointments = await Appointment.find(query).sort({ date: -1 })

    return NextResponse.json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
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
    const { userId, doctorId, doctorName, doctorSpecialization, doctorAvatar, date, time, type, notes } = body

    // Create the appointment
    const newAppointment = await Appointment.create({
      userId,
      doctorId,
      doctorName,
      doctorSpecialization,
      doctorAvatar: doctorAvatar || '/placeholder.svg',
      date: new Date(date),
      time,
      type: type || 'Consultation',
      notes,
      status: 'upcoming',
      location: 'Medical Center Room 101',
    })

    // Update doctor schedule to mark the slot as booked (if schedule exists)
    await DoctorSchedule.findOneAndUpdate(
      {
        doctorId,
        date: new Date(date),
        'slots.time': time,
      },
      {
        $set: {
          'slots.$.status': 'booked',
          'slots.$.appointmentId': newAppointment._id,
        },
      }
    )

    // Create a notification for the user
    if (userId) {
      await Notification.create({
        userId,
        type: 'appointment',
        title: 'Appointment Confirmed',
        content: `Your appointment with ${doctorName} on ${new Date(date).toLocaleDateString()} at ${time} has been confirmed.`,
        actionUrl: '/dashboard/appointments',
      })
    }

    return NextResponse.json(
      { success: true, data: newAppointment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
