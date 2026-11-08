import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { ROOMS_DATA, BOOKING_ADDONS, RESORT_INFO, RESORT_IMAGES } from '../data/resortData';
import { Room, BookingAddon, Reservation } from '../types';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Users, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowLeft, 
  DollarSign, 
  Smartphone, 
  Search,
  Bed,
  CheckCircle2,
  Clock,
  Printer
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const {
    activeBookingModalRoomId,
    createBooking,
    formatPrice,
    currentUser,
    reservations,
    cancelBooking,
    lastConfirmedBooking,
    setLastConfirmedBooking,
    navigateTo,
    t
  } = useResort();

  const [activeTab, setActiveTab] = useState<'new' | 'lookup'>('new');

  // Selected Room
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    activeBookingModalRoomId || ROOMS_DATA[0].id
  );

  useEffect(() => {
    if (activeBookingModalRoomId) {
      setSelectedRoomId(activeBookingModalRoomId);
    }
  }, [activeBookingModalRoomId]);

  const selectedRoom: Room = ROOMS_DATA.find(r => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Wizard Step: 1 = Dates & Room, 2 = Add-ons, 3 = Guest Info, 4 = Payment & Confirmation
  const [step, setStep] = useState<number>(lastConfirmedBooking ? 4 : 1);

  // Dates
  const todayStr = new Date().toISOString().split('T')[0];
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 2);
  const nextDayStr = nextDay.toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(todayStr);
  const [checkOutDate, setCheckOutDate] = useState<string>(nextDayStr);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<BookingAddon[]>([]);

  // Guest Details
  const [firstName, setFirstName] = useState<string>(currentUser?.firstName || 'Maria');
  const [lastName, setLastName] = useState<string>(currentUser?.lastName || 'Santos');
  const [email, setEmail] = useState<string>(currentUser?.email || 'maria.santos@example.com');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '+63 917 582 2566');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string>('2:00 PM - 4:00 PM');

  // Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  // Payment Selection
  const [depositOption, setDepositOption] = useState<'30_percent' | 'full'>('30_percent');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Maya' | 'Card' | 'Bank Transfer' | 'Cash at Check-In'>('GCash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(lastConfirmedBooking);

  // Lookup state
  const [lookupRef, setLookupRef] = useState<string>('');
  const [foundReservation, setFoundReservation] = useState<Reservation | null>(null);
  const [lookupError, setLookupError] = useState<string>('');

  // Calculate nights
  const calculateNights = (): number => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();

  // Price Calculations
  const roomBasePrice = selectedRoom.pricePHP * nights * roomCount;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.pricePHP, 0);
  const subtotal = roomBasePrice + addonsTotal;
  const discountAmount = Math.round((subtotal * promoDiscountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount);
  const depositRequired = depositOption === '30_percent' ? Math.round(totalAmount * 0.3) : totalAmount;
  const balanceDue = totalAmount - depositRequired;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'ALON10' || code === 'SOULSUNSET') {
      setAppliedPromo(code);
      setPromoDiscountPercent(10);
      setPromoMessage(t('promoApplied', 'Promo Code Applied: 10% Discount'));
    } else if (code === 'GLOW20' || code === 'SIPALAY20') {
      setAppliedPromo(code);
      setPromoDiscountPercent(20);
      setPromoMessage('20% Flash Promo applied!');
    } else {
      setAppliedPromo('');
      setPromoDiscountPercent(0);
      setPromoMessage('Invalid promo code. Try ALON10 or SOULSUNSET');
    }
  };

  const toggleAddon = (addon: BookingAddon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);

    try {
      const newReservation = await createBooking({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        guestName: `${firstName} ${lastName}`.trim() || 'Valued Guest',
        firstName: firstName || 'Valued',
        lastName: lastName || 'Guest',
        email: email || 'guest@example.com',
        phone: phone || '+63 917 000 0000',
        checkInDate,
        checkOutDate,
        nights,
        adults,
        children: childrenCount,
        roomCount,
        selectedAddons,
        specialRequests,
        dietaryRequirements,
        estimatedArrivalTime,
        promoCodeApplied: appliedPromo || undefined,
        discountAmountPHP: discountAmount,
        totalAmountPHP: totalAmount,
        depositPaidPHP: depositRequired,
        balanceDuePHP: balanceDue,
        paymentMethod,
        paymentStatus: depositOption === 'full' ? 'Fully Paid' : 'Paid Deposit',
        bookingStatus: 'Confirmed'
      });

      setConfirmedReservation(newReservation);
      setLastConfirmedBooking(newReservation);
      setStep(4);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe confetti fallback
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    const ref = lookupRef.trim().toUpperCase();
    if (!ref) return;

    const res = reservations.find(r => r.referenceNumber.toUpperCase() === ref);
    if (res) {
      setFoundReservation(res);
    } else {
      setFoundReservation(null);
      setLookupError(`No reservation found matching "${ref}". Please check your confirmation email.`);
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title={t('bookingPageTitle', 'Reservations & Booking')}
        subtitle={t('bookingPageSubtitle', 'Direct booking with instant confirmation, flexible cancellation, and guaranteed lowest rates for your Sipalay beachfront retreat.')}
        badge={t('bookingPageBadge', 'Direct Booking Guarantee')}
        bgImage={RESORT_IMAGES.hero}
      />

      {/* Mode Switcher Tabs */}
      <section className="py-6 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveTab('new'); if (confirmedReservation) setStep(4); }}
                className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-2 ${
                  activeTab === 'new'
                    ? 'bg-[#006D77] text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('tabMakeReservation', 'Make a Reservation')}</span>
              </button>
              <button
                onClick={() => setActiveTab('lookup')}
                className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-2 ${
                  activeTab === 'lookup'
                    ? 'bg-[#006D77] text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t('tabLookupReservation', 'Find Existing Booking')}</span>
              </button>
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE]" />
              <span>{t('bestRateGuarantee', 'Direct Booking Best Rate Guarantee')} • {t('freeCancellation', 'Flexible 48-Hour Cancellation')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Area */}
      <section className="py-16 bg-[#F8F5F2] dark:bg-[#0B131A] min-h-[70vh] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'lookup' ? (
            /* Reservation Lookup Tab */
            <div className="max-w-2xl mx-auto bg-white dark:bg-[#131F2A] p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-white mb-1">
                  {t('lookupTitle', 'Find Your Reservation')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
                  {t('lookupSubtitle', 'Enter your booking reference number or email address to view your itinerary and voucher.')}
                </p>
              </div>

              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="text"
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  placeholder={t('lookupRefPlaceholder', 'e.g. ALON-2026-8192')}
                  className="flex-1 px-4 py-3 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1720] text-sm text-stone-900 dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#006D77]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                >
                  {t('lookupBtn', 'Search Booking')}
                </button>
              </form>

              {lookupError && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs">
                  {lookupError}
                </div>
              )}

              {foundReservation && (
                <div className="p-6 rounded-xl bg-stone-50 dark:bg-[#0E1720] border border-stone-200 dark:border-stone-800 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{t('refNumberLabel', 'Booking Reference Number')}</span>
                      <div className="font-mono text-lg font-bold text-[#006D77] dark:text-[#83C5BE]">
                        {foundReservation.referenceNumber}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                      {foundReservation.bookingStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 block">{t('firstName', 'Guest Name')}</span>
                      <strong className="text-stone-800 dark:text-stone-200">{foundReservation.guestName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">{t('roomCategory', 'Room')}</span>
                      <strong className="text-stone-800 dark:text-stone-200">{foundReservation.roomName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">{t('checkIn', 'Dates')}</span>
                      <strong className="text-stone-800 dark:text-stone-200">
                        {foundReservation.checkInDate} to {foundReservation.checkOutDate} ({foundReservation.nights} {t('nights', 'nights')})
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">{t('totalAmount', 'Total Amount')}</span>
                      <strong className="text-[#006D77] dark:text-[#83C5BE]">
                        {formatPrice(foundReservation.totalAmountPHP)} ({foundReservation.paymentStatus})
                      </strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center text-xs">
                    <span className="text-stone-500">Need assistance?</span>
                    <button
                      onClick={() => {
                        cancelBooking(foundReservation.id);
                        setFoundReservation({ ...foundReservation, bookingStatus: 'Cancelled' });
                      }}
                      className="text-red-600 hover:underline font-semibold cursor-pointer"
                    >
                      {t('cancelBookingBtn', 'Cancel Reservation')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : step === 4 && confirmedReservation ? (
            /* Step 4: Confirmed E-Voucher */
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-normal text-stone-900 dark:text-white">
                  {t('successBookingTitle', 'Booking Successfully Confirmed!')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  {t('successBookingMsg', 'We have sent your official E-Voucher and booking confirmation to')} <strong>{confirmedReservation.email}</strong>.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="bg-white dark:bg-[#131F2A] rounded-2xl border-2 border-[#006D77]/30 dark:border-[#83C5BE]/30 shadow-xl overflow-hidden p-6 sm:p-10 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#006D77] text-white flex items-center justify-center font-bold text-lg">
                      🌊
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                        ALON & ANINAG
                      </h4>
                      <span className="text-[10px] tracking-widest uppercase text-[#006D77] dark:text-[#83C5BE] font-semibold">
                        {t('heroSubtitle', 'Boutique Beach Resort')} • E-Voucher
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase tracking-wider text-stone-400">{t('refNumberLabel', 'Booking Reference')}</div>
                    <div className="font-mono text-xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                      {confirmedReservation.referenceNumber}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#0E1720]">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('firstName', 'Primary Guest')}</span>
                    <div className="font-bold text-stone-900 dark:text-white mt-0.5">{confirmedReservation.guestName}</div>
                    <div className="text-stone-500 text-[11px]">{confirmedReservation.phone}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#0E1720]">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('roomCategory', 'Room Category')}</span>
                    <div className="font-bold text-stone-900 dark:text-white mt-0.5">{confirmedReservation.roomName}</div>
                    <div className="text-stone-500 text-[11px]">{confirmedReservation.adults} {t('adults', 'Adults')}, {confirmedReservation.children} {t('children', 'Children')}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#0E1720]">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('checkIn', 'Check-In / Out')}</span>
                    <div className="font-bold text-stone-900 dark:text-white mt-0.5">{confirmedReservation.checkInDate}</div>
                    <div className="text-stone-500 text-[11px]">to {confirmedReservation.checkOutDate} ({confirmedReservation.nights} {t('nights', 'nights')})</div>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#0E1720]">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('paymentMethod', 'Payment Status')}</span>
                    <div className="font-bold text-[#006D77] dark:text-[#83C5BE] mt-0.5">{confirmedReservation.paymentStatus}</div>
                    <div className="text-stone-500 text-[11px]">Method: {confirmedReservation.paymentMethod}</div>
                  </div>
                </div>

                {/* Price Breakdown in Voucher */}
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#0E1720] border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">{t('totalAmount', 'Total Booking Value')}:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{formatPrice(confirmedReservation.totalAmountPHP)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">{t('depositDueNow', 'Amount Paid (Deposit / Full)')}:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{formatPrice(confirmedReservation.depositPaidPHP)}</span>
                  </div>
                  {confirmedReservation.balanceDuePHP > 0 && (
                    <div className="flex justify-between pt-1 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                      <span>{t('balanceDueCheckIn', 'Remaining Balance at Check-In')}:</span>
                      <span className="font-bold text-stone-900 dark:text-white">{formatPrice(confirmedReservation.balanceDuePHP)}</span>
                    </div>
                  )}
                </div>

                {/* Arrival & Concierge Notes */}
                <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
                  <div><strong>{t('checkIn', 'Check-In')}:</strong> 2:00 PM • <strong>{t('checkOut', 'Check-Out')}:</strong> 12:00 PM</div>
                  <div><strong>{t('address', 'Address')}:</strong> {t('resortAddress', 'Poblacion Beach, Sipalay City, Negros Occidental')}</div>
                  <div><strong>{t('phone', 'Phone')}:</strong> +63 917 582 2566</div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-bold rounded-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t('btnPrintVoucher', 'Print / Save Voucher')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setConfirmedReservation(null);
                      setStep(1);
                    }}
                    className="px-6 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                  >
                    {t('btnBookAnother', 'Make Another Booking')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Step Booking Form + Live Sticky Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Booking Form Steps */}
              <div className="lg:col-span-8 bg-white dark:bg-[#131F2A] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sm:p-10 space-y-8">
                {/* Step Indicators */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-5">
                  {[
                    { num: 1, label: t('step1Label', '1. Dates & Room') },
                    { num: 2, label: t('step2Label', '2. Add-ons') },
                    { num: 3, label: t('step3Label', '3. Guest Details') },
                    { num: 4, label: t('step4Label', '4. Confirmation') }
                  ].map((s) => (
                    <div 
                      key={s.num} 
                      onClick={() => { if (step > s.num) setStep(s.num); }}
                      className={`flex items-center gap-2 cursor-pointer ${
                        step === s.num ? 'text-[#006D77] dark:text-[#83C5BE] font-bold' : step > s.num ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === s.num ? 'bg-[#006D77] text-white' : step > s.num ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-stone-100 dark:bg-stone-800'
                      }`}>
                        {step > s.num ? '✓' : s.num}
                      </div>
                      <span className="text-xs uppercase tracking-wider hidden sm:inline">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* STEP 1: Dates & Room */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('checkInLabel', 'Check-In Date')}
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          min={todayStr}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('checkOutLabel', 'Check-Out Date')}
                        </label>
                        <input
                          type="date"
                          value={checkOutDate}
                          min={checkInDate || todayStr}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('adultsLabel', 'Adults (Ages 12+)')}
                        </label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white"
                        >
                          {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {t('adults', 'Adults')}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('childrenLabel', 'Children (Under 12)')}
                        </label>
                        <select
                          value={childrenCount}
                          onChange={(e) => setChildrenCount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white"
                        >
                          {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {t('children', 'Children')}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('roomsCountLabel', 'Number of Rooms')}
                        </label>
                        <select
                          value={roomCount}
                          onChange={(e) => setRoomCount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white"
                        >
                          {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {t('roomCategory', 'Room')}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Room Selector Cards */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        {t('chooseRoomTitle', 'Select Your Boutique Room')}:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ROOMS_DATA.map((room) => {
                          const isSelected = selectedRoomId === room.id;
                          return (
                            <div
                              key={room.id}
                              onClick={() => setSelectedRoomId(room.id)}
                              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected 
                                  ? 'border-[#006D77] dark:border-[#83C5BE] bg-teal-50/50 dark:bg-teal-950/30' 
                                  : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="aspect-16/9 rounded-lg overflow-hidden bg-stone-200">
                                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase text-[#006D77] dark:text-[#83C5BE]">
                                    {room.displayCategory || (room.category === 'Standard' || room.category === 'Loft' ? 'Barkada Lofts — 4 Standard Rooms' : `${room.category} • Beachfront`)}
                                  </span>
                                  <span className="text-[10px] text-stone-500">{room.availableUnits} {t('unitsAvailable', 'left')}</span>
                                </div>
                                <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white leading-tight">
                                  {room.name}
                                </h4>
                                <div className="text-xs font-bold text-[#006D77] dark:text-[#83C5BE]">
                                  {formatPrice(room.pricePHP)} <span className="text-[10px] text-stone-400 font-normal">{t('perNightLabel', '/ night')}</span>
                                </div>
                              </div>

                              <div className="mt-3 pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                                <span className="text-stone-500 font-light">{t('upToGuests', 'Up to')} {room.capacity.maxTotal} {t('guestsCount', 'guests')}</span>
                                {isSelected ? (
                                  <span className="text-[#006D77] dark:text-[#83C5BE] font-bold flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> Selected
                                  </span>
                                ) : (
                                  <span className="text-stone-400">{t('viewRoomDetailsBtn', 'Select')}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer flex items-center gap-2"
                      >
                        <span>{t('nextStep', 'Continue to Add-ons')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Add-ons & Experiences */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h4 className="font-serif text-xl font-normal text-stone-900 dark:text-white mb-1">
                        {t('addonsTitle', 'Enhance Your Sipalay Experience')}
                      </h4>
                      <p className="text-xs text-stone-500 font-light">
                        {t('addonsSubtitle', 'Curated add-ons to make your coastal retreat unforgettable.')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {BOOKING_ADDONS.map((addon) => {
                        const isAdded = selectedAddons.some(a => a.id === addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                              isAdded 
                                ? 'border-[#006D77] dark:border-[#83C5BE] bg-teal-50/50 dark:bg-teal-950/30' 
                                : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                            }`}
                          >
                            <div className="space-y-1">
                              <h5 className="font-serif text-sm font-semibold text-stone-900 dark:text-white">
                                {addon.name}
                              </h5>
                              <p className="text-xs text-stone-500 font-light max-w-lg">
                                {addon.description}
                              </p>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="font-serif text-sm font-bold text-[#006D77] dark:text-[#83C5BE]">
                                +{formatPrice(addon.pricePHP)}
                              </div>
                              <span className={`text-[11px] font-bold uppercase tracking-wider mt-1 block ${
                                isAdded ? 'text-[#006D77] dark:text-[#83C5BE]' : 'text-stone-400'
                              }`}>
                                {isAdded ? 'Added ✓' : '+ Add'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                      >
                        {t('back', 'Back')}
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer flex items-center gap-2"
                      >
                        <span>{t('nextStep', 'Continue to Guest Details')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Guest Details */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h4 className="font-serif text-xl font-normal text-stone-900 dark:text-white mb-1">
                        {t('guestInfoTitle', 'Guest Information & Payment')}
                      </h4>
                      <p className="text-xs text-stone-500 font-light">
                        {t('specialRequestsLabel', 'We use this to prepare your room keycard and coordinate your arrival.')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('firstNameLabel', 'First Name')} *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('lastNameLabel', 'Last Name')} *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('emailLabel', 'Email Address')} *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          {t('phoneLabel', 'Mobile Number / WhatsApp')} *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          Estimated Arrival Time
                        </label>
                        <select
                          value={estimatedArrivalTime}
                          onChange={(e) => setEstimatedArrivalTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white"
                        >
                          <option value="12:00 PM - 2:00 PM">Early Arrival (12:00 PM - 2:00 PM)</option>
                          <option value="2:00 PM - 4:00 PM">Standard Check-In (2:00 PM - 4:00 PM)</option>
                          <option value="4:00 PM - 6:00 PM">Sunset Arrival (4:00 PM - 6:00 PM)</option>
                          <option value="6:00 PM onwards">Late Evening (After 6:00 PM)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                          Dietary Preferences
                        </label>
                        <input
                          type="text"
                          value={dietaryRequirements}
                          onChange={(e) => setDietaryRequirements(e.target.value)}
                          placeholder="e.g. Vegetarian, Shellfish allergy, Halal"
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        {t('specialRequestsLabel', 'Special Requests or Celebrations')}
                      </label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Celebrating an anniversary, birthday, quiet room preference, or airport shuttle coordination..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#006D77]"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                      >
                        {t('back', 'Back')}
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer flex items-center gap-2"
                      >
                        <span>{t('nextStep', 'Review & Confirm Payment')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4 (Review & Payment) */}
                {step === 4 && !confirmedReservation && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h4 className="font-serif text-xl font-normal text-stone-900 dark:text-white mb-1">
                        {t('paymentChoiceTitle', 'Payment Schedule')}
                      </h4>
                      <p className="text-xs text-stone-500 font-light">
                        {t('paymentMethodTitle', 'Select Payment Method')}
                      </p>
                    </div>

                    {/* Deposit Option */}
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => setDepositOption('30_percent')}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                          depositOption === '30_percent' 
                            ? 'border-[#006D77] bg-teal-50/50 dark:bg-teal-950/30' 
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-900 dark:text-white">{t('payDepositOption', 'Pay 30% Deposit')}</div>
                        <div className="text-xs text-[#006D77] dark:text-[#83C5BE] font-bold mt-1">
                          {formatPrice(Math.round(totalAmount * 0.3))}
                        </div>
                        <div className="text-[10px] text-stone-400 mt-1">{t('balanceDueCheckIn', 'Pay remaining balance upon check-in')}</div>
                      </div>

                      <div
                        onClick={() => setDepositOption('full')}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                          depositOption === 'full' 
                            ? 'border-[#006D77] bg-teal-50/50 dark:bg-teal-950/30' 
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-900 dark:text-white">{t('payFullOption', 'Pay Full 100% Amount Now')}</div>
                        <div className="text-xs text-[#006D77] dark:text-[#83C5BE] font-bold mt-1">
                          {formatPrice(totalAmount)}
                        </div>
                        <div className="text-[10px] text-stone-400 mt-1">Express check-in & priority allocation</div>
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        {t('paymentMethodTitle', 'Select Payment Method')}:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['GCash', 'Maya', 'Card', 'Cash at Check-In'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPaymentMethod(m as any)}
                            className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                              paymentMethod === m
                                ? 'bg-[#006D77] text-white border-[#006D77]'
                                : 'bg-stone-50 dark:bg-[#0E1720] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                      🔒 <strong>{t('bestRateGuarantee', 'Instant Booking Guarantee')}:</strong> Your reservation is immediately registered in our front desk ledger.
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        onClick={() => setStep(3)}
                        className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                      >
                        {t('back', 'Back')}
                      </button>
                      <button
                        onClick={handleCompleteBooking}
                        disabled={isProcessing}
                        className="px-8 py-3.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm shadow-md transition cursor-pointer flex items-center gap-2"
                      >
                        {isProcessing ? 'Processing...' : `${t('btnConfirmBooking', 'Confirm & Pay')} ${formatPrice(depositRequired)}`}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Live Sticky Summary Card */}
              <div className="lg:col-span-4 bg-white dark:bg-[#131F2A] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sticky top-28 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
                    {t('bookingSummaryTitle', 'Reservation Summary')}
                  </span>
                  <h4 className="font-serif text-xl font-normal text-stone-900 dark:text-white mt-1">
                    {selectedRoom.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-light mt-0.5">
                    {t(selectedRoom.view, selectedRoom.view)} • {selectedRoom.bedType}
                  </p>
                </div>

                <div className="aspect-16/9 rounded-lg overflow-hidden bg-stone-200">
                  <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover" />
                </div>

                {/* Dates & Guests Details */}
                <div className="space-y-2 text-xs border-y border-stone-200 dark:border-stone-800 py-4 text-stone-600 dark:text-stone-300">
                  <div className="flex justify-between">
                    <span>{t('checkIn', 'Dates')}:</span>
                    <strong>{checkInDate} → {checkOutDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('duration', 'Duration')}:</span>
                    <strong>{nights} {nights > 1 ? t('nights', 'Nights') : t('night', 'Night')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('guests', 'Guests')}:</span>
                    <strong>{adults} {t('adults', 'Adults')}{childrenCount > 0 ? `, ${childrenCount} ${t('children', 'Children')}` : ''}</strong>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{t('addonsTotal', 'Selected Add-ons')}:</span>
                      {selectedAddons.map(a => (
                        <div key={a.id} className="flex justify-between text-[11px]">
                          <span className="truncate max-w-[180px]">{a.name}</span>
                          <span>+{formatPrice(a.pricePHP)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    {t('promoCodeLabel', 'Promo Code')}:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="e.g. ALON10"
                      className="flex-1 px-3 py-1.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0E1720] text-xs uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase rounded-sm cursor-pointer"
                    >
                      {t('applyPromoBtn', 'Apply')}
                    </button>
                  </div>
                  {promoMessage && (
                    <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                      {promoMessage}
                    </div>
                  )}
                </div>

                {/* Total Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>{t('roomTotal', 'Room Accommodation')} ({nights} {t('nights', 'nights')}):</span>
                    <span>{formatPrice(roomBasePrice)}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-stone-500">
                      <span>{t('addonsTotal', 'Add-ons Total')}:</span>
                      <span>+{formatPrice(addonsTotal)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-teal-600 dark:text-teal-400 font-semibold">
                      <span>{t('discountLabel', 'Promotional Discount')} ({promoDiscountPercent}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span>{t('totalAmount', 'Total Amount')}:</span>
                    <span className="text-[#006D77] dark:text-[#83C5BE]">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
                    <span>{t('depositDueNow', 'Deposit Due Today')}:</span>
                    <span>{formatPrice(depositRequired)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
