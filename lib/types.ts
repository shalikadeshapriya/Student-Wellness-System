export interface User {
  id: string
  fullName: string
  studentId: string
  email: string
  avatarUrl?: string
  createdAt: string
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  avatarUrl?: string
  status: 'available' | 'unavailable' | 'busy'
  nextAvailable?: string
}

export interface Appointment {
  id: string
  doctorId: string
  doctor: Doctor
  userId: string
  date: string
  time: string
  type: string
  location: string
  status: 'upcoming' | 'completed' | 'cancelled'
  notes?: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  isRead: boolean
  type: 'staff' | 'user' | 'system'
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  type: 'staff' | 'doctor'
}

export interface HealthAlert {
  id: string
  title: string
  description: string
  type: 'alert' | 'tip' | 'news'
  date: string
  icon?: string
}

export interface DoctorScheduleSlot {
  time: string
  status: 'available' | 'booked' | 'unavailable'
}

export interface DoctorSchedule {
  doctorId: string
  doctorName: string
  date: string
  slots: DoctorScheduleSlot[]
}

export type CrowdLevel = 'low' | 'medium' | 'high'

export interface DashboardStats {
  upcomingAppointments: number
  crowdLevel: CrowdLevel
  scheduleUpdates: number
  healthAlerts: number
}
