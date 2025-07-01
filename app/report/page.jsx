"use client";
import React, { useState, useMemo } from "react";
import { Download, Calendar, User, MapPin, Filter, Search } from "lucide-react";

const SeatBookingDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const bookingData = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      seatNumber: 1,
      date: "2025-07-01",
      timeSlot: "09:00 - 17:00",
      department: "Engineering",
      status: "booked",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      seatNumber: 2,
      date: "2025-07-01",
      timeSlot: "10:00 - 18:00",
      department: "Marketing",
      status: "booked",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      seatNumber: 3,
      date: "2025-07-02",
      timeSlot: "08:30 - 16:30",
      department: "Sales",
      status: "cancelled",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      seatNumber: 1,
      date: "2025-07-03",
      timeSlot: "09:00 - 17:00",
      department: "HR",
      status: "booked",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      seatNumber: 4,
      date: "2025-07-04",
      timeSlot: "11:00 - 19:00",
      department: "Engineering",
      status: "cancelled",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      seatNumber: 2,
      date: "2025-07-05",
      timeSlot: "09:30 - 17:30",
      department: "Finance",
      status: "booked",
    },
    {
      id: "7",
      name: "David Brown",
      email: "david.brown@company.com",
      seatNumber: 3,
      date: "2025-07-06",
      timeSlot: "08:00 - 16:00",
      department: "Operations",
      status: "cancelled",
    },
    {
      id: "8",
      name: "Jennifer Lee",
      email: "jennifer.lee@company.com",
      seatNumber: 1,
      date: "2025-07-07",
      timeSlot: "10:00 - 18:00",
      department: "Marketing",
      status: "booked",
    },
  ];

  const filteredBookings = useMemo(() => {
    return bookingData.filter((booking) => {
      const bookingMonth = booking.date.slice(0, 7);
      const matchesMonth = bookingMonth === selectedMonth;
      const matchesSearch =
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" || booking.department === departmentFilter;

      return (
        matchesMonth && matchesSearch && matchesStatus && matchesDepartment
      );
    });
  }, [bookingData, selectedMonth, searchTerm, statusFilter, departmentFilter]);

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(bookingData.map((booking) => booking.department)),
    ];
    return uniqueDepartments.sort();
  }, [bookingData]);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Seat Number",
      "Date",
      "Time Slot",
      "Department",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [
          `"${booking.name}"`,
          `"${booking.email}"`,
          booking.seatNumber,
          booking.date,
          `"${booking.timeSlot}"`,
          `"${booking.department}"`,
          booking.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seat-bookings-${selectedMonth}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredBookings, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seat-bookings-${selectedMonth}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-700 rounded-lg shadow-sm border border-slate-600 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">
                Seat Booking Dashboard
              </h1>
              <p className="text-gray-300 mt-1">
                Manage and track seat reservations
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download size={16} />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-700 rounded-lg shadow-sm border border-slate-600 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Month
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                <Search size={16} className="inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                <Filter size={16} className="inline mr-1" />
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-white">
                  {filteredBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <User className="w-6 h-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Confirmed</p>
                <p className="text-2xl font-bold text-white">
                  {filteredBookings.filter((b) => b.status === "booked").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Download className="w-6 h-6 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Cancelled</p>
                <p className="text-2xl font-bold text-white">
                  {
                    filteredBookings.filter((b) => b.status === "cancelled")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden text-white">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-slate-600">
              <thead className="bg-slate-700">
                <tr>
                  {[
                    "Person",
                    "Seat",
                    "Date",
                    "Time",
                    "Department",
                    "Status",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No bookings found for the selected criteria
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {booking.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {booking.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                          <span className="text-sm font-medium text-white">
                            Seat {booking.seatNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {formatDate(booking.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {booking.timeSlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {booking.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          Showing {filteredBookings.length} booking
          {filteredBookings.length !== 1 ? "s" : ""} for{" "}
          <span className="text-emerald-400 font-medium">
            {new Date(selectedMonth + "-01").toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingDashboard;
