import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { fullName, studentId, email, password } = body

    // Validate required fields
    if (!fullName || !studentId || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { studentId }],
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email or student ID already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = await User.create({
      fullName,
      studentId,
      email,
      password: hashedPassword,
    })

    // Return user data (excluding password)
    const userData = {
      id: newUser._id.toString(),
      fullName: newUser.fullName,
      email: newUser.email,
      studentId: newUser.studentId,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json(
      { 
        success: true, 
        data: { 
          user: userData,
          token: 'jwt-token-placeholder' // In production, generate a real JWT
        } 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
