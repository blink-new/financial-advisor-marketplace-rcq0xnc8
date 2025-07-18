import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Shield, Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

export default function AdvisorRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Information
    title: '',
    experience: '',
    specialties: [] as string[],
    bio: '',
    education: '',
    certifications: '',
    languages: [] as string[],
    
    // CEO Verification
    ceoEmail: '',
    companyName: '',
    relationshipToCEO: '',
    
    // Documents
    resume: null as File | null,
    certificationDocs: null as File | null,
    
    // Agreement
    agreeToTerms: false,
    agreeToVerification: false
  })
  
  const { toast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const specialtyOptions = [
    'Retirement Planning',
    'Investment Management',
    'Tax Planning',
    'Estate Planning',
    'Business Financial Planning',
    '401k Management',
    'Social Security Optimization',
    'Portfolio Management',
    'Risk Assessment',
    'Alternative Investments',
    'Insurance Planning',
    'College Planning'
  ]

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Mandarin',
    'Japanese',
    'Korean',
    'Arabic'
  ]

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleFileUpload = (field: 'resume' | 'certificationDocs', file: File) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.agreeToTerms || !formData.agreeToVerification) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and verification process.",
        variant: "destructive"
      })
      return
    }

    if (!formData.ceoEmail || !formData.companyName) {
      toast({
        title: "CEO Verification Required",
        description: "Please provide CEO contact information for verification.",
        variant: "destructive"
      })
      return
    }

    // Simulate submission
    toast({
      title: "Application Submitted!",
      description: "Your application has been submitted for CEO verification. You'll receive an email confirmation shortly.",
    })

    // Here you would typically send the data to your backend
    console.log('Submitting application:', formData)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Become a Verified Advisor</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Join our network of CEO-verified financial professionals
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && <><FileText className="w-5 h-5" /> Personal Information</>}
                {currentStep === 2 && <><FileText className="w-5 h-5" /> Professional Details</>}
                {currentStep === 3 && <><Shield className="w-5 h-5" /> CEO Verification</>}
                {currentStep === 4 && <><CheckCircle className="w-5 h-5" /> Review & Submit</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Professional Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Senior Financial Advisor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="16-20">16-20 years</SelectItem>
                          <SelectItem value="20+">20+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Specialties * (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onCheckedChange={() => handleSpecialtyToggle(specialty)}
                          />
                          <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                        </div>
                      ))}
                    </div>
                    {formData.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Describe your experience, approach, and what makes you unique..."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Textarea
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                        placeholder="List your degrees and educational background..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="certifications">Certifications</Label>
                      <Textarea
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                        placeholder="List your professional certifications (CFA, CFP, etc.)..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Languages (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: CEO Verification */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary mb-2">CEO Verification Required</h3>
                        <p className="text-sm text-muted-foreground">
                          To ensure the highest quality of advisors, we require verification from a company CEO or senior executive. 
                          This person will receive an email to confirm your professional standing and qualifications.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ceoEmail">CEO/Executive Email *</Label>
                      <Input
                        id="ceoEmail"
                        type="email"
                        value={formData.ceoEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, ceoEmail: e.target.value }))}
                        placeholder="ceo@company.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This person will receive a verification email
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Company or Firm Name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="relationshipToCEO">Relationship to CEO/Executive *</Label>
                    <Select value={formData.relationshipToCEO} onValueChange={(value) => setFormData(prev => ({ ...prev, relationshipToCEO: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Current Employee</SelectItem>
                        <SelectItem value="former-employee">Former Employee</SelectItem>
                        <SelectItem value="partner">Business Partner</SelectItem>
                        <SelectItem value="contractor">Independent Contractor</SelectItem>
                        <SelectItem value="colleague">Professional Colleague</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Document Upload</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Resume/CV</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            {formData.resume ? formData.resume.name : 'Upload your resume'}
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload('resume', e.target.files[0])}
                            className="hidden"
                            id="resume-upload"
                          />
                          <Button variant="outline" size="sm" asChild>
                            <label htmlFor="resume-upload" className="cursor-pointer">
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Certifications</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            {formData.certificationDocs ? formData.certificationDocs.name : 'Upload certification documents'}
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload('certificationDocs', e.target.files[0])}
                            className="hidden"
                            id="cert-upload"
                          />
                          <Button variant="outline" size="sm" asChild>
                            <label htmlFor="cert-upload" className="cursor-pointer">
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Review Your Application</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                        <p><span className="font-medium">Location:</span> {formData.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Professional Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Title:</span> {formData.title}</p>
                        <p><span className="font-medium">Experience:</span> {formData.experience}</p>
                        <p><span className="font-medium">Specialties:</span> {formData.specialties.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">CEO Verification</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">CEO Email:</span> {formData.ceoEmail}</p>
                      <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                      <p><span className="font-medium">Relationship:</span> {formData.relationshipToCEO}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verification"
                        checked={formData.agreeToVerification}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToVerification: checked as boolean }))}
                      />
                      <Label htmlFor="verification" className="text-sm">
                        I consent to the CEO verification process and understand that my application will be reviewed
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-primary">
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}