import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Doctor } from '@/models/Doctor'
import { HealthAlert } from '@/models/HealthAlert'
import { CrowdLevel, CrowdHistory } from '@/models/CrowdLevel'

const seedDoctors = [
  {
    name: 'Dr. John Reyes',
    specialization: 'General Physician',
    avatarUrl: '/placeholder.svg',
    status: 'available',
    nextAvailable: 'Today, 2:00 PM',
    experience: 12,
    rating: 4.8,
    consultationFee: 500,
    education: 'MD - University of the Philippines',
    bio: 'Experienced general physician specializing in preventive care and chronic disease management.',
  },
  {
    name: 'Dr. Anna Lim',
    specialization: 'Pediatrician',
    avatarUrl: '/placeholder.svg',
    status: 'available',
    nextAvailable: 'Today, 3:30 PM',
    experience: 8,
    rating: 4.9,
    consultationFee: 600,
    education: 'MD - Ateneo School of Medicine',
    bio: 'Dedicated pediatrician with expertise in child development and immunization.',
  },
  {
    name: 'Dr. Sarah Cruz',
    specialization: 'Dentist',
    avatarUrl: '/placeholder.svg',
    status: 'unavailable',
    nextAvailable: 'Tomorrow, 9:00 AM',
    experience: 10,
    rating: 4.7,
    consultationFee: 800,
    education: 'DMD - University of Santo Tomas',
    bio: 'Expert in dental surgery and cosmetic dentistry procedures.',
  },
  {
    name: 'Dr. Michael Tan',
    specialization: 'Dermatologist',
    avatarUrl: '/placeholder.svg',
    status: 'available',
    nextAvailable: 'Today, 1:00 PM',
    experience: 15,
    rating: 4.9,
    consultationFee: 1000,
    education: 'MD - University of the Philippines',
    bio: 'Board-certified dermatologist specializing in skin conditions and aesthetic treatments.',
  },
  {
    name: 'Dr. Emily Rivera',
    specialization: 'ENT Specialist',
    avatarUrl: '/placeholder.svg',
    status: 'available',
    nextAvailable: 'Today, 4:00 PM',
    experience: 9,
    rating: 4.6,
    consultationFee: 700,
    education: 'MD - De La Salle Medical Center',
    bio: 'ENT specialist with expertise in hearing disorders and sinus treatments.',
  },
]

const seedHealthAlerts = [
  {
    type: 'alert',
    title: 'Influenza cases are increasing in university',
    content: 'Please take precautions: wash hands frequently, wear masks, and stay home if you feel unwell.',
    severity: 'high',
    date: new Date(),
  },
  {
    type: 'tip',
    title: 'Free flu shots available',
    content: 'Free flu shots will be available on May 20, 2024 at the Medical Center.',
    severity: 'medium',
    date: new Date(Date.now() - 86400000),
  },
  {
    type: 'tip',
    title: 'Proper Handwashing',
    content: 'The best way to prevent infections is to wash your hands properly with soap and water for at least 20 seconds.',
    severity: 'low',
    date: new Date(Date.now() - 172800000),
  },
  {
    type: 'news',
    title: 'Eat healthy, stay active!',
    content: 'Simple steps for a healthier you: eat balanced meals, exercise regularly, and get enough sleep.',
    severity: 'low',
    date: new Date(Date.now() - 259200000),
  },
]

const seedCrowdHistory = [
  { level: 'low', count: 5, recordedAt: new Date(Date.now() - 7 * 3600000) },
  { level: 'low', count: 12, recordedAt: new Date(Date.now() - 6 * 3600000) },
  { level: 'moderate', count: 25, recordedAt: new Date(Date.now() - 5 * 3600000) },
  { level: 'high', count: 42, recordedAt: new Date(Date.now() - 4 * 3600000) },
  { level: 'moderate', count: 30, recordedAt: new Date(Date.now() - 3 * 3600000) },
  { level: 'low', count: 15, recordedAt: new Date(Date.now() - 2 * 3600000) },
]

export async function POST() {
  try {
    await connectToDatabase()

    // Clear existing data
    await Doctor.deleteMany({})
    await HealthAlert.deleteMany({})
    await CrowdLevel.deleteMany({})
    await CrowdHistory.deleteMany({})

    // Seed doctors
    const doctors = await Doctor.insertMany(seedDoctors)

    // Seed health alerts
    const healthAlerts = await HealthAlert.insertMany(seedHealthAlerts)

    // Seed crowd level
    const crowdLevel = await CrowdLevel.create({
      level: 'low',
      currentCount: 15,
      maxCapacity: 100,
      waitTime: 5,
    })

    // Seed crowd history
    const crowdHistory = await CrowdHistory.insertMany(seedCrowdHistory)

    return NextResponse.json({
      success: true,
      data: {
        doctors: doctors.length,
        healthAlerts: healthAlerts.length,
        crowdLevel: 1,
        crowdHistory: crowdHistory.length,
      },
      message: 'Database seeded successfully',
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Use POST to seed the database',
    warning: 'This will clear all existing data!',
  })
}
