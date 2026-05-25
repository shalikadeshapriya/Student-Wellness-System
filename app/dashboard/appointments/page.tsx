'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, MapPin, Calendar } from 'lucide-react'
import { mockAppointments } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'upcoming')
  const pastAppointments = mockAppointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">View and manage your scheduled appointments</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4" asChild>
                  <a href="/dashboard/book-appointment">Book Appointment</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} showActions />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No past appointments</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AppointmentCard({ 
  appointment, 
  showActions = false 
}: { 
  appointment: typeof mockAppointments[0]
  showActions?: boolean 
}) {
  const date = new Date(appointment.date)
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            {/* Date Block */}
            <div className={cn(
              'flex flex-col items-center justify-center rounded-lg p-3 text-center min-w-[70px]',
              appointment.status === 'upcoming' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-muted text-muted-foreground'
            )}>
              <span className="text-xs font-semibold">{month}</span>
              <span className="text-2xl font-bold">{day}</span>
              <span className="text-xs">{weekday}</span>
            </div>

            {/* Appointment Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {appointment.doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{appointment.doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{appointment.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{appointment.location}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2">
            <Badge variant={
              appointment.status === 'upcoming' ? 'default' :
              appointment.status === 'completed' ? 'secondary' : 'destructive'
            } className={appointment.status === 'upcoming' ? 'bg-primary' : ''}>
              {appointment.status === 'upcoming' ? 'Upcoming' :
               appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
            </Badge>
            
            {showActions && (
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
