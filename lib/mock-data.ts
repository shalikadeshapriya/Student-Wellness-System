import type { Doctor, Appointment, Conversation, Message, HealthAlert, DashboardStats, DoctorSchedule } from './types'

export const mockUser = {
  id: '1',
  fullName: 'Maria Santos',
  studentId: 'STU-2024-001',
  email: 'maria.santos@university.edu',
  avatarUrl: '/avatars/maria.jpg',
  createdAt: '2024-01-15'
}

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. John Reyes',
    specialization: 'General Physician',
    status: 'available',
    nextAvailable: 'Today, 2:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Anna Lim',
    specialization: 'Pediatrician',
    status: 'available',
    nextAvailable: 'Today, 3:30 PM'
  },
  {
    id: '3',
    name: 'Dr. Sarah Cruz',
    specialization: 'Dentist',
    status: 'unavailable',
    nextAvailable: 'Tomorrow, 9:00 AM'
  },
  {
    id: '4',
    name: 'Dr. Michael Tan',
    specialization: 'Dermatologist',
    status: 'available',
    nextAvailable: 'Today, 1:00 PM'
  },
  {
    id: '5',
    name: 'Dr. Emily Rivera',
    specialization: 'ENT Specialist',
    status: 'available',
    nextAvailable: 'Today, 4:00 PM'
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctor: mockDoctors[0],
    userId: '1',
    date: '2024-05-16',
    time: '3:00 PM',
    type: 'Consultation',
    location: 'Medical Center Room 101',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorId: '2',
    doctor: mockDoctors[1],
    userId: '1',
    date: '2024-05-20',
    time: '3:30 PM',
    type: 'Check-up',
    location: 'Medical Center Room 203',
    status: 'upcoming'
  },
  {
    id: '3',
    doctorId: '3',
    doctor: mockDoctors[2],
    userId: '1',
    date: '2024-05-05',
    time: '10:00 AM',
    type: 'Dental Cleaning',
    location: 'Medical Center Room 102',
    status: 'completed'
  }
]

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'staff-1',
    participantName: 'Medical Staff',
    lastMessage: 'Please arrive 10 minutes...',
    lastMessageTime: '2:30 PM',
    unreadCount: 2,
    type: 'staff'
  },
  {
    id: '2',
    participantId: '1',
    participantName: 'Dr. John Reyes',
    lastMessage: 'Your appointment is confirmed...',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    type: 'doctor'
  },
  {
    id: '3',
    participantId: '2',
    participantName: 'Dr. Anna Lim',
    lastMessage: 'Please bring your previous...',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    type: 'doctor'
  },
  {
    id: '4',
    participantId: 'admin-1',
    participantName: 'Admin',
    lastMessage: 'Schedule update for next week...',
    lastMessageTime: 'May 12',
    unreadCount: 0,
    type: 'staff'
  }
]

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'staff-1',
    senderName: 'Medical Staff',
    content: 'Please arrive 10 minutes before your appointment.',
    timestamp: '2:30 PM',
    isRead: false,
    type: 'staff'
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'Dr. John Reyes',
    content: 'Hello Maria, this is a reminder for your appointment on May 16, 2024 at 3:00 PM. Be well!',
    timestamp: 'Yesterday',
    isRead: true,
    type: 'staff'
  },
  {
    id: '3',
    senderId: 'user',
    senderName: 'Maria Santos',
    content: 'Thank you for the reminder!',
    timestamp: 'Yesterday',
    isRead: true,
    type: 'user'
  }
]

export const mockHealthAlerts: HealthAlert[] = [
  {
    id: '1',
    title: 'Influenza cases are increasing in the university',
    description: 'Please take precautions and wear a mask.',
    type: 'alert',
    date: 'May 10, 2024'
  },
  {
    id: '2',
    title: 'Free flu shots will be available',
    description: 'On May 20, 2024 at the Medical Center.',
    type: 'news',
    date: 'May 14, 2024'
  },
  {
    id: '3',
    title: 'Proper Handwashing',
    description: 'The best way to prevent infections.',
    type: 'tip',
    date: 'May 10, 2024'
  },
  {
    id: '4',
    title: 'Eat healthy, stay active!',
    description: 'Simple steps for a healthier you.',
    type: 'tip',
    date: 'May 8, 2024'
  }
]

export const mockDashboardStats: DashboardStats = {
  upcomingAppointments: 2,
  crowdLevel: 'low',
  scheduleUpdates: 1,
  healthAlerts: 2
}

export const mockDoctorSchedule: DoctorSchedule = {
  doctorId: '1',
  doctorName: 'Dr. John Reyes',
  date: '2024-05-12',
  slots: [
    { time: '8:00 AM', status: 'available' },
    { time: '9:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'booked' },
    { time: '11:00 AM', status: 'available' },
    { time: '12:00 PM', status: 'unavailable' },
    { time: '1:00 PM', status: 'available' },
    { time: '2:00 PM', status: 'booked' },
    { time: '3:00 PM', status: 'available' },
    { time: '4:00 PM', status: 'booked' },
    { time: '5:00 PM', status: 'available' }
  ]
}

export const generateWeekSchedule = (startDate: Date): { date: Date; dayName: string; slots: DoctorSchedule['slots'] }[] => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const schedule = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const slots = mockDoctorSchedule.slots.map(slot => ({
      ...slot,
      status: Math.random() > 0.6 ? 'available' : Math.random() > 0.5 ? 'booked' : 'unavailable'
    })) as DoctorSchedule['slots']
    
    schedule.push({
      date,
      dayName: days[date.getDay()],
      slots
    })
  }
  
  return schedule
}
