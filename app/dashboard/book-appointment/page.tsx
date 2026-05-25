'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Check, ChevronRight } from 'lucide-react'
import { mockDoctors } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const steps = [
  { id: 1, label: 'Select Doctor' },
  { id: 2, label: 'Select Date & Time' },
  { id: 3, label: 'Confirm' }
]

function BookAppointmentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const preselectedDoctor = searchParams.get('doctor')

  const [currentStep, setCurrentStep] = useState(preselectedDoctor ? 2 : 1)
  const [selectedDoctor, setSelectedDoctor] = useState(preselectedDoctor || '')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedDoctorData = mockDoctors.find(d => d.id === selectedDoctor)

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId)
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/dashboard/appointments')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDoctor !== ''
      case 2:
        return selectedDate !== undefined && selectedTime !== ''
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule an appointment with our medical professionals</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span className={cn(
                    'ml-2 hidden text-sm font-medium sm:inline',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground sm:mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentStep === 1 && 'Select Doctor'}
            {currentStep === 2 && 'Select Date & Time'}
            {currentStep === 3 && 'Confirm Appointment'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Doctor */}
          {currentStep === 1 && (
            <RadioGroup value={selectedDoctor} onValueChange={handleDoctorSelect}>
              <div className="space-y-3">
                {mockDoctors.map((doctor) => (
                  <Label
                    key={doctor.id}
                    htmlFor={doctor.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors',
                      selectedDoctor === doctor.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    <RadioGroupItem value={doctor.id} id={doctor.id} />
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 font-medium text-foreground">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h3 className="mb-4 font-medium text-foreground">Select Time</h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 3 && selectedDoctorData && selectedDate && (
            <div className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Appointment Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedDoctorData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{selectedDoctorData.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedDoctorData.specialization}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Medical Center Room 101</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">Consultation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <BookAppointmentContent />
    </Suspense>
  )
}
