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
      date: "2024-12-01",
      timeSlot: "09:00 - 17:00",
      department: "Engineering",
      status: "booked",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      seatNumber: 2,
      date: "2024-12-01",
      timeSlot: "10:00 - 18:00",
      department: "Marketing",
      status: "booked",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      seatNumber: 3,
      date: "2024-12-02",
      timeSlot: "08:30 - 16:30",
      department: "Sales",
      status: "cancelled",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      seatNumber: 1,
      date: "2024-12-03",
      timeSlot: "09:00 - 17:00",
      department: "HR",
      status: "booked",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      seatNumber: 4,
      date: "2024-12-03",
      timeSlot: "11:00 - 19:00",
      department: "Engineering",
      status: "cancelled",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      seatNumber: 2,
      date: "2024-12-04",
      timeSlot: "09:30 - 17:30",
      department: "Finance",
      status: "booked",
    },
    {
      id: "7",
      name: "David Brown",
      email: "david.brown@company.com",
      seatNumber: 3,
      date: "2024-12-05",
      timeSlot: "08:00 - 16:00",
      department: "Operations",
      status: "cancelled",
    },
    {
      id: "8",
      name: "Jennifer Lee",
      email: "jennifer.lee@company.com",
      seatNumber: 1,
      date: "2024-12-06",
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
    return [
      ...new Set(bookingData.map((booking) => booking.department)),
    ].sort();
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
          booking.name,
          booking.email,
          booking.seatNumber,
          booking.date,
          booking.timeSlot,
          booking.department,
          booking.status,
        ]
          .map(String)
          .join(",")
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
    const blob = new Blob([JSON.stringify(filteredBookings, null, 2)], {
      type: "application/json",
    });
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
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "cancelled":
        return "bg-gray-200 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
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
    <div className="min-h-screen bg-orange-50 p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-orange-200 border border-orange-300 rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-orange-700">
                Seat Booking Dashboard
              </h1>
              <p className="text-orange-600 mt-1">
                Manage and track seat reservations
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Download size={16} /> Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                <Download size={16} /> Export JSON
              </button>
            </div>
          </div>
        </div>

        <div className="bg-orange-100 border border-orange-300 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-2">
                <Calendar size={16} className="inline mr-1" /> Month
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-2">
                <Search size={16} className="inline mr-1" /> Search
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-2">
                <Filter size={16} className="inline mr-1" /> Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-2">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-300/40 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-black">
                  {filteredBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-300/40 rounded-lg">
                <User className="w-6 h-6 text-orange-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Confirmed</p>
                <p className="text-2xl font-bold text-black">
                  {filteredBookings.filter((b) => b.status === "booked").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-300/40 rounded-lg">
                <Download className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Cancelled</p>
                <p className="text-2xl font-bold text-black">
                  {
                    filteredBookings.filter((b) => b.status === "cancelled")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-100 rounded-lg border border-orange-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-orange-300">
              <thead className="bg-orange-200">
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
                      className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider"
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
                      className="px-6 py-12 text-center text-orange-600"
                    >
                      No bookings found for the selected criteria
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-orange-200">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-black">
                          {booking.name}
                        </div>
                        <div className="text-sm text-orange-700">
                          {booking.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-orange-600 mr-2" />
                          <span className="text-sm font-medium text-black">
                            Seat {booking.seatNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {formatDate(booking.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {booking.timeSlot}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {booking.department}
                      </td>
                      <td className="px-6 py-4">
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

        <div className="mt-8 text-center text-sm text-orange-600">
          Showing {filteredBookings.length} booking
          {filteredBookings.length !== 1 ? "s" : ""} for{" "}
          <span className="text-orange-800 font-medium">
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
