'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Lightbulb, Newspaper, Info } from 'lucide-react'
import { mockHealthAlerts } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const healthTips = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain proper body function and energy levels.',
    category: 'tip'
  },
  {
    id: '2',
    title: 'Regular Exercise',
    description: 'Aim for at least 30 minutes of moderate exercise most days of the week.',
    category: 'tip'
  },
  {
    id: '3',
    title: 'Healthy Sleep Habits',
    description: 'Get 7-9 hours of quality sleep each night for optimal health and cognitive function.',
    category: 'tip'
  },
  {
    id: '4',
    title: 'Balanced Diet',
    description: 'Include fruits, vegetables, whole grains, and lean proteins in your daily meals.',
    category: 'tip'
  }
]

const newsItems = [
  {
    id: '1',
    title: 'Medical Center Extended Hours',
    description: 'Starting next week, the medical center will be open until 8 PM on weekdays.',
    date: 'May 15, 2024'
  },
  {
    id: '2',
    title: 'New Dermatology Services Available',
    description: 'We are pleased to announce new skin care services at our center.',
    date: 'May 12, 2024'
  },
  {
    id: '3',
    title: 'Summer Health Camp Registration',
    description: 'Register now for our annual summer health awareness camp.',
    date: 'May 10, 2024'
  }
]

export default function HealthInfoPage() {
  const [activeTab, setActiveTab] = useState('all')

  const alerts = mockHealthAlerts.filter(a => a.type === 'alert')
  const tips = mockHealthAlerts.filter(a => a.type === 'tip')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Health Information</h1>
        <p className="text-muted-foreground">Stay informed with health alerts, tips, and news</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        {/* All Content */}
        <TabsContent value="all" className="mt-4 space-y-6">
          {/* Alerts Section */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Health Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </section>

          {/* Tips Section */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Lightbulb className="h-5 w-5 text-warning" />
              Health Tips
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {healthTips.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>

          {/* News Section */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Newspaper className="h-5 w-5 text-primary" />
              Latest News
            </h2>
            <div className="space-y-3">
              {newsItems.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="mt-4">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Info className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No health alerts at this time</p>
                </CardContent>
              </Card>
            ) : (
              alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {healthTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={{ id: tip.id, title: tip.title, description: tip.description, category: 'tip' }} />
            ))}
          </div>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="mt-4">
          <div className="space-y-3">
            {newsItems.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AlertCard({ alert }: { alert: typeof mockHealthAlerts[0] }) {
  return (
    <Card className="border-l-4 border-l-destructive">
      <CardContent className="flex gap-4 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{alert.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">{alert.date}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TipCard({ tip }: { tip: { id: string; title: string; description: string; category: string } }) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{tip.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{tip.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function NewsCard({ news }: { news: { id: string; title: string; description: string; date: string } }) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Newspaper className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{news.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{news.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">{news.date}</p>
        </div>
      </CardContent>
    </Card>
  )
}
