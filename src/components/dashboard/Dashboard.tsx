
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ProfileList } from './ProfileList';
import { CreateProfileForm } from './CreateProfileForm';
import { QRCodeDisplay } from './QRCodeDisplay';
import { LogOut, Plus, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string;
}

interface QRCode {
  qr_code_id: string;
}

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userQRCode, setUserQRCode] = useState<QRCode | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Fetch user QR code
      const { data: qrCode, error: qrError } = await supabase
        .from('user_qr_codes')
        .select('qr_code_id')
        .eq('user_id', user?.id)
        .single();

      if (qrError && qrError.code !== 'PGRST116') {
        throw qrError;
      }

      setUserProfile(profile);
      setUserQRCode(qrCode);
    } catch (error: any) {
      toast({
        title: 'Error loading profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <QrCode className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">QR Profile Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {userProfile?.full_name || 'User'}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your QR Code</CardTitle>
                <CardDescription>
                  This QR code will redirect to your active profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userQRCode && <QRCodeDisplay qrCodeId={userQRCode.qr_code_id} />}
              </CardContent>
            </Card>
          </div>

          {/* Profiles Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Profiles</h2>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            </div>

            {showCreateForm && (
              <div className="mb-6">
                <CreateProfileForm
                  onSuccess={() => {
                    setShowCreateForm(false);
                    // Refresh will be handled by ProfileList
                  }}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            )}

            <ProfileList />
          </div>
        </div>
      </main>
    </div>
  );
};
