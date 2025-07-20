import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const initialProfile = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  avatar_url: "",
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setLoading(false);
        setUser(null);
        return;
      }
      setUser(user);
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile({
        first_name: profileData?.first_name || user.user_metadata?.given_name || "",
        last_name: profileData?.last_name || user.user_metadata?.family_name || "",
        email: user.email || "",
        phone: profileData?.phone || "",
        avatar_url: user.user_metadata?.avatar_url || profileData?.avatar_url || "",
      });
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        avatar_url: profile.avatar_url,
      });
    if (error) setError("Failed to save profile");
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center items-center h-40">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form className="space-y-4" onSubmit={handleSave}>
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-20 w-20 mb-2">
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : (
              <AvatarFallback>{profile.first_name?.[0] || "?"}</AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex gap-2">
          <input
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="flex-1 px-3 py-2 border rounded-md"
            autoComplete="given-name"
          />
          <input
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="flex-1 px-3 py-2 border rounded-md"
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
          autoComplete="tel"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage; 