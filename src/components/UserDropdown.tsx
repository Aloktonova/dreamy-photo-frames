import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';
import { useSignOut } from '@/hooks/useSignOut';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserDropdownProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userName = 'User',
  userEmail = '',
  avatarUrl = '',
  onProfile,
  onSettings,
  onLogout,
}) => {
  const signOut = useSignOut(onLogout);
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: userName,
    email: userEmail,
    phone: '',
    avatar_url: avatarUrl,
  });
  const [avatarPreview, setAvatarPreview] = useState(avatarUrl);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    // Upload will be handled on save
  };

  // Save profile changes
  const handleSave = async () => {
    setSaving(true);
    try {
      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) throw new Error('User not found');
      const userId = userData.user.id;
      let avatar_url = profile.avatar_url;
      // If avatarPreview is a blob URL, upload new avatar
      if (avatarPreview && avatarPreview !== profile.avatar_url && avatarPreview.startsWith('blob:')) {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
          const { data, error } = await supabase.storage.from('avatars').upload(`${userId}/${file.name}`, file, { upsert: true });
          if (error) throw error;
          const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(`${userId}/${file.name}`);
          avatar_url = publicUrlData.publicUrl;
        }
      }
      // Upsert profile
      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: userId,
        username: profile.name,
        phone: profile.phone,
        avatar_url,
      });
      if (upsertError) throw upsertError;
      setProfile((p) => ({ ...p, avatar_url }));
      setEditing(false);
      toast({ title: 'Profile updated!', duration: 1500 });
    } catch (err: any) {
      toast({ title: 'Profile update failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // Social linking
  const handleLinkSocial = async (provider: string) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      toast({ title: `Linked with ${provider.charAt(0).toUpperCase() + provider.slice(1)}` });
    } catch (err: any) {
      toast({ title: `Failed to link ${provider}`, description: err.message, variant: 'destructive' });
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setShowDeleteConfirm(false);
    setSaving(true);
    try {
      // Get JWT
      const { data: sessionData } = await supabase.auth.getSession();
      const jwt = sessionData.session?.access_token;
      if (!jwt) throw new Error('Not authenticated');
      // Call edge function (adjust path if needed)
      const response = await fetch('/functions/v1/delete-user', {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!response.ok) throw new Error('Failed to delete account');
      toast({ title: 'Account deleted' });
      signOut();
    } catch (err: any) {
      toast({ title: 'Account deletion failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Open user menu">
          <Avatar className="h-9 w-9">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt={profile.name} />
            ) : (
              <AvatarFallback>
                {profile.name ? profile.name[0] : <User className="h-5 w-5" />}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 min-w-[12rem] bg-popover text-popover-foreground border border-gray-200 shadow-lg rounded-lg p-1 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        sideOffset={8}
      >
        <div className="flex flex-col items-center px-4 py-3">
          <div className="relative group mb-2">
            <Avatar className="h-16 w-16">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-2xl">{profile.name ? profile.name[0] : <User className="h-8 w-8" />}</AvatarFallback>
              )}
            </Avatar>
            <button
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
              aria-label="Change avatar"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          {editing ? (
            <>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md mb-2 text-sm"
                autoComplete="name"
                disabled={saving}
              />
              <input
                name="email"
                value={profile.email}
                readOnly
                className="w-full px-3 py-2 border rounded-md mb-2 text-sm bg-gray-100"
                autoComplete="email"
              />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded-md mb-2 text-sm"
                autoComplete="tel"
                disabled={saving}
              />
              <div className="flex gap-2 w-full">
                <button
                  className="flex-1 bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-700 rounded-md py-2 text-sm font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="font-medium text-base text-gray-900 truncate mb-1">{profile.name}</div>
              <div className="text-xs text-gray-500 truncate mb-1">{profile.email}</div>
              {profile.phone && <div className="text-xs text-gray-500 truncate mb-2">{profile.phone}</div>}
              <button
                className="w-full bg-gray-100 text-gray-700 rounded-md py-2 text-sm font-medium hover:bg-gray-200 transition-colors mb-2"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="px-4 py-2 flex flex-col gap-2">
          <button
            className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-md py-2 px-3 text-sm font-medium hover:bg-blue-100 transition-colors"
            onClick={() => handleLinkSocial('google')}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.148s2.765-6.148 6.148-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.727-1.602-3.953-2.594-6.656-2.594-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.539-4.016 9.539-9.648 0-.648-.07-1.141-.156-1.602z"/><path fill="#34A853" d="M3.691 7.548l3.086 2.266c.844-1.602 2.344-2.742 4.223-2.742 1.289 0 2.453.453 3.367 1.344l2.531-2.531c-1.523-1.414-3.523-2.285-5.898-2.285-3.789 0-6.977 3.094-6.977 6.977 0 1.094.242 2.133.672 3.047z"/><path fill="#FBBC05" d="M12 22c2.672 0 4.922-.883 6.562-2.406l-3.047-2.484c-.844.57-1.922.914-3.516.914-2.789 0-5.156-1.883-6.008-4.414l-3.086 2.383c1.523 3.008 4.672 5.007 8.095 5.007z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.148s2.765-6.148 6.148-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.727-1.602-3.953-2.594-6.656-2.594-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.539-4.016 9.539-9.648 0-.648-.07-1.141-.156-1.602z"/></svg>
            Link Google
          </button>
          <button
            className="flex items-center gap-2 bg-blue-100 text-blue-900 rounded-md py-2 px-3 text-sm font-medium hover:bg-blue-200 transition-colors"
            onClick={() => handleLinkSocial('facebook')}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.495v-9.294h-3.124v-3.622h3.124v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.592 1.323-1.324v-21.35c0-.733-.593-1.325-1.326-1.325z"/></svg>
            Link Facebook
          </button>
        </div>
        <DropdownMenuSeparator />
        <div className="px-4 py-2 flex flex-col gap-2">
          <button
            className="flex items-center gap-2 bg-red-50 text-red-700 rounded-md py-2 px-3 text-sm font-medium hover:bg-red-100 transition-colors"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
            Delete Account
          </button>
          {showDeleteConfirm && (
            <div className="bg-white border border-red-200 rounded-md p-3 mt-2 flex flex-col gap-2">
              <div className="text-red-700 text-sm mb-2">Are you sure? This action cannot be undone.</div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-red-600 text-white rounded-md py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                  onClick={handleDeleteAccount}
                >
                  Confirm Delete
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-700 rounded-md py-2 text-sm font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-red-600 cursor-pointer min-h-[44px] px-2 py-2 text-base focus:bg-red-50 focus:text-red-700 active:bg-red-100 rounded-sm transition-colors">
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown; 