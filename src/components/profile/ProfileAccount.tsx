
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProfileAccountProps {
  userData: {
    fullName: string;
    email: string;
    photoURL?: string;
    phone?: string;
  };
  onUpdateProfile: (data: { fullName: string; photoURL: string; phone: string }) => Promise<void>;
  updating: boolean;
}

export const ProfileAccount = ({ userData, onUpdateProfile, updating }: ProfileAccountProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(userData.fullName);
  const [editPhotoURL, setEditPhotoURL] = useState(userData.photoURL || "");
  const [editPhone, setEditPhone] = useState(userData.phone || "");

  const handleSaveChanges = async () => {
    await onUpdateProfile({
      fullName: editName,
      photoURL: editPhotoURL,
      phone: editPhone
    });
    setIsEditOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Profil & Akun</h2>
      
      <div className="flex items-center gap-4 mb-4 relative">
        <Avatar className="h-16 w-16">
          {userData.photoURL ? (
            <AvatarImage src={userData.photoURL} alt={userData.fullName} />
          ) : (
            <AvatarFallback className="bg-habisin-dark text-white">
              {userData.fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{userData.fullName}</h3>
          <p className="text-sm text-gray-500">{userData.email}</p>
          {userData.phone && (
            <p className="text-sm text-gray-500">{userData.phone}</p>
          )}
        </div>
        
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-2 h-auto" size="icon">
              <Edit className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profil & Akun</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Masukkan nama lengkap" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor HP</Label>
                <Input 
                  id="phone" 
                  value={editPhone} 
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Masukkan nomor HP" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">URL Foto Profil</Label>
                <Input 
                  id="photo" 
                  value={editPhotoURL} 
                  onChange={(e) => setEditPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg" 
                />
                <p className="text-xs text-muted-foreground">
                  Masukkan URL gambar untuk foto profil Anda
                </p>
              </div>
              <Button 
                onClick={handleSaveChanges} 
                className="w-full"
                disabled={updating}
              >
                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
