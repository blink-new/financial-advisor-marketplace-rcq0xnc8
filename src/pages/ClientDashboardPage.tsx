import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  User, 
  MessageCircle, 
  Calendar, 
  Star, 
  Search, 
  Heart,
  Clock,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function ClientDashboardPage() {
  const [user] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    memberSince: '2024-01-01'
  })

  // Mock data - will be replaced with real data from database
  const favoriteAdvisors = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      title: 'Senior Financial Advisor',
      rating: 4.9,
      specialties: ['Retirement Planning', 'Investment Management'],
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'David Chen',
      title: 'Wealth Management Specialist',
      rating: 4.8,
      specialties: ['Estate Planning', 'Business Financial Planning'],
      lastContact: '2024-01-10'
    }
  ]

  const recentMessages = [
    {
      id: '1',
      advisorName: 'Sarah Mitchell',
      message: 'I\'ve reviewed your portfolio and have some recommendations for Q2.',
      timestamp: '2024-01-15T10:30:00Z',
      unread: true
    },
    {
      id: '2',
      advisorName: 'David Chen',
      message: 'Thank you for the meeting yesterday. Here\'s the follow-up document.',
      timestamp: '2024-01-14T15:45:00Z',
      unread: false
    }
  ]

  const upcomingAppointments = [
    {
      id: '1',
      advisorName: 'Sarah Mitchell',
      type: 'Portfolio Review',
      date: '2024-01-20T14:00:00Z',
      duration: '60 minutes'
    },
    {
      id: '2',
      advisorName: 'David Chen',
      type: 'Tax Planning Session',
      date: '2024-01-25T10:00:00Z',
      duration: '45 minutes'
    }
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'message',
      description: 'Received message from Sarah Mitchell',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'appointment',
      description: 'Scheduled appointment with David Chen',
      timestamp: '2024-01-14T16:20:00Z'
    },
    {
      id: '3',
      type: 'review',
      description: 'Left review for Sarah Mitchell',
      timestamp: '2024-01-12T09:15:00Z'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="w-4 h-4 text-blue-600" />
      case 'appointment':
        return <Calendar className="w-4 h-4 text-green-600" />
      case 'review':
        return <Star className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-xl text-muted-foreground">
                Manage your financial advisor connections and appointments
              </p>
            </div>
            <Button asChild>
              <Link to="/browse">
                <Search className="w-4 h-4 mr-2" />
                Find New Advisors
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{favoriteAdvisors.length}</p>
                  <p className="text-muted-foreground">Favorite Advisors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{recentMessages.filter(m => m.unread).length}</p>
                  <p className="text-muted-foreground">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                  <p className="text-muted-foreground">Upcoming Meetings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-muted-foreground">Months Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="advisors">My Advisors</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                            {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link to="/browse">
                      <Search className="w-4 h-4 mr-2" />
                      Find New Advisors
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Leave Review
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule a meeting with one of your advisors
                    </p>
                    <Button>Schedule Appointment</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Calendar className="w-8 h-8 text-primary" />
                          <div>
                            <h3 className="font-semibold">{appointment.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              with {appointment.advisorName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()} at{' '}
                              {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{appointment.duration}</Badge>
                          <div className="mt-2 space-x-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm">Join</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advisors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Advisors</CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteAdvisors.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Favorite Advisors Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Browse our network and add advisors to your favorites
                    </p>
                    <Button asChild>
                      <Link to="/browse">Browse Advisors</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {favoriteAdvisors.map((advisor) => (
                      <Card key={advisor.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>
                                {advisor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{advisor.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{advisor.title}</p>
                              <div className="flex items-center space-x-2 mb-3">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{advisor.rating}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {advisor.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" asChild>
                                  <Link to={`/advisor/${advisor.id}`}>View Profile</Link>
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {recentMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start a conversation with one of your advisors
                    </p>
                    <Button>Send Message</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className={`p-4 border rounded-lg ${message.unread ? 'bg-primary/5 border-primary/20' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{message.advisorName}</h3>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-2">{message.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString()} at{' '}
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Reply</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Scheduled Appointments</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule your first appointment with an advisor
                    </p>
                    <Button>Schedule Appointment</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{appointment.type}</h3>
                                <p className="text-muted-foreground">with {appointment.advisorName}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                  <span>
                                    {new Date(appointment.date).toLocaleDateString()}
                                  </span>
                                  <span>
                                    {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <Badge variant="outline">{appointment.duration}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline">Reschedule</Button>
                              <Button>Join Meeting</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}