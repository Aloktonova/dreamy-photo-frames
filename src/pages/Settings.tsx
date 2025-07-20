import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const SOCIALS = [
  { provider: 'facebook', label: 'Facebook' },
  { provider: 'twitter', label: 'X / Twitter' },
  { provider: 'instagram', label: 'Instagram' },
];

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally, fetch connected providers from Supabase user metadata
    // For now, assume none are connected
    setConnected({ facebook: false, twitter: false, instagram: false });
  }, []);

  const handleConnect = async (provider: string) => {
    setLoading(true);
    try {
      // @ts-ignore: Supabase type expects Provider, but string works for known providers
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      toast({ title: `Connecting to ${provider}` });
    } catch (err: any) {
      toast({ title: `Failed to connect ${provider}`, description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = (provider: string) => {
    // Implement disconnect logic if supported by backend
    toast({ title: `Disconnected from ${provider}` });
    setConnected((prev) => ({ ...prev, [provider]: false }));
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
      <div className="space-y-4">
        {SOCIALS.map(({ provider, label }) => (
          <div key={provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="font-medium">{label}</span>
            {connected[provider] ? (
              <button
                onClick={() => handleDisconnect(provider)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading}
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect(provider)}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings; 