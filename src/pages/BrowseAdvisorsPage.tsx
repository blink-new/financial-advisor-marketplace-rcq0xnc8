import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Search, MapPin, Star, Award, Users } from 'lucide-react'
import { blink } from '../blink/client'

interface Advisor {
  id: string
  name: string
  title: string
  location: string
  specialties: string[]
  rating: number
  reviewCount: number
  experience: number
  avatar?: string
  isVerified: boolean
  bio: string
}

// Mock data for now - will be replaced with real data from database
const mockAdvisors: Advisor[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      title: 'Senior Financial Advisor',
      location: 'New York, NY',
      specialties: ['Retirement Planning', 'Investment Management', 'Tax Planning'],
      rating: 4.9,
      reviewCount: 127,
      experience: 12,
      isVerified: true,
      bio: 'Specializing in comprehensive financial planning for high-net-worth individuals and families.'
    },
    {
      id: '2',
      name: 'David Chen',
      title: 'Wealth Management Specialist',
      location: 'San Francisco, CA',
      specialties: ['Estate Planning', 'Business Financial Planning', 'Investment Management'],
      rating: 4.8,
      reviewCount: 89,
      experience: 15,
      isVerified: true,
      bio: 'Expert in helping entrepreneurs and business owners optimize their financial strategies.'
    },
    {
      id: '3',
      name: 'Jennifer Rodriguez',
      title: 'Retirement Planning Expert',
      location: 'Austin, TX',
      specialties: ['Retirement Planning', '401k Management', 'Social Security Optimization'],
      rating: 4.9,
      reviewCount: 156,
      experience: 10,
      isVerified: true,
      bio: 'Dedicated to helping clients achieve secure and comfortable retirement goals.'
    },
    {
      id: '4',
      name: 'Michael Thompson',
      title: 'Investment Advisor',
      location: 'Chicago, IL',
      specialties: ['Portfolio Management', 'Risk Assessment', 'Alternative Investments'],
      rating: 4.7,
      reviewCount: 203,
      experience: 18,
      isVerified: true,
      bio: 'Focused on building diversified investment portfolios for long-term wealth creation.'
    }
  ]

export default function BrowseAdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAdvisors(mockAdvisors)
      setFilteredAdvisors(mockAdvisors)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = advisors

    if (searchTerm) {
      filtered = filtered.filter(advisor =>
        advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advisor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(advisor =>
        advisor.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    if (specialtyFilter) {
      filtered = filtered.filter(advisor =>
        advisor.specialties.includes(specialtyFilter)
      )
    }

    setFilteredAdvisors(filtered)
  }, [searchTerm, locationFilter, specialtyFilter, advisors])

  const allSpecialties = Array.from(
    new Set(advisors.flatMap(advisor => advisor.specialties))
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Financial Advisor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our network of CEO-verified financial professionals
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specialties</SelectItem>
                  {allSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {filteredAdvisors.length} Advisor{filteredAdvisors.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredAdvisors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No advisors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all advisors
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('')
                  setSpecialtyFilter('')
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdvisors.map((advisor) => (
                <Card key={advisor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={advisor.avatar} />
                        <AvatarFallback>
                          {advisor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg truncate">{advisor.name}</h3>
                          {advisor.isVerified && (
                            <Award className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{advisor.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{advisor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {advisor.bio}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{advisor.rating}</span>
                          <span className="text-muted-foreground">({advisor.reviewCount})</span>
                        </div>
                        <div className="text-muted-foreground">
                          {advisor.experience} years exp.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {advisor.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {advisor.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{advisor.specialties.length - 2} more
                          </Badge>
                        )}
                      </div>

                      <Button asChild className="w-full">
                        <Link to={`/advisor/${advisor.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}