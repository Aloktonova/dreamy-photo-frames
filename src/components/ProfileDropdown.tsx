import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Loader2, LogOut, Trash2, Instagram, Facebook, Twitter, User as UserIcon, Edit, Save, X } from 'lucide-react';

// Editable profile fields
const initialProfile = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  avatar_url: '',
};

const ProfileDropdown = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');

  // Fetch user and profile info
  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setLoading(false);
        setUser(null);
        return;
      }
      setUser(user);
      // Fetch profile from Supabase
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile({
        first_name: profileData?.first_name || user.user_metadata?.given_name || '',
        last_name: profileData?.last_name || user.user_metadata?.family_name || '',
        email: user.email || '',
        phone: profileData?.phone || '',
        avatar_url: user.user_metadata?.avatar_url || profileData?.avatar_url || '',
      });
      setLoading(false);
    };
    fetchUser();
    return () => { ignore = true; };
  }, []);

  // Handle field changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSave = async () => {
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        avatar_url: profile.avatar_url,
      });
    if (error) setError('Failed to save profile');
    setSaving(false);
    setEditing(false);
  };

  // Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // Delete account (with confirmation)
  const handleDeleteAccount = async () => {
    setError('');
    setSaving(true);
    try {
      // Call the delete-user edge function
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      const response = await fetch('/functions/v1/delete-user', {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` }
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      window.location.reload();
    } catch (error) {
      setError('Account deletion failed. Please try again.');
      setSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  // Social connect handlers
  const handleConnectSocial = (provider) => {
    // TODO: Implement OAuth flow for each provider
    alert(`Connect to ${provider} (OAuth implementation needed)`);
  };

  // Post to social media
  const handlePostToSocial = async (provider) => {
    try {
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      const response = await fetch('/functions/v1/post-to-social', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}` 
        },
        body: JSON.stringify({
          provider,
          imageUrl: 'https://example.com/your-image.jpg', // Replace with actual image
          caption: 'Created with Dreamy Photo Frames',
          recipient: null // For WhatsApp
        })
      });
      if (response.ok) {
        alert(`Posted to ${provider} successfully!`);
      } else {
        throw new Error('Failed to post');
      }
    } catch (error) {
      alert(`Failed to post to ${provider}: ${error.message}`);
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-10 w-10">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  // Avatar fallback
  const getInitials = () => {
    if (profile.first_name || profile.last_name) {
      return `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
    }
    if (profile.email) return profile.email[0].toUpperCase();
    return '?';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full focus:outline-none">
          <Avatar>
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : (
              <AvatarFallback>{getInitials()}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4 shadow-lg rounded-xl bg-white border z-50">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-16 w-16 mb-2">
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : (
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            )}
          </Avatar>
          <div className="font-semibold text-lg">{profile.first_name} {profile.last_name}</div>
          <div className="text-muted-foreground text-sm">{profile.email}</div>
        </div>
        <DropdownMenuSeparator />
        
        {/* Editable Profile Fields */}
        <form className="space-y-2 mt-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div className="flex gap-2">
            <input
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="flex-1 px-3 py-2 border rounded-md"
              disabled={!editing}
              autoComplete="given-name"
            />
            <input
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="flex-1 px-3 py-2 border rounded-md"
              disabled={!editing}
              autoComplete="family-name"
            />
          </div>
          <input
            name="email"
            value={profile.email}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
            autoComplete="email"
          />
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded-md"
            disabled={!editing}
            autoComplete="tel"
          />
          {editing ? (
            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" disabled={saving} className="flex-1">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setEditing(false)} className="flex-1">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button type="button" size="sm" variant="outline" onClick={() => setEditing(true)} className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </form>
        
        <DropdownMenuSeparator className="my-4" />
        
        {/* Social Account Connections */}
        <div className="mb-4">
          <div className="font-medium mb-2">Connect Social Accounts</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button variant="outline" size="sm" onClick={() => handleConnectSocial('Instagram')}>
              <Instagram className="h-4 w-4 mr-2" />
              Connect Instagram
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleConnectSocial('Facebook')}>
              <Facebook className="h-4 w-4 mr-2" />
              Connect Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleConnectSocial('Twitter')}>
              <Twitter className="h-4 w-4 mr-2" />
              Connect Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleConnectSocial('WhatsApp')}>
              <UserIcon className="h-4 w-4 mr-2" />
              Connect WhatsApp
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            After connecting, you can post photos directly to your socials with the caption: "Created with Dreamy Photo Frames"
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Account Actions */}
        <DropdownMenuItem className="text-red-600 flex items-center gap-2 cursor-pointer" onClick={() => setShowDeleteConfirm(true)}>
          <Trash2 className="h-4 w-4" /> Delete Account
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Sign Out
        </DropdownMenuItem>
        
        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl p-6 shadow-xl w-80">
              <div className="font-bold text-lg mb-2">Delete Account?</div>
              <div className="text-sm mb-4">This action is permanent and cannot be undone.</div>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={handleDeleteAccount} disabled={saving} className="flex-1">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  {saving ? 'Deleting...' : 'Delete'}
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown; 