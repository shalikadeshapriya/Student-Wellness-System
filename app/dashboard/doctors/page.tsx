'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { mockDoctors } from '@/lib/mock-data'

const specializations = [
  'All Specializations',
  'General Physician',
  'Pediatrician',
  'Dentist',
  'Dermatologist',
  'ENT Specialist'
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations')

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = selectedSpecialization === 'All Specializations' ||
      doctor.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Doctors</h1>
        <p className="text-muted-foreground">Find and book appointments with our medical professionals</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search doctor or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Doctors List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Doctors ({filteredDoctors.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredDoctors.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No doctors found matching your criteria
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-left sm:text-right">
                    <Badge
                      variant={doctor.status === 'available' ? 'default' : 'secondary'}
                      className={doctor.status === 'available' ? 'bg-success text-success-foreground' : 'bg-destructive/10 text-destructive'}
                    >
                      {doctor.status === 'available' ? 'Available' : 'Unavailable'}
                    </Badge>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Next Available: {doctor.nextAvailable}
                    </p>
                  </div>
                  <Link href={`/dashboard/book-appointment?doctor=${doctor.id}`}>
                    <Button size="sm" className="w-full sm:w-auto">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
