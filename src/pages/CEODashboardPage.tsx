import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface AdvisorApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  title: string
  experience: string
  specialties: string[]
  bio: string
  ceoEmail: string
  companyName: string
  relationshipToCEO: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewNotes?: string
}

export default function CEODashboardPage() {
  const [selectedApplication, setSelectedApplication] = useState<AdvisorApplication | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const { toast } = useToast()

  // Mock data - will be replaced with real data from database
  const applications: AdvisorApplication[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      title: 'Senior Financial Advisor',
      experience: '11-15',
      specialties: ['Retirement Planning', 'Investment Management', 'Tax Planning'],
      bio: 'With over 12 years of experience in financial planning, I specialize in helping high-net-worth individuals and families achieve their financial goals.',
      ceoEmail: 'ceo@financeconnect.com',
      companyName: 'FinanceConnect',
      relationshipToCEO: 'employee',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      title: 'Wealth Management Specialist',
      experience: '16-20',
      specialties: ['Estate Planning', 'Business Financial Planning', 'Investment Management'],
      bio: 'Expert in helping entrepreneurs and business owners optimize their financial strategies.',
      ceoEmail: 'ceo@financeconnect.com',
      companyName: 'FinanceConnect',
      relationshipToCEO: 'former-employee',
      status: 'approved',
      submittedAt: '2024-01-10T14:20:00Z',
      reviewedAt: '2024-01-12T09:15:00Z',
      reviewNotes: 'Excellent credentials and strong recommendation. Approved for platform.'
    },
    {
      id: '3',
      firstName: 'Jennifer',
      lastName: 'Rodriguez',
      email: 'jennifer.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      title: 'Retirement Planning Expert',
      experience: '6-10',
      specialties: ['Retirement Planning', '401k Management', 'Social Security Optimization'],
      bio: 'Dedicated to helping clients achieve secure and comfortable retirement goals.',
      ceoEmail: 'ceo@financeconnect.com',
      companyName: 'FinanceConnect',
      relationshipToCEO: 'contractor',
      status: 'pending',
      submittedAt: '2024-01-12T16:45:00Z'
    }
  ]

  const pendingApplications = applications.filter(app => app.status === 'pending')
  const approvedApplications = applications.filter(app => app.status === 'approved')
  const rejectedApplications = applications.filter(app => app.status === 'rejected')

  const handleApprove = (applicationId: string) => {
    toast({
      title: "Application Approved",
      description: "The advisor has been approved and will be notified via email.",
    })
    // Here you would update the application status in the database
    console.log('Approving application:', applicationId, 'Notes:', reviewNotes)
  }

  const handleReject = (applicationId: string) => {
    toast({
      title: "Application Rejected",
      description: "The advisor has been notified of the decision via email.",
      variant: "destructive"
    })
    // Here you would update the application status in the database
    console.log('Rejecting application:', applicationId, 'Notes:', reviewNotes)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return null
    }
  }

  const ApplicationCard = ({ application }: { application: AdvisorApplication }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback>
                {application.firstName[0]}{application.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {application.firstName} {application.lastName}
              </h3>
              <p className="text-muted-foreground">{application.title}</p>
            </div>
          </div>
          {getStatusBadge(application.status)}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{application.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{application.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>{application.experience} years experience</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {application.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {application.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{application.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Submitted {new Date(application.submittedAt).toLocaleDateString()}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedApplication(application)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Review Application - {application.firstName} {application.lastName}
                </DialogTitle>
              </DialogHeader>
              
              {selectedApplication && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-semibold mb-3">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {selectedApplication.firstName} {selectedApplication.lastName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {selectedApplication.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {selectedApplication.phone}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {selectedApplication.location}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="font-semibold mb-3">Professional Information</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Title:</span> {selectedApplication.title}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {selectedApplication.experience} years
                      </div>
                      <div>
                        <span className="font-medium">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedApplication.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Bio:</span>
                        <p className="mt-1 text-muted-foreground">{selectedApplication.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* CEO Verification */}
                  <div>
                    <h3 className="font-semibold mb-3">CEO Verification Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">CEO Email:</span> {selectedApplication.ceoEmail}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {selectedApplication.companyName}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Relationship:</span> {selectedApplication.relationshipToCEO}
                      </div>
                    </div>
                  </div>

                  {/* Review Notes */}
                  <div>
                    <Label htmlFor="reviewNotes">Review Notes</Label>
                    <Textarea
                      id="reviewNotes"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add your review notes here..."
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  {selectedApplication.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleReject(selectedApplication.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">CEO Dashboard</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Review and approve financial advisor applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{pendingApplications.length}</p>
                  <p className="text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{approvedApplications.length}</p>
                  <p className="text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{applications.length}</p>
                  <p className="text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-muted-foreground">Approval Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Pending ({pendingApplications.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Approved ({approvedApplications.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-2">
              <XCircle className="w-4 h-4" />
              <span>Rejected ({rejectedApplications.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {pendingApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Pending Applications</h3>
                  <p className="text-muted-foreground">
                    All applications have been reviewed. New applications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            {approvedApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Approved Applications</h3>
                  <p className="text-muted-foreground">
                    Approved advisors will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            {rejectedApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Rejected Applications</h3>
                  <p className="text-muted-foreground">
                    Rejected applications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}