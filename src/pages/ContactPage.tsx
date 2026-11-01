import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { RESORT_INFO, RESORT_IMAGES } from '../data/resortData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Compass, 
  Car, 
  Plane, 
  Bus, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addNotification, navigateTo } = useResort();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('General Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitted(true);
    addNotification(
      'Inquiry Dispatched',
      `Thank you, ${formName}! Our Sipalay concierge team will respond to ${formEmail} within 2 hours.`,
      'alert'
    );

    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'What are the official check-in and check-out times?',
      a: 'Standard check-in begins at 2:00 PM, and check-out is at 12:00 PM. Early check-in or late check-out is accommodated based on availability. You are welcome to store your luggage at the front desk and relax on our beachfront daybeds or enjoy Soul Beach Cafe while your room is prepared.'
    },
    {
      q: 'How fast and reliable is the internet connection for remote work?',
      a: 'We provide complimentary high-speed Starlink satellite Wi-Fi (averaging 150+ Mbps) covering all 12 rooms, private verandas, and the sunset dining deck. Our automatic backup diesel generator ensures uninterrupted power and connectivity 24/7.'
    },
    {
      q: 'How do non-staying day visitors access the resort and Dayglow experience?',
      a: 'Day visitors are warmly welcomed to book the Aninag Dayglow & Paddle Experience (₱1,200/pair) or dine at Soul Beach Cafe. We recommend reserving time slots in advance online or by calling our concierge to ensure exclusive uncrowded water access.'
    },
    {
      q: 'Are pets allowed at Alon & Aninag?',
      a: 'Yes! We are a pet-friendly boutique sanctuary. Well-behaved fur babies are welcome in our ground-level Alon Oceanfront Suites and outdoor dining areas. Please let us know in advance during booking so we can prepare pet bowls and towels.'
    },
    {
      q: 'What payment methods do you accept at the resort?',
      a: 'We accept GCash, Maya, Visa, Mastercard, JCB, direct Philippine bank transfers (BDO, BPI), and cash at the front desk. Sipalay City also has local bank ATMs within a 5-minute walk from our resort.'
    },
    {
      q: 'What is the resort cancellation and date modification policy?',
      a: 'Cancellations made 7 or more days prior to your scheduled check-in date receive a 100% full refund of any deposit paid. For typhoon weather warnings (Signal #1 or higher), date rebooking is complimentary with no penalty.'
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title="Contact Us & Travel Guide"
        subtitle="Located along Poblacion Beach, Sipalay City. Reach out for room bookings, Dayglow passes, private van shuttles, or general questions."
        badge="24/7 Front Desk & Concierge Hotline"
        bgImage={RESORT_IMAGES.hero}
      />

      {/* 1. Contact Info Cards */}
      <section className="py-16 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone & Mobile */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-1">
                  Phone & Mobile
                </h4>
                <p className="text-xs text-stone-500 font-light mb-3">
                  Direct call, SMS, or WhatsApp
                </p>
                <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white space-y-1">
                  <div>+63 917 582 2566</div>
                  <div className="text-stone-500 font-normal">(034) 473-2026 (Landline)</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                Available 24 Hours / 7 Days
              </div>
            </div>

            {/* Email Addresses */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-1">
                  Email Concierge
                </h4>
                <p className="text-xs text-stone-500 font-light mb-3">
                  Inquiries, bookings & buyouts
                </p>
                <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white space-y-1">
                  <div className="truncate">stay@alonaninag-resort.ph</div>
                  <div className="text-stone-500 font-normal text-xs truncate">concierge@alonaninag-resort.ph</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                Average reply time: under 2 hrs
              </div>
            </div>

            {/* Physical Address */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-1">
                  Resort Location
                </h4>
                <p className="text-xs text-stone-500 font-light mb-3">
                  Poblacion Beachfront
                </p>
                <div className="text-xs text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                  Poblacion Beach (near Jazz Inn & Baywalk), Sipalay City, Negros Occidental 6111
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                GPS: 9.7523° N, 122.4042° E
              </div>
            </div>

            {/* Reception Desk Hours */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-1">
                  Operating Hours
                </h4>
                <p className="text-xs text-stone-500 font-light mb-3">
                  Front desk & Soul Cafe
                </p>
                <div className="text-xs text-stone-800 dark:text-stone-200 font-medium space-y-1">
                  <div><strong>Front Desk:</strong> 24 Hours / 7 Days</div>
                  <div><strong>Soul Beach Cafe:</strong> 6:30 AM - 10 PM</div>
                  <div><strong>Dayglow Paddle:</strong> 8 AM - 5:30 PM</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                Night security on duty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Message Form & Location Map Grid */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-6 bg-[#F8F5F2] dark:bg-[#131F2A] p-8 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE] mb-1">
                  Send a Direct Message
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white">
                  How Can We Help You?
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light mt-1">
                  Whether you have questions about room availability, airport shuttle bookings, or special event buyouts, we will respond promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Camille Tan"
                      className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. camille@example.com"
                      className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+63 917 555 9012"
                      className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                    >
                      <option value="General Inquiry">General Question</option>
                      <option value="Room Booking">Room Booking / Dates</option>
                      <option value="Dayglow Pass">Aninag Dayglow Pass</option>
                      <option value="Resort Buyout">Private Event / 12-Room Buyout</option>
                      <option value="Airport Shuttle">Airport Van Transfer Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your travel dates, party size, or any specific requests..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full py-3.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Message Sent! Our team will contact you shortly.</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry to Concierge</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Interactive Location / Map Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-lg bg-stone-100 dark:bg-stone-800 aspect-16/10 relative">
                {/* Embed Map View */}
                <iframe
                  title="Alon Aninag Sipalay Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=122.3900%2C9.7450%2C122.4150%2C9.7600&layer=mapnik&marker=9.7523%2C122.4042"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                
                {/* Marker Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#131F2A]/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg text-xs">
                  <div className="flex items-center gap-2 text-[#006D77] dark:text-[#83C5BE] font-bold">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Alon & Aninag Boutique Resort Frontage</span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 mt-1">
                    Direct beachfront on Poblacion Beach. 5 minutes from Sipalay City Public Terminal.
                  </p>
                </div>
              </div>

              {/* Nearby Landmarks Card */}
              <div className="p-6 rounded-2xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 space-y-3">
                <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white">
                  Walking Distance & Nearby Landmarks
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300 font-light">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#006D77] font-bold">•</span>
                    <span>Poblacion Beach Sand: <strong>0 meters</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#006D77] font-bold">•</span>
                    <span>Sipalay Baywalk: <strong>2 mins walk</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#006D77] font-bold">•</span>
                    <span>Jazz Inn: <strong>Next door</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#006D77] font-bold">•</span>
                    <span>City Public Terminal: <strong>5 mins ride</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Getting to Sipalay City Travel Guide */}
      <section className="py-20 bg-[#FAF7F2] dark:bg-[#0B131A] border-b border-[#E8DFC8] dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
              Transit Directions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight mb-4">
              How to Get to Alon & Aninag
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Sipalay City is easily reached via direct flights to either Bacolod or Dumaguete, followed by a scenic coastal road trip along the South National Highway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Route 1: From Bacolod */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE]">
                  Via Bacolod City (BCD)
                </div>
                <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-white">
                  Bacolod-Silay Airport • 3.5–4 Hours
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                  Fly into Bacolod-Silay Airport. Head to Bacolod South Ceres Terminal and take an air-conditioned Ceres Liner bus direct to Sipalay (departures every 30 mins). Alternatively, request our private resort van shuttle (₱3,800).
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
                Scenic countryside route passing Kabankalan and Ilog.
              </div>
            </div>

            {/* Route 2: From Dumaguete */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#E29578]/15 text-[#E29578] flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#E29578]">
                  Via Dumaguete City (DGT)
                </div>
                <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-white">
                  Dumaguete-Sibulan Airport • ~3.5 Hours
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                  Fly into Dumaguete-Sibulan Airport. Board a Ceres bus bound for Hinoba-an or Sipalay via Bayawan City. The route traverses the rugged coastline of Southern Negros with panoramic sea views throughout.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
                Private airport van pick-up is also available upon request.
              </div>
            </div>

            {/* Route 3: Upon Arrival in Sipalay */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center">
                  <Bus className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE]">
                  Local Arrival in Sipalay
                </div>
                <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-white">
                  Sipalay Public Terminal • 5 Mins
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                  Upon arriving at the Sipalay City Ceres Terminal, hire a local motorized tricycle (₱15–₱20 per passenger) and ask for <strong>"Alon & Aninag Resort sa Poblacion Beach, tupad sang Jazz Inn."</strong> The driver will drop you right at our front entrance.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
                Paved road access all the way to our beach entrance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Accordion */}
      <section className="py-20 bg-white dark:bg-[#0E1720] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Guest Clarity</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 font-light">
              Clear answers regarding bookings, arrival, internet speeds, and resort guidelines.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-[#F8F5F2] dark:bg-[#131F2A] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base font-medium text-stone-900 dark:text-white">
                      {faq.q}
                    </span>
                    <span className="text-stone-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed border-t border-stone-200/60 dark:border-stone-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom booking prompt */}
          <div className="mt-12 text-center pt-8 border-t border-stone-200 dark:border-stone-800">
            <p className="text-xs sm:text-sm text-stone-500 mb-4">
              Have another question not answered here? Call our 24/7 front desk at <strong>+63 917 582 2566</strong>
            </p>
            <button
              onClick={() => navigateTo('booking')}
              className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
            >
              Ready to Book? Reserve Online Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
