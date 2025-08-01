import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    avatar_url: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setLoading(false);
        return;
      }
      const userId = userData.user.id;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      setProfile({
        first_name: (data as any)?.first_name || '',
        last_name: (data as any)?.last_name || '',
        email: userData.user.email || '',
        phone: (data as any)?.phone || '',
        avatar_url: (data as any)?.avatar_url || '',
      });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={profile.avatar_url || '/placeholder.svg'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border mb-2"
        />
        <div className="font-semibold text-lg">{profile.first_name} {profile.last_name}</div>
        <div className="text-gray-500 text-sm">{profile.email}</div>
      </div>
      <div className="space-y-2 mb-4">
        <div><span className="font-medium">Phone:</span> {profile.phone || <span className="text-gray-400">Not set</span>}</div>
      </div>
      <button
        onClick={() => navigate('/profile/edit')}
        className="w-full py-2 px-4 bg-primary text-white rounded-md font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage; 