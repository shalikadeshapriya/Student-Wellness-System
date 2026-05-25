import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { email, studentId, password } = body

    // Validate input
    if ((!email && !studentId) || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/Student ID and password are required' },
        { status: 400 }
      )
    }

    // Find user by email or studentId
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(studentId ? [{ studentId }] : []),
      ],
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return user data (excluding password)
    const userData = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      studentId: user.studentId,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      bloodType: user.bloodType,
      allergies: user.allergies,
      emergencyContact: user.emergencyContact,
    }

    return NextResponse.json({ 
      success: true, 
      data: { 
        user: userData, 
        token: 'jwt-token-placeholder' // In production, generate a real JWT
      } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
