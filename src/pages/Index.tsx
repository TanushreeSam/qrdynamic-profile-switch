
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Globe, Mail, Phone, MessageCircle, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <QrCode className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">QR Profile Manager</h1>
            </div>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dynamic QR Code Profiles
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create one QR code that can redirect to different content based on your needs. 
            Switch between website links, contact info, WhatsApp, brochures, and more - all with the same QR code!
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-3">
              Create Your Dynamic QR Code
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Website Links</CardTitle>
              <CardDescription>
                Direct visitors to your website, portfolio, or any online destination
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Email Contact</CardTitle>
              <CardDescription>
                Enable instant email composition with your contact information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Phone Calls</CardTitle>
              <CardDescription>
                Allow direct calling with a single scan of your QR code
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>
                Start WhatsApp conversations with custom pre-filled messages
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Brochures & Documents</CardTitle>
              <CardDescription>
                Share PDF brochures, catalogs, or any downloadable content
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <User className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Digital Business Cards</CardTitle>
              <CardDescription>
                Create downloadable vCard contacts with all your professional details
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it works */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold">Create Profiles</h4>
              <p className="text-gray-600">
                Set up multiple profiles for different purposes - business, personal, events, etc.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-xl font-semibold">Switch Active Profile</h4>
              <p className="text-gray-600">
                Choose which profile should be active. Your QR code always stays the same.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-xl font-semibold">Share & Track</h4>
              <p className="text-gray-600">
                Use your QR code anywhere. Visitors get redirected to your currently active profile.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Create your account and start building your dynamic QR code profiles today!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth">
                <Button size="lg" className="w-full">
                  Sign Up Now - It's Free!
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
