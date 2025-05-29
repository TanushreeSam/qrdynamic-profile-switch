
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Mail, Phone, MessageCircle, FileText, User, Download } from 'lucide-react';

interface QRProfile {
  id: string;
  profile_name: string;
  profile_type: string;
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

export const QRScanner: React.FC = () => {
  const { qrCodeId } = useParams<{ qrCodeId: string }>();
  const [profile, setProfile] = useState<QRProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (qrCodeId) {
      fetchActiveProfile();
    }
  }, [qrCodeId]);

  const fetchActiveProfile = async () => {
    try {
      // First, get the user_id from the QR code
      const { data: qrData, error: qrError } = await supabase
        .from('user_qr_codes')
        .select('user_id')
        .eq('qr_code_id', qrCodeId)
        .single();

      if (qrError) {
        throw new Error('QR code not found');
      }

      // Then get the active profile for that user
      const { data: profileData, error: profileError } = await supabase
        .from('qr_profiles')
        .select('*')
        .eq('user_id', qrData.user_id)
        .eq('is_active', true)
        .single();

      if (profileError) {
        throw new Error('No active profile found');
      }

      setProfile(profileData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProfileIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="h-8 w-8" />;
      case 'email': return <Mail className="h-8 w-8" />;
      case 'phone': return <Phone className="h-8 w-8" />;
      case 'whatsapp': return <MessageCircle className="h-8 w-8" />;
      case 'brochure': return <FileText className="h-8 w-8" />;
      case 'vcard': return <User className="h-8 w-8" />;
      default: return <User className="h-8 w-8" />;
    }
  };

  const handleAction = () => {
    if (!profile) return;

    switch (profile.profile_type) {
      case 'website':
        if (profile.website_url) {
          window.open(profile.website_url, '_blank');
        }
        break;
      case 'email':
        if (profile.email_address) {
          window.location.href = `mailto:${profile.email_address}`;
        }
        break;
      case 'phone':
        if (profile.phone_number) {
          window.location.href = `tel:${profile.phone_number}`;
        }
        break;
      case 'whatsapp':
        if (profile.whatsapp_number) {
          const message = profile.whatsapp_message ? encodeURIComponent(profile.whatsapp_message) : '';
          window.open(`https://wa.me/${profile.whatsapp_number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        }
        break;
      case 'brochure':
        if (profile.brochure_url) {
          window.open(profile.brochure_url, '_blank');
        }
        break;
      case 'vcard':
        downloadVCard();
        break;
    }
  };

  const downloadVCard = () => {
    if (!profile) return;

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.vcard_full_name || ''}`,
      `TITLE:${profile.vcard_title || ''}`,
      `ORG:${profile.vcard_company_name || ''}`,
      `TEL;TYPE=CELL:${profile.vcard_mobile_number || ''}`,
      `TEL;TYPE=WORK:${profile.vcard_company_number || ''}`,
      `EMAIL:${profile.vcard_email || ''}`,
      `URL:${profile.vcard_website || ''}`,
      `ADR:;;${profile.vcard_address || ''}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${profile.vcard_linkedin || ''}`,
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.vcard_full_name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getActionText = () => {
    if (!profile) return '';

    switch (profile.profile_type) {
      case 'website': return 'Visit Website';
      case 'email': return 'Send Email';
      case 'phone': return 'Call Now';
      case 'whatsapp': return 'Chat on WhatsApp';
      case 'brochure': return 'View Brochure';
      case 'vcard': return 'Download Contact';
      default: return 'View';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Error</CardTitle>
            <CardDescription className="text-center">
              {error || 'Profile not found'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getProfileIcon(profile.profile_type)}
          </div>
          <CardTitle className="text-2xl">{profile.profile_name}</CardTitle>
          <CardDescription>
            {profile.profile_type === 'vcard' && profile.vcard_company_name && (
              <div className="text-lg font-medium">{profile.vcard_company_name}</div>
            )}
            {profile.profile_type === 'vcard' && profile.vcard_title && (
              <div className="text-sm text-gray-600">{profile.vcard_title}</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.profile_type === 'brochure' && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">{profile.brochure_description}</p>
            </div>
          )}
          
          {profile.profile_type === 'vcard' && (
            <div className="space-y-2 text-sm">
              {profile.vcard_full_name && (
                <div><strong>Name:</strong> {profile.vcard_full_name}</div>
              )}
              {profile.vcard_mobile_number && (
                <div><strong>Mobile:</strong> {profile.vcard_mobile_number}</div>
              )}
              {profile.vcard_email && (
                <div><strong>Email:</strong> {profile.vcard_email}</div>
              )}
              {profile.vcard_website && (
                <div><strong>Website:</strong> {profile.vcard_website}</div>
              )}
              {profile.vcard_address && (
                <div><strong>Address:</strong> {profile.vcard_address}</div>
              )}
            </div>
          )}

          <Button onClick={handleAction} className="w-full" size="lg">
            {profile.profile_type === 'vcard' && <Download className="h-4 w-4 mr-2" />}
            {getActionText()}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
