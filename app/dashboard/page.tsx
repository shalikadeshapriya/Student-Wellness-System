'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  CalendarCheck,
  Users,
  Bell,
  Clock,
  ArrowRight,
  Calendar,
  MessageSquare,
  AlertTriangle
} from 'lucide-react'
import { mockUser, mockDoctors, mockAppointments, mockHealthAlerts, mockDashboardStats } from '@/lib/mock-data'

export default function DashboardPage() {
  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'upcoming').slice(0, 2)
  const availableDoctors = mockDoctors.filter(doc => doc.status === 'available').slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hello, {mockUser.fullName.split(' ')[0]}</h1>
          <p className="text-muted-foreground">Welcome back to Student Wellness System</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {mockUser.fullName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<CalendarCheck className="h-5 w-5" />}
          label="Upcoming Appointments"
          value={mockDashboardStats.upcomingAppointments}
          iconBg="bg-primary/10 text-primary"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Crowd Level at Medical Center"
          value={mockDashboardStats.crowdLevel.toUpperCase()}
          iconBg="bg-success/10 text-success"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="Schedule Updates"
          value={mockDashboardStats.scheduleUpdates}
          iconBg="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<Bell className="h-5 w-5" />}
          label="Health Alerts"
          value={mockDashboardStats.healthAlerts}
          iconBg="bg-destructive/10 text-destructive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Doctor Availability */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Doctor Availability</CardTitle>
            <Link href="/dashboard/doctors" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge variant={doctor.status === 'available' ? 'default' : 'secondary'} className={doctor.status === 'available' ? 'bg-success text-success-foreground' : ''}>
                      {doctor.status === 'available' ? 'Available' : 'Unavailable'}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">Next: {doctor.nextAvailable}</p>
                  </div>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Crowd Level & Health Alerts */}
        <div className="space-y-6">
          {/* Crowd Level */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Crowd Level</CardTitle>
              <Link href="/dashboard/crowd-level" className="text-sm text-primary hover:underline">
                View history
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full border-8 border-success/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">LOW</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  The medical center is not crowded
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated: 10:30 AM
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Health Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Health Alerts</CardTitle>
              <Link href="/dashboard/health-info" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockHealthAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="flex gap-3 text-sm">
                  <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${
                    alert.type === 'alert' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                  }`}>
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">My Upcoming Appointments</CardTitle>
          <Link href="/dashboard/appointments" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-lg border border-primary bg-primary/5 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground">
                    {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">
                    {new Date(appointment.date).getDate()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">{appointment.doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                    <span className="mx-1">|</span>
                    <span>{appointment.type}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/book-appointment">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
            <Link href="/dashboard/doctors">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                View Doctors
              </Button>
            </Link>
            <Link href="/dashboard/messages">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Send Message
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ icon, label, value, iconBg }: { icon: React.ReactNode; label: string; value: string | number; iconBg: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
