import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
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
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <div className="font-medium text-sm text-gray-900 truncate">{userName}</div>
          {userEmail && <div className="text-xs text-gray-500 truncate">{userEmail}</div>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile} className="flex items-center gap-2 cursor-pointer">
          <User className="h-4 w-4" /> My Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings} className="flex items-center gap-2 cursor-pointer">
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 text-red-600 cursor-pointer">
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown; 