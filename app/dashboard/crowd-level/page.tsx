'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const crowdHistory = [
  { time: '8:00 AM', level: 'low', patients: 5 },
  { time: '9:00 AM', level: 'low', patients: 12 },
  { time: '10:00 AM', level: 'medium', patients: 25 },
  { time: '11:00 AM', level: 'high', patients: 42 },
  { time: '12:00 PM', level: 'medium', patients: 30 },
  { time: '1:00 PM', level: 'low', patients: 15 },
  { time: '2:00 PM', level: 'low', patients: 18 },
  { time: '3:00 PM', level: 'medium', patients: 28 },
  { time: '4:00 PM', level: 'medium', patients: 22 },
  { time: '5:00 PM', level: 'low', patients: 10 }
]

const averageWaitTimes = {
  low: '5-10 minutes',
  medium: '15-25 minutes',
  high: '30-45 minutes'
}

export default function CrowdLevelPage() {
  const currentLevel = 'low'
  const currentPatients = 15
  const lastUpdated = '10:30 AM'

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-success bg-success/10'
      case 'medium':
        return 'text-warning bg-warning/10'
      case 'high':
        return 'text-destructive bg-destructive/10'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  const getLevelBorderColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'border-success'
      case 'medium':
        return 'border-warning'
      case 'high':
        return 'border-destructive'
      default:
        return 'border-border'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Crowd Level</h1>
        <p className="text-muted-foreground">Real-time crowd status at the Medical Center</p>
      </div>

      {/* Current Status */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className={cn('border-2', getLevelBorderColor(currentLevel))}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className={cn(
                'mb-4 flex h-20 w-20 items-center justify-center rounded-full',
                getLevelColor(currentLevel)
              )}>
                <span className="text-2xl font-bold uppercase">{currentLevel}</span>
              </div>
              <p className="text-lg font-semibold text-foreground">Current Status</p>
              <p className="text-sm text-muted-foreground">Medical Center</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{currentPatients}</p>
              <p className="text-sm text-muted-foreground">Current Patients</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{averageWaitTimes[currentLevel as keyof typeof averageWaitTimes]}</p>
              <p className="text-sm text-muted-foreground">Est. Wait Time</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">Decreasing</p>
              <p className="text-sm text-muted-foreground">Trend</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-lg text-foreground">
              The medical center is <span className="font-bold text-success">not crowded</span> right now.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Best time to visit for minimal wait times.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Today's History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{"Today's Crowd History"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {crowdHistory.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-20">{entry.time}</span>
                  <span className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium capitalize',
                    getLevelColor(entry.level)
                  )}>
                    {entry.level}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {entry.patients} patients
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Crowd Level Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/5 p-4">
              <div className="h-4 w-4 rounded-full bg-success" />
              <div>
                <p className="font-medium text-foreground">Low</p>
                <p className="text-sm text-muted-foreground">5-10 min wait</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
              <div className="h-4 w-4 rounded-full bg-warning" />
              <div>
                <p className="font-medium text-foreground">Medium</p>
                <p className="text-sm text-muted-foreground">15-25 min wait</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="h-4 w-4 rounded-full bg-destructive" />
              <div>
                <p className="font-medium text-foreground">High</p>
                <p className="text-sm text-muted-foreground">30-45 min wait</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
