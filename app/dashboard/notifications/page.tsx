'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, Calendar, MessageSquare, AlertTriangle, Settings, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const notifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Reminder',
    description: 'Your appointment with Dr. John Reyes is tomorrow at 3:00 PM.',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Medical Staff sent you a message about your upcoming visit.',
    time: '5 hours ago',
    isRead: false
  },
  {
    id: '3',
    type: 'alert',
    title: 'Health Alert',
    description: 'Influenza cases are increasing in the university. Please take precautions.',
    time: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'Your appointment with Dr. Anna Lim on May 20 has been confirmed.',
    time: '2 days ago',
    isRead: true
  },
  {
    id: '5',
    type: 'system',
    title: 'Schedule Update',
    description: 'Dr. Sarah Cruz has updated their availability for next week.',
    time: '3 days ago',
    isRead: true
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [settings, setSettings] = useState({
    appointments: true,
    messages: true,
    healthAlerts: true,
    scheduleUpdates: true
  })

  const unreadCount = notificationList.filter(n => !n.isRead).length

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, isRead: true })))
  }

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5" />
      case 'message':
        return <MessageSquare className="h-5 w-5" />
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-primary/10 text-primary'
      case 'message':
        return 'bg-blue-100 text-blue-600'
      case 'alert':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your appointments and alerts</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                Recent Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-primary">{unreadCount} new</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notificationList.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors',
                    notification.isRead 
                      ? 'border-border bg-card' 
                      : 'border-primary/30 bg-primary/5'
                  )}
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    getIconColor(notification.type)
                  )}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        'font-medium',
                        notification.isRead ? 'text-foreground' : 'text-foreground'
                      )}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="appointments" className="flex items-center gap-2 cursor-pointer">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Appointment reminders
                </Label>
                <Switch
                  id="appointments"
                  checked={settings.appointments}
                  onCheckedChange={(checked) => setSettings({ ...settings, appointments: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="messages" className="flex items-center gap-2 cursor-pointer">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  New messages
                </Label>
                <Switch
                  id="messages"
                  checked={settings.messages}
                  onCheckedChange={(checked) => setSettings({ ...settings, messages: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="healthAlerts" className="flex items-center gap-2 cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  Health alerts
                </Label>
                <Switch
                  id="healthAlerts"
                  checked={settings.healthAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, healthAlerts: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="scheduleUpdates" className="flex items-center gap-2 cursor-pointer">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Schedule updates
                </Label>
                <Switch
                  id="scheduleUpdates"
                  checked={settings.scheduleUpdates}
                  onCheckedChange={(checked) => setSettings({ ...settings, scheduleUpdates: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
