
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Users, MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const OnboardingSlide1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
    <div className="mb-8">
      <div className="w-24 h-24 bg-[#07595A] rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-white text-3xl font-bold">H</span>
      </div>
      <h1 className="text-4xl font-bold text-[#07595A] mb-4">Habisin</h1>
      <p className="text-xl text-gray-600 leading-relaxed">
        Transportasi Mudah, Cepat, dan Aman
      </p>
    </div>
    
    <Button 
      onClick={onNext}
      className="w-full max-w-sm bg-[#07595A] hover:bg-[#065658] text-white py-4 text-lg"
    >
      Get Started
      <ChevronRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
);

const OnboardingSlide2 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
    <div className="mb-8">
      <div className="w-32 h-32 bg-[#07595A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Car className="w-16 h-16 text-[#07595A]" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mudah & Efisien</h2>
      <p className="text-lg text-gray-600 leading-relaxed max-w-md">
        Habisin memudahkan kamu bepergian dengan cepat, aman, dan efisien lewat layanan transportasi digital.
      </p>
    </div>
    
    <Button 
      onClick={onNext}
      className="w-full max-w-sm bg-[#07595A] hover:bg-[#065658] text-white py-4 text-lg"
    >
      Next
      <ChevronRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
);

const OnboardingSlide3 = ({ onFinish }: { onFinish: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Cara Menggunakan</h2>
      
      <div className="space-y-6 max-w-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#07595A] rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">1. Daftar & Login</h3>
            <p className="text-sm text-gray-600">Buat akun atau masuk ke aplikasi</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#07595A] rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">2. Pilih Lokasi</h3>
            <p className="text-sm text-gray-600">Tentukan lokasi jemput dan tujuan</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#07595A] rounded-full flex items-center justify-center flex-shrink-0">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">3. Driver Menjemput</h3>
            <p className="text-sm text-gray-600">Driver datang dan antar ke tujuan</p>
          </div>
        </div>
      </div>
    </div>
    
    <Button 
      onClick={onFinish}
      className="w-full max-w-sm bg-[#07595A] hover:bg-[#065658] text-white py-4 text-lg"
    >
      Mulai Sekarang
      <ChevronRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
);

const Onboarding = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    api?.scrollNext();
  };

  const handleFinish = () => {
    localStorage.setItem("has_seen_onboarding", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07595A] to-black">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          <CarouselItem>
            <OnboardingSlide1 onNext={handleNext} />
          </CarouselItem>
          <CarouselItem>
            <OnboardingSlide2 onNext={handleNext} />
          </CarouselItem>
          <CarouselItem>
            <OnboardingSlide3 onFinish={handleFinish} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Dot Indicators */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="fixed top-6 right-6 text-gray-300 hover:text-white transition-colors"
      >
        Skip
      </button>
    </div>
  );
};

export default Onboarding;
