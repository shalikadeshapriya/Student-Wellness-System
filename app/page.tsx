import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, Users, Bell, MessageSquare, Stethoscope } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Student Wellness System</span>
          </div>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary">Home</Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary">About</Link>
            <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary">Services</Link>
            <Link href="#health-info" className="text-sm font-medium text-muted-foreground hover:text-primary">Health Info</Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-medium text-muted-foreground">Welcome to</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Student Wellness System
              </h1>
              <p className="text-lg text-muted-foreground">Your health. Our priority.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="font-semibold">Get Started</Button>
                </Link>
                <Link href="/dashboard/doctors">
                  <Button size="lg" variant="outline" className="font-semibold">View Doctors</Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative z-10 mx-auto w-full max-w-md">
                {/* Illustration placeholder - Doctor with patient */}
                <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="h-24 w-24 text-primary" />
                      </div>
                      <div className="absolute -right-4 top-0 rounded-lg bg-card p-2 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-success" />
                          <span className="text-xs font-medium text-foreground">Doctor Available</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-card p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">Book Appointment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Real-time Availability"
              description="Check doctor availability in real time."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Easy Booking"
              description="Book appointments online anytime."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Crowd Status"
              description="Avoid long wait by checking crowd level."
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Health Alerts"
              description="Stay informed with health news and alerts."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Message Staff"
              description="Communicate with medical staff easily."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Student Wellness System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
