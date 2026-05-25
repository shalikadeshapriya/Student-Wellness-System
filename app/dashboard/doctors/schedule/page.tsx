'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mockDoctors, generateWeekSchedule } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { format, addDays, startOfWeek } from 'date-fns'

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM'
]

export default function DoctorSchedulePage() {
  const [selectedDoctor, setSelectedDoctor] = useState(mockDoctors[0].id)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 0 }))

  const weekSchedule = useMemo(() => generateWeekSchedule(currentWeekStart), [currentWeekStart])

  const selectedDoctorData = mockDoctors.find(d => d.id === selectedDoctor)

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7))
  }

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }))
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success hover:bg-success/20 cursor-pointer'
      case 'booked':
        return 'bg-muted text-muted-foreground'
      case 'unavailable':
        return 'bg-destructive/10 text-destructive/50'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Doctor Schedule</h1>
        <p className="text-muted-foreground">View doctor availability and book appointments</p>
      </div>

      {/* Doctor Selection and Navigation */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {mockDoctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[200px] text-center text-sm font-medium">
              {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
            </span>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDoctorData?.name} - Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-2 border-b border-border pb-2 mb-2">
              <div className="text-sm font-medium text-muted-foreground">Time</div>
              {weekSchedule.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm font-medium text-foreground">{day.dayName}</p>
                  <p className="text-xs text-muted-foreground">{format(day.date, 'MMM d')}</p>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time, timeIndex) => (
              <div key={time} className="grid grid-cols-8 gap-2 py-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  {time}
                </div>
                {weekSchedule.map((day, dayIndex) => {
                  const slot = day.slots[timeIndex]
                  return (
                    <div
                      key={`${dayIndex}-${timeIndex}`}
                      className={cn(
                        'rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors',
                        getStatusClass(slot?.status || 'unavailable')
                      )}
                    >
                      {slot?.status === 'available' ? 'Available' : slot?.status === 'booked' ? 'Booked' : '-'}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-success/10" />
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-muted" />
              <span className="text-sm text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-destructive/10" />
              <span className="text-sm text-muted-foreground">Not Available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
