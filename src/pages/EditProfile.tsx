import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    avatar_url: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: userData.user.email || '',
        phone: data?.phone || '',
        avatar_url: data?.avatar_url || '',
      });
      setAvatarPreview(data?.avatar_url || '');
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) throw new Error('User not found');
      const userId = userData.user.id;
      let avatar_url = profile.avatar_url;
      if (avatarPreview && avatarPreview !== profile.avatar_url && avatarPreview.startsWith('blob:')) {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
          const { data, error } = await supabase.storage.from('avatars').upload(`${userId}/${file.name}`, file, { upsert: true });
          if (error) throw error;
          const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(`${userId}/${file.name}`);
          avatar_url = publicUrlData.publicUrl;
        }
      }
      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: userId,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        avatar_url,
      });
      if (upsertError) throw upsertError;
      navigate('/profile');
    } catch (err) {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <img
            src={avatarPreview || '/placeholder.svg'}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border mb-2"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-700"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-md font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile; 