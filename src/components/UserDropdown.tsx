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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      const { error } = await supabase.auth.signInWithOAuth({ provider: provider as any });
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

  const shareOnTwitter = (imageUrl: string) => {
    const text = encodeURIComponent("Check out my collage from Dreamy Photo Frames!");
    const url = encodeURIComponent(imageUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnFacebook = (imageUrl: string) => {
    const url = encodeURIComponent(imageUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareOnWhatsApp = (imageUrl: string) => {
    const text = encodeURIComponent("Check out my collage! " + imageUrl);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Open user menu">
          <Avatar className="h-9 w-9">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={userName} />
            ) : (
              <AvatarFallback>
                {userName ? userName[0] : <User className="h-5 w-5" />}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 min-w-[12rem] bg-white text-gray-900 border border-gray-200 shadow-xl rounded-lg p-2 z-50"
        sideOffset={8}
        style={{ background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        <div className="flex flex-col items-center mb-2">
          <Avatar className="h-16 w-16 mb-2">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={userName} />
            ) : (
              <AvatarFallback className="text-2xl">{userName ? userName[0] : <User className="h-8 w-8" />}</AvatarFallback>
            )}
          </Avatar>
          <div className="font-medium text-base text-gray-900 truncate mb-1">{userName}</div>
          <div className="text-xs text-gray-500 truncate mb-1">{userEmail}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 min-h-[44px] px-3 py-2 text-base rounded-md cursor-pointer hover:bg-gray-100 focus:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        >
          <User className="h-5 w-5" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate('/profile/edit')}
          className="flex items-center gap-2 min-h-[44px] px-3 py-2 text-base rounded-md cursor-pointer hover:bg-gray-100 focus:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        >
          <span className="material-icons h-5 w-5">edit</span> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 min-h-[44px] px-3 py-2 text-base rounded-md cursor-pointer hover:bg-gray-100 focus:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        >
          <Settings className="h-5 w-5" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 text-red-600 cursor-pointer min-h-[44px] px-3 py-2 text-base rounded-md hover:bg-red-50 focus:bg-red-50 focus:text-red-700 active:bg-red-100 focus:outline-none transition-colors"
        >
          <LogOut className="h-5 w-5" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown; 