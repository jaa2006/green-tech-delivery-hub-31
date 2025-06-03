
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-3">
      <h2 className="text-lg font-semibold mb-3">Profil & Akun</h2>
      
      <div className="flex items-center gap-3 mb-3 relative">
        <Avatar className="h-12 w-12">
          {userData.photoURL ? (
            <AvatarImage src={userData.photoURL} alt={userData.fullName} />
          ) : (
            <AvatarFallback className="bg-habisin-dark text-white text-sm">
              {userData.fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate">{userData.fullName}</h3>
          <p className="text-xs text-gray-500 truncate">{userData.email}</p>
          {userData.phone && (
            <p className="text-xs text-gray-500 truncate">{userData.phone}</p>
          )}
        </div>
        
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-1 h-auto" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg">Edit Profil & Akun</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm">Nomor HP</Label>
                <Input 
                  id="phone" 
                  value={editPhone} 
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Masukkan nomor HP"
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="photo" className="text-sm">URL Foto Profil</Label>
                <Input 
                  id="photo" 
                  value={editPhotoURL} 
                  onChange={(e) => setEditPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Masukkan URL gambar untuk foto profil Anda
                </p>
              </div>
              <Button 
                onClick={handleSaveChanges} 
                className="w-full text-sm py-2"
                disabled={updating}
              >
                {updating && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                Simpan Perubahan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
