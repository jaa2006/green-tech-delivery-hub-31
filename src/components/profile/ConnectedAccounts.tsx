
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    facebook: false,
    apple: false,
  });
  const { toast } = useToast();

  const handleConnectAccount = (provider: string) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [provider]: !prev[provider as keyof typeof prev]
    }));
    
    const isConnected = !connectedAccounts[provider as keyof typeof connectedAccounts];
    toast({
      title: isConnected ? "Akun Terhubung" : "Akun Terputus",
      description: `Akun ${provider} telah ${isConnected ? 'terhubung' : 'terputus'}.`,
    });
  };

  const handleManageDevices = () => {
    toast({
      title: "Kelola Perangkat",
      description: "Fitur kelola perangkat terhubung akan segera tersedia.",
    });
  };

  const accountProviders = [
    { id: 'google', name: 'Google', color: 'bg-red-500' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-500' },
    { id: 'apple', name: 'Apple', color: 'bg-gray-800' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Akun Terhubung</h2>
      
      <div className="space-y-4">
        {accountProviders.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${provider.color} rounded-full flex items-center justify-center`}>
                {connectedAccounts[provider.id as keyof typeof connectedAccounts] ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <X className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="font-medium">{provider.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {connectedAccounts[provider.id as keyof typeof connectedAccounts] ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Terhubung
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">
                  Tidak Terhubung
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConnectAccount(provider.id)}
              >
                {connectedAccounts[provider.id as keyof typeof connectedAccounts] ? 'Putuskan' : 'Hubungkan'}
              </Button>
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={handleManageDevices}
        >
          <Settings className="h-4 w-4" />
          Kelola Perangkat Terhubung
        </Button>
      </div>
    </div>
  );
};
