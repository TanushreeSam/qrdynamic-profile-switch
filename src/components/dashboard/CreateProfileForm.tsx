
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CreateProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ onSuccess, onCancel }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileType, setProfileType] = useState<string>('');
  const [formData, setFormData] = useState({
    profile_name: '',
    website_url: '',
    email_address: '',
    phone_number: '',
    whatsapp_number: '',
    whatsapp_message: '',
    brochure_title: '',
    brochure_description: '',
    brochure_url: '',
    vcard_full_name: '',
    vcard_title: '',
    vcard_company_name: '',
    vcard_mobile_number: '',
    vcard_company_number: '',
    vcard_email: '',
    vcard_website: '',
    vcard_address: '',
    vcard_linkedin: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileType || !formData.profile_name.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const profileData = {
        user_id: user?.id,
        profile_name: formData.profile_name,
        profile_type: profileType,
        is_active: false,
        ...formData,
      };

      const { error } = await supabase
        .from('qr_profiles')
        .insert([profileData]);

      if (error) throw error;

      toast({
        title: 'Profile created!',
        description: 'Your new profile has been created successfully',
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error creating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderProfileFields = () => {
    switch (profileType) {
      case 'website':
        return (
          <div>
            <Label htmlFor="website_url">Website URL</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => handleInputChange('website_url', e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
        );

      case 'email':
        return (
          <div>
            <Label htmlFor="email_address">Email Address</Label>
            <Input
              id="email_address"
              type="email"
              value={formData.email_address}
              onChange={(e) => handleInputChange('email_address', e.target.value)}
              placeholder="contact@example.com"
              required
            />
          </div>
        );

      case 'phone':
        return (
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              placeholder="+1234567890"
              required
            />
          </div>
        );

      case 'whatsapp':
        return (
          <>
            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                type="tel"
                value={formData.whatsapp_number}
                onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                placeholder="+1234567890"
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp_message">Default Message (Optional)</Label>
              <Textarea
                id="whatsapp_message"
                value={formData.whatsapp_message}
                onChange={(e) => handleInputChange('whatsapp_message', e.target.value)}
                placeholder="Hello! I'd like to get in touch..."
                rows={3}
              />
            </div>
          </>
        );

      case 'brochure':
        return (
          <>
            <div>
              <Label htmlFor="brochure_title">Brochure Title</Label>
              <Input
                id="brochure_title"
                value={formData.brochure_title}
                onChange={(e) => handleInputChange('brochure_title', e.target.value)}
                placeholder="Company Brochure"
                required
              />
            </div>
            <div>
              <Label htmlFor="brochure_description">Description</Label>
              <Textarea
                id="brochure_description"
                value={formData.brochure_description}
                onChange={(e) => handleInputChange('brochure_description', e.target.value)}
                placeholder="Description of the brochure content"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="brochure_url">Brochure URL</Label>
              <Input
                id="brochure_url"
                type="url"
                value={formData.brochure_url}
                onChange={(e) => handleInputChange('brochure_url', e.target.value)}
                placeholder="https://example.com/brochure.pdf"
                required
              />
            </div>
          </>
        );

      case 'vcard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vcard_full_name">Full Name</Label>
                <Input
                  id="vcard_full_name"
                  value={formData.vcard_full_name}
                  onChange={(e) => handleInputChange('vcard_full_name', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="vcard_title">Job Title</Label>
                <Input
                  id="vcard_title"
                  value={formData.vcard_title}
                  onChange={(e) => handleInputChange('vcard_title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="vcard_company_name">Company Name</Label>
                <Input
                  id="vcard_company_name"
                  value={formData.vcard_company_name}
                  onChange={(e) => handleInputChange('vcard_company_name', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <Label htmlFor="vcard_mobile_number">Mobile Number</Label>
                <Input
                  id="vcard_mobile_number"
                  type="tel"
                  value={formData.vcard_mobile_number}
                  onChange={(e) => handleInputChange('vcard_mobile_number', e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="vcard_company_number">Company Number</Label>
                <Input
                  id="vcard_company_number"
                  type="tel"
                  value={formData.vcard_company_number}
                  onChange={(e) => handleInputChange('vcard_company_number', e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="vcard_email">Email</Label>
                <Input
                  id="vcard_email"
                  type="email"
                  value={formData.vcard_email}
                  onChange={(e) => handleInputChange('vcard_email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="vcard_website">Website</Label>
                <Input
                  id="vcard_website"
                  type="url"
                  value={formData.vcard_website}
                  onChange={(e) => handleInputChange('vcard_website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="vcard_linkedin">LinkedIn Profile</Label>
                <Input
                  id="vcard_linkedin"
                  type="url"
                  value={formData.vcard_linkedin}
                  onChange={(e) => handleInputChange('vcard_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="vcard_address">Address</Label>
              <Textarea
                id="vcard_address"
                value={formData.vcard_address}
                onChange={(e) => handleInputChange('vcard_address', e.target.value)}
                placeholder="123 Main St, City, State 12345"
                rows={2}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Profile</CardTitle>
        <CardDescription>
          Create a new profile configuration for your QR code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="profile_name">Profile Name</Label>
            <Input
              id="profile_name"
              value={formData.profile_name}
              onChange={(e) => handleInputChange('profile_name', e.target.value)}
              placeholder="My Business Profile"
              required
            />
          </div>

          <div>
            <Label htmlFor="profile_type">Profile Type</Label>
            <Select value={profileType} onValueChange={setProfileType}>
              <SelectTrigger>
                <SelectValue placeholder="Select profile type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="brochure">Brochure</SelectItem>
                <SelectItem value="vcard">vCard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderProfileFields()}

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Profile'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
