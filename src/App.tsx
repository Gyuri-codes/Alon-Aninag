import React, { useState } from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Dedicated Individual Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';

// Shared Global Modals & Interactive Widgets
import { DayglowBookingModal } from './components/DayglowBookingModal';
import { OfflineItineraryModal } from './components/OfflineItineraryModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PresentationMode } from './components/PresentationMode';
import { WifiOff } from 'lucide-react';

const ResortAppContent: React.FC = () => {
  const { 
    isOfflineMode, 
    toggleOfflineMode, 
    currentSection,
    isPresentationMode
  } = useResort();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isDayglowModalOpen, setIsDayglowModalOpen] = useState<boolean>(false);
  const [dayglowGuestType, setDayglowGuestType] = useState<'overnight' | 'daypass'>('overnight');

  const handleOpenDayglowModal = (guestType: 'overnight' | 'daypass' = 'overnight') => {
    setDayglowGuestType(guestType);
    setIsDayglowModalOpen(true);
  };

  // Render ONLY the designated content for the currently selected navigation menu
  const renderCurrentPage = () => {
    switch (currentSection) {
      case 'about':
        return <AboutPage />;
      case 'rooms':
        return <RoomsPage />;
      case 'amenities':
      case 'dayglow':
      case 'dining':
      case 'activities':
        return <AmenitiesPage onOpenDayglowModal={handleOpenDayglowModal} />;
      case 'gallery':
        return <GalleryPage />;
      case 'booking':
        return <BookingPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage 
            onOpenDayglowModal={handleOpenDayglowModal}
          />
        );
    }
  };

  // Presentation Mode: Dedicated full-screen 12-slide presentation
  if (isPresentationMode) {
    return <PresentationMode />;
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#0B131A] text-[#2D3436] dark:text-[#E2E8F0] font-sans antialiased selection:bg-[#006D77] selection:text-white transition-colors duration-200 flex flex-col justify-between">
      {/* Offline Mode Indicator Bar */}
      {isOfflineMode && (
        <div className="bg-[#006D77] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 border-b border-teal-900 shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-[#83C5BE] animate-pulse" />
              <span>
                <strong>Offline Travel Mode Active:</strong> All your reservations, itineraries, and emergency guides are loaded locally.
              </span>
            </span>
            <button
              onClick={toggleOfflineMode}
              className="text-[11px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm uppercase tracking-wider font-bold transition cursor-pointer"
            >
              Resume Online
            </button>
          </div>
        </div>
      )}

      {/* Public Guest Website Layout */}
      {!isAdminOpen ? (
        <>
          <Header onOpenAdmin={() => setIsAdminOpen(true)} />
          
          {/* Main Container - Displays ONLY the active page content */}
          <main className="flex-1 w-full">
            {renderCurrentPage()}
          </main>

          <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Interactive Modals & Floating Widgets */}
          <DayglowBookingModal
            isOpen={isDayglowModalOpen}
            onClose={() => setIsDayglowModalOpen(false)}
            defaultGuestType={dayglowGuestType}
          />
          <OfflineItineraryModal />
          <AuthModal />
          <LiveChatWidget />
        </>
      ) : (
        /* Staff / Manager Admin Portal */
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <ResortProvider>
      <ResortAppContent />
    </ResortProvider>
  );
}

export default App;
