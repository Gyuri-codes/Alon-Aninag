import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ROOMS_DATA } from '../data/resortData';
import { 
  Users, 
  BedDouble, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  LogOut, 
  Waves,
  Sun,
  Award,
  Sparkles,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { 
    reservations, 
    formatPrice, 
    updateBookingStatus, 
    weather, 
    currentUser, 
    addNotification 
  } = useResort();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedResId, setSelectedResId] = useState<string | null>(null);

  // Computed metrics
  const totalRevenuePHP = reservations.reduce((sum, r) => sum + (r.bookingStatus !== 'Cancelled' ? r.totalAmountPHP : 0), 0);
  const totalNightsBooked = reservations.reduce((sum, r) => sum + r.nights, 0);
  const confirmedCount = reservations.filter(r => r.bookingStatus === 'Confirmed').length;
  const checkedInCount = reservations.filter(r => r.bookingStatus === 'Checked-In').length;

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch = 
      r.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.roomName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || r.bookingStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = 'Reference,Guest Name,Room,CheckIn,CheckOut,Nights,Amount,Status,Payment\n';
    const rows = reservations.map(r => 
      `"${r.referenceNumber}","${r.guestName}","${r.roomName}","${r.checkInDate}","${r.checkOutDate}",${r.nights},${r.totalAmountPHP},"${r.bookingStatus}","${r.paymentStatus}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Alon_Aninag_Guest_Manifest_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addNotification('CSV Exported', 'Guest manifest spreadsheet generated and downloaded.', 'booking');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4EDE0] dark:bg-[#080E14] overflow-y-auto animate-fadeIn flex flex-col transition-colors">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#2C241D] dark:bg-[#0E1720] text-white px-6 py-4 border-b border-[#524436] dark:border-stone-800 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold text-lg">
            🌊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold">Alon Aninag Resort Manager Portal</h1>
              <span className="text-[10px] bg-[#E4A853] text-[#2C241D] font-bold px-2 py-0.5 rounded-full uppercase">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-[#DDD0B9]">
              Poblacion Beach, Sipalay City • Logged in as: {currentUser?.name || 'Duty General Manager'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-white/20"
          >
            <Download className="w-3.5 h-3.5 text-[#E4A853]" />
            <span className="hidden sm:inline">Export Guest Manifest</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#E4A853] hover:bg-[#D49843] text-[#2C241D] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#131F2A] p-5 rounded-3xl border border-[#E5DAC4] dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#8C7B68] dark:text-stone-400 mb-2">
              <span className="font-bold uppercase tracking-wider">Total Season Revenue</span>
              <TrendingUp className="w-4 h-4 text-[#2A9D8F]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241D] dark:text-white">
              {formatPrice(totalRevenuePHP)}
            </div>
            <span className="text-[11px] text-[#2A9D8F] dark:text-[#83C5BE] font-semibold mt-1 block">
              +18.4% vs last Sipalay dry season
            </span>
          </div>

          <div className="bg-white dark:bg-[#131F2A] p-5 rounded-3xl border border-[#E5DAC4] dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#8C7B68] dark:text-stone-400 mb-2">
              <span className="font-bold uppercase tracking-wider">Active Reservations</span>
              <Calendar className="w-4 h-4 text-[#C88A32]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241D] dark:text-white">
              {reservations.length} Bookings
            </div>
            <span className="text-[11px] text-[#8C7B68] dark:text-stone-400 mt-1 block">
              {confirmedCount} Confirmed • {checkedInCount} In-House
            </span>
          </div>

          <div className="bg-white dark:bg-[#131F2A] p-5 rounded-3xl border border-[#E5DAC4] dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#8C7B68] dark:text-stone-400 mb-2">
              <span className="font-bold uppercase tracking-wider">Occupancy Rate</span>
              <BedDouble className="w-4 h-4 text-[#508991]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241D] dark:text-white">
              75.0%
            </div>
            <span className="text-[11px] text-[#508991] dark:text-[#83C5BE] font-semibold mt-1 block">
              15 of 20 Boutique Rooms Occupied
            </span>
          </div>

          <div className="bg-white dark:bg-[#131F2A] p-5 rounded-3xl border border-[#E5DAC4] dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#8C7B68] dark:text-stone-400 mb-2">
              <span className="font-bold uppercase tracking-wider">Sipalay Coast Conditions</span>
              <Sun className="w-4 h-4 text-[#E4A853]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241D] dark:text-white">
              {weather.tempC}°C • {weather.condition}
            </div>
            <span className="text-[11px] text-[#8C7B68] dark:text-stone-400 mt-1 block">
              Sunset: {weather.sunsetTime} • Low Tide Diving: Perfect
            </span>
          </div>
        </div>

        {/* 24-Accommodation Inventory Live Status Grid */}
        <div className="bg-white dark:bg-[#131F2A] rounded-3xl p-6 border border-[#E5DAC4] dark:border-stone-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2C241D] dark:text-white">
                Room Inventory & Housekeeping Status (24 Accommodations Total)
              </h3>
              <p className="text-xs text-[#8C7B68] dark:text-stone-400">Real-time room occupancy and turn-down status</p>
            </div>
            <span className="text-xs font-bold text-[#2A9D8F] dark:text-[#83C5BE] bg-[#2A9D8F]/10 dark:bg-[#2A9D8F]/20 px-3 py-1 rounded-full">
              Full Front Desk Sync
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ROOMS_DATA.map((room, idx) => {
              const isOccupied = idx % 2 === 0;
              return (
                <div
                  key={room.id}
                  className={`p-3 rounded-2xl border text-xs transition ${
                    isOccupied
                      ? 'bg-[#FAF7F2] dark:bg-[#0E1720] border-[#C88A32] dark:border-[#C88A32]/60'
                      : 'bg-green-50/60 dark:bg-emerald-950/30 border-green-200 dark:border-emerald-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#2C241D] dark:text-white">Room {idx + 101}</span>
                    <span className={`w-2 h-2 rounded-full ${isOccupied ? 'bg-[#C88A32]' : 'bg-green-500'}`} />
                  </div>
                  <p className="text-[11px] font-medium text-[#6B5A48] dark:text-stone-300 truncate">{room.name}</p>
                  <span className={`text-[10px] font-bold block mt-1.5 ${isOccupied ? 'text-[#C88A32]' : 'text-green-700 dark:text-emerald-400'}`}>
                    {isOccupied ? 'Occupied (Checked In)' : 'Ready for Guest'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guest Reservations Management Table */}
        <div className="bg-white dark:bg-[#131F2A] rounded-3xl p-6 border border-[#E5DAC4] dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C241D] dark:text-white">
                Guest Reservations & E-Vouchers Log
              </h3>
              <p className="text-xs text-[#8C7B68] dark:text-stone-400">
                Search, inspect voucher details, or update check-in status
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8C7B68] dark:text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reference, guest name, room..."
                  className="pl-8 pr-3 py-1.5 bg-[#FAF7F2] dark:bg-stone-800 border border-[#DDD0B9] dark:border-stone-700 rounded-xl text-xs text-[#2C241D] dark:text-white w-64 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF7F2] dark:bg-stone-800 border border-[#DDD0B9] dark:border-stone-700 rounded-xl text-xs text-[#2C241D] dark:text-white font-semibold cursor-pointer focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-[#E8DFC8] dark:border-stone-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] dark:bg-[#0E1720] text-[#6B5A48] dark:text-stone-300 uppercase tracking-wider font-bold border-b border-[#E8DFC8] dark:border-stone-800">
                <tr>
                  <th className="p-3.5">Ref / Date</th>
                  <th className="p-3.5">Guest & Contact</th>
                  <th className="p-3.5">Room & Addons</th>
                  <th className="p-3.5">Stay Dates</th>
                  <th className="p-3.5">Total / Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC] dark:divide-stone-800">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-[#FAF7F2] dark:hover:bg-[#0E1720] transition">
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-[#C88A32] block">{res.referenceNumber}</span>
                      <span className="text-[10px] text-[#8C7B68] dark:text-stone-400">{new Date(res.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-[#2C241D] dark:text-white">{res.guestName}</p>
                      <p className="text-[11px] text-[#6B5A48] dark:text-stone-300">{res.email}</p>
                      <p className="text-[10px] text-[#8C7B68] dark:text-stone-400">{res.phone}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-medium text-[#2C241D] dark:text-stone-200">{res.roomName}</p>
                      <p className="text-[10px] text-[#8C7B68] dark:text-stone-400">
                        {res.adults} Adults {res.children > 0 ? `• ${res.children} Child` : ''}
                        {res.selectedAddons.length > 0 ? ` • +${res.selectedAddons.length} Addons` : ''}
                      </p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-semibold text-[#2C241D] dark:text-stone-200">{res.checkInDate} to {res.checkOutDate}</p>
                      <span className="text-[10px] text-[#8C7B68] dark:text-stone-400">{res.nights} Nights</span>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-[#2C241D] dark:text-white">{formatPrice(res.totalAmountPHP)}</p>
                      <span className="text-[10px] px-2 py-0.5 bg-green-100 dark:bg-emerald-950/60 text-green-800 dark:text-emerald-300 rounded font-semibold">
                        {res.paymentStatus} ({res.paymentMethod})
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={res.bookingStatus}
                        onChange={(e) => updateBookingStatus(res.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                          res.bookingStatus === 'Confirmed' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' :
                          res.bookingStatus === 'Checked-In' ? 'bg-green-50 dark:bg-emerald-950/60 text-green-700 dark:text-emerald-300 border-green-200 dark:border-emerald-800' :
                          res.bookingStatus === 'Completed' ? 'bg-gray-100 dark:bg-stone-800 text-gray-700 dark:text-stone-300 border-gray-300 dark:border-stone-700' :
                          'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Checked-In">Checked-In</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          addNotification(
                            `Guest Notes: #${res.referenceNumber}`,
                            `Special Requests: ${res.specialRequests || 'None'} | Dietary: ${res.dietaryRequirements || 'None'} | Arrival: ${res.estimatedArrivalTime || 'Not specified'}`,
                            'booking'
                          );
                        }}
                        className="px-2.5 py-1 bg-[#FAF7F2] dark:bg-stone-800 hover:bg-[#EFE8DC] dark:hover:bg-stone-700 text-[#2C241D] dark:text-white font-bold rounded-lg border border-[#DDD0B9] dark:border-stone-700 transition text-[11px] cursor-pointer"
                      >
                        Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
