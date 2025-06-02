
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Mail, MessageSquare, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const HelpSupport = () => {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [myReports] = useState([
    { id: 1, title: "Masalah pembayaran", status: "Dalam Review", date: "15 Mei 2025" },
    { id: 2, title: "Driver tidak ditemukan", status: "Selesai", date: "12 Mei 2025" },
    { id: 3, title: "Aplikasi sering crash", status: "Sedang Ditangani", date: "10 Mei 2025" },
  ]);
  
  const { toast } = useToast();

  const handleSubmitReport = () => {
    if (!reportTitle || !reportDescription) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon isi judul dan deskripsi masalah.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Laporan Terkirim",
      description: "Laporan masalah Anda telah terkirim dan akan ditinjau oleh tim kami.",
    });
    
    setReportTitle("");
    setReportDescription("");
  };

  const handleContactCS = () => {
    toast({
      title: "Menghubungi Customer Service",
      description: "Anda akan dialihkan ke WhatsApp Customer Service.",
    });
  };

  const handleFAQ = () => {
    toast({
      title: "Membuka FAQ",
      description: "Halaman FAQ akan segera dibuka.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Sedang Ditangani":
        return "bg-blue-100 text-blue-800";
      case "Dalam Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Bantuan & Dukungan</h2>
      
      <div className="space-y-6">
        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleFAQ}
          >
            <HelpCircle className="h-4 w-4" />
            FAQ
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleContactCS}
          >
            <MessageSquare className="h-4 w-4" />
            Customer Service
          </Button>
        </div>

        {/* Report Form */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Laporkan Masalah
          </h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="report-title">Judul Masalah</Label>
              <Input
                id="report-title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Jelaskan masalah secara singkat"
              />
            </div>
            <div>
              <Label htmlFor="report-description">Deskripsi Masalah</Label>
              <Textarea
                id="report-description"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Jelaskan masalah secara detail..."
                rows={3}
              />
            </div>
            <Button 
              onClick={handleSubmitReport}
              className="w-full"
            >
              Kirim Laporan
            </Button>
          </div>
        </div>

        {/* My Reports Status */}
        <div className="space-y-3">
          <h3 className="font-medium">Status Laporan Saya</h3>
          <div className="space-y-2">
            {myReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{report.title}</p>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
