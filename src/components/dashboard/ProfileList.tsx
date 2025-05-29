
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, EyeOff, Globe, Mail, Phone, MessageCircle, FileText, User } from 'lucide-react';

interface QRProfile {
  id: string;
  profile_name: string;
  profile_type: string;
  is_active: boolean;
  website_url?: string;
  email_address?: string;
  phone_number?: string;
  whatsapp_number?: string;
  whatsapp_message?: string;
  brochure_title?: string;
  brochure_description?: string;
  brochure_url?: string;
  vcard_full_name?: string;
  vcard_title?: string;
  vcard_company_name?: string;
  vcard_mobile_number?: string;
  vcard_company_number?: string;
  vcard_email?: string;
  vcard_website?: string;
  vcard_address?: string;
  vcard_linkedin?: string;
}

export const ProfileList: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<QRProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('qr_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading profiles',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (profileId: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('qr_profiles')
        .update({ is_active: !currentActive })
        .eq('id', profileId);

      if (error) throw error;

      await fetchProfiles();
      toast({
        title: currentActive ? 'Profile deactivated' : 'Profile activated',
        description: currentActive 
          ? 'Profile is no longer active' 
          : 'This profile is now active for your QR code',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const { error } = await supabase
        .from('qr_profiles')
        .delete()
        .eq('id', profileId);

      if (error) throw error;

      await fetchProfiles();
      toast({
        title: 'Profile deleted',
        description: 'Profile has been successfully deleted',
      });
    } catch (error: any) {
      toast({
        title: 'Error deleting profile',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getProfileIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'phone': return <Phone className="h-5 w-5" />;
      case 'whatsapp': return <MessageCircle className="h-5 w-5" />;
      case 'brochure': return <FileText className="h-5 w-5" />;
      case 'vcard': return <User className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getProfileDescription = (profile: QRProfile) => {
    switch (profile.profile_type) {
      case 'website':
        return profile.website_url;
      case 'email':
        return profile.email_address;
      case 'phone':
        return profile.phone_number;
      case 'whatsapp':
        return `${profile.whatsapp_number} - ${profile.whatsapp_message}`;
      case 'brochure':
        return profile.brochure_title;
      case 'vcard':
        return `${profile.vcard_full_name} - ${profile.vcard_company_name}`;
      default:
        return 'Profile';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profiles...</div>;
  }

  if (profiles.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No profiles created yet. Create your first profile to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <Card key={profile.id} className={profile.is_active ? 'ring-2 ring-green-500' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getProfileIcon(profile.profile_type)}
                <div>
                  <CardTitle className="text-lg">{profile.profile_name}</CardTitle>
                  <CardDescription className="text-sm">
                    {getProfileDescription(profile)}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {profile.is_active && (
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleActive(profile.id, profile.is_active)}
                >
                  {profile.is_active ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteProfile(profile.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
