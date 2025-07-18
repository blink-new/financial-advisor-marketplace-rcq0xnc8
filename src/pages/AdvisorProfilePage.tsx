import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Star, MapPin, Award, Calendar, MessageCircle, Phone } from 'lucide-react'

export default function AdvisorProfilePage() {
  const { id } = useParams()

  // Mock advisor data - will be replaced with real data from database
  const advisor = {
    id: '1',
    name: 'Sarah Mitchell',
    title: 'Senior Financial Advisor',
    location: 'New York, NY',
    specialties: ['Retirement Planning', 'Investment Management', 'Tax Planning'],
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    isVerified: true,
    bio: 'With over 12 years of experience in financial planning, I specialize in helping high-net-worth individuals and families achieve their financial goals. My comprehensive approach includes retirement planning, investment management, and tax optimization strategies.',
    education: ['MBA Finance - Wharton School', 'CFA Charter', 'CFP Certification'],
    languages: ['English', 'Spanish'],
    phone: '+1 (555) 123-4567',
    email: 'sarah.mitchell@financeconnect.com'
  }

  const reviews = [
    {
      id: '1',
      clientName: 'John D.',
      rating: 5,
      comment: 'Sarah helped me plan for retirement and I couldn\'t be happier with the results. Very professional and knowledgeable.',
      date: '2024-01-15'
    },
    {
      id: '2',
      clientName: 'Maria S.',
      rating: 5,
      comment: 'Excellent advisor! She took the time to understand my goals and created a personalized investment strategy.',
      date: '2024-01-10'
    },
    {
      id: '3',
      clientName: 'Robert K.',
      rating: 4,
      comment: 'Great experience working with Sarah. She\'s very responsive and explains complex concepts clearly.',
      date: '2024-01-05'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl">
                      {advisor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold">{advisor.name}</h1>
                      {advisor.isVerified && (
                        <Award className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <p className="text-xl text-muted-foreground mb-3">{advisor.title}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{advisor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{advisor.experience} years experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{advisor.rating}</span>
                        <span>({advisor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {advisor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">About</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{advisor.bio}</p>
              </CardContent>
            </Card>

            {/* Education & Certifications */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Education & Certifications</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {advisor.education.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Client Reviews</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">{review.clientName}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Contact Sarah</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
                <div className="pt-4 border-t space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{advisor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span>{advisor.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Languages</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {advisor.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Badge */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-2">CEO Verified</h3>
                <p className="text-sm text-muted-foreground">
                  This advisor has been personally vetted and approved by our CEO
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}