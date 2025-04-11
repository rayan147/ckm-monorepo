<!-- ScheduleManagement.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import {
    format,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameDay,
    parseISO
  } from 'date-fns';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Switch } from '$lib/components/ui/switch/index.js';
  import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Clock,
    User,
    Users,
    Plus,
    Search,
    Filter,
    LayoutGrid,
    LayoutList,
    Trash2,
    X,
    Check,
    AlertCircle
  } from 'lucide-svelte';

  import calendarize from '$lib/utils/calendarize';

  // Types
  import type { Shift, User as CkmUser } from '@ckm/types';
  import type { Week } from '$lib/utils/calendarize';

  // Reactive state variables
  let currentDate = $state(new Date());
  let view = $state<'month' | 'week'>('month');
  let shifts = $state<Shift[]>([]);
  let showShiftModal = $state(false);
  let showDeleteDialog = $state(false);
  let selectedDate = $state<Date | null>(null);
  let currentShift = $state<Shift | null>(null);
  let users = $state<CkmUser[]>([]);
  let errors = $state<string[]>([]);
  let searchTerm = $state('');
  let userFilter = $state('all');
  let locationFilter = $state('all');
  let isLoading = $state(false);

  // Form data for creating/editing shifts
  let formData = $state({
    userId: '',
    startTime: '',
    endTime: '',
    status: 'SCHEDULED',
    notes: ''
  });

  // Configuration for color coding
  const colors = {
    SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    UNAVAILABLE: 'bg-gray-100 text-gray-800 border-gray-200',
    'user-1': 'bg-violet-100 text-violet-800 border-violet-200',
    'user-2': 'bg-amber-100 text-amber-800 border-amber-200',
    'user-3': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'user-4': 'bg-pink-100 text-pink-800 border-pink-200',
    'user-5': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'user-6': 'bg-orange-100 text-orange-800 border-orange-200',
    'user-7': 'bg-teal-100 text-teal-800 border-teal-200',
    'user-8': 'bg-cyan-100 text-cyan-800 border-cyan-200'
  };

  // Mock locations for filtering
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'main-kitchen', name: 'Main Kitchen' },
    { id: 'prep-kitchen', name: 'Prep Kitchen' },
    { id: 'hospital-north', name: 'Hospital North Wing' },
    { id: 'school-cafe', name: 'School Cafeteria' },
    { id: 'wellness-retreat', name: 'Wellness Retreat' }
  ];

  // Mock data - would normally come from API calls
  onMount(async () => {
    isLoading = true;
    try {
      // Simulate API call for users
      users = [
        {
          id: 1,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: 'Head Chef'
        },
        {
          id: 2,
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@example.com',
          role: 'Sous Chef'
        },
        {
          id: 3,
          firstName: 'Sarah',
          lastName: 'Williams',
          email: 'sarah.williams@example.com',
          role: 'Pastry Chef'
        },
        {
          id: 4,
          firstName: 'Robert',
          lastName: 'Davis',
          email: 'robert.davis@example.com',
          role: 'Line Cook'
        },
        {
          id: 5,
          firstName: 'Emily',
          lastName: 'Brown',
          email: 'emily.brown@example.com',
          role: 'Kitchen Manager'
        },
        {
          id: 6,
          firstName: 'David',
          lastName: 'Wilson',
          email: 'david.wilson@example.com',
          role: 'Prep Cook'
        },
        {
          id: 7,
          firstName: 'Jennifer',
          lastName: 'Martinez',
          email: 'jennifer.martinez@example.com',
          role: 'Line Cook'
        },
        {
          id: 8,
          firstName: 'Thomas',
          lastName: 'Anderson',
          email: 'thomas.anderson@example.com',
          role: 'Dishwasher'
        }
      ];

      // Fetch shifts (simulated)
      await fetchShiftsForPeriod(currentDate, view);
    } finally {
      isLoading = false;
    }
  });

  // Function to fetch shifts based on the current period and view
  async function fetchShiftsForPeriod(date: Date, viewType: 'month' | 'week') {
    isLoading = true;

    try {
      let start: Date, end: Date;
      if (viewType === 'month') {
        start = startOfMonth(date);
        end = endOfMonth(date);
      } else {
        start = startOfWeek(date, { weekStartsOn: 0 }); // 0 represents Sunday
        end = endOfWeek(date, { weekStartsOn: 0 });
      }

      // Simulated API response - in a real app, this would be an API call
      // Simulate 2-second delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate sample shifts
      const sampleShifts: Shift[] = [
        {
          id: 1,
          userId: 1,
          startTime: new Date(2025, 3, 10, 8, 0).toISOString(),
          endTime: new Date(2025, 3, 10, 16, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'main-kitchen',
          notes: 'Morning prep and lunch service'
        },
        {
          id: 2,
          userId: 2,
          startTime: new Date(2025, 3, 10, 10, 0).toISOString(),
          endTime: new Date(2025, 3, 10, 18, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'main-kitchen',
          notes: 'Lunch and dinner service'
        },
        {
          id: 3,
          userId: 3,
          startTime: new Date(2025, 3, 11, 7, 0).toISOString(),
          endTime: new Date(2025, 3, 11, 13, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'prep-kitchen',
          notes: 'Pastry preparation'
        },
        {
          id: 4,
          userId: 4,
          startTime: new Date(2025, 3, 12, 8, 0).toISOString(),
          endTime: new Date(2025, 3, 12, 16, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'school-cafe',
          notes: 'School lunch service'
        },
        {
          id: 5,
          userId: 5,
          startTime: new Date(2025, 3, 14, 7, 0).toISOString(),
          endTime: new Date(2025, 3, 14, 15, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'main-kitchen',
          notes: 'Inventory management'
        },
        {
          id: 6,
          userId: 6,
          startTime: new Date(2025, 3, 15, 9, 0).toISOString(),
          endTime: new Date(2025, 3, 15, 15, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'prep-kitchen',
          notes: 'Vegetable prep'
        },
        {
          id: 7,
          userId: 7,
          startTime: new Date(2025, 3, 16, 11, 0).toISOString(),
          endTime: new Date(2025, 3, 16, 19, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'hospital-north',
          notes: 'Dinner service'
        },
        {
          id: 8,
          userId: 8,
          startTime: new Date(2025, 3, 18, 8, 0).toISOString(),
          endTime: new Date(2025, 3, 18, 14, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'main-kitchen',
          notes: 'Dishwashing'
        },
        {
          id: 9,
          userId: 1,
          startTime: new Date(2025, 3, 20, 8, 0).toISOString(),
          endTime: new Date(2025, 3, 20, 16, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'wellness-retreat',
          notes: 'Special menu preparation'
        },
        {
          id: 10,
          userId: 2,
          startTime: new Date(2025, 3, 22, 10, 0).toISOString(),
          endTime: new Date(2025, 3, 22, 18, 0).toISOString(),
          status: 'SCHEDULED',
          location: 'main-kitchen',
          notes: 'Recipe testing'
        }
      ];

      // Adjust month to current date's month to always have some data
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Map each shift to have dates in the current month/year being viewed
      shifts = sampleShifts.map((shift) => {
        const shiftStartDate = new Date(shift.startTime);
        const shiftEndDate = new Date(shift.endTime);

        // Get the day of month but set month and year to current view
        const newStartDate = new Date(
          currentYear,
          currentMonth,
          shiftStartDate.getDate(),
          shiftStartDate.getHours(),
          shiftStartDate.getMinutes()
        );

        const newEndDate = new Date(
          currentYear,
          currentMonth,
          shiftEndDate.getDate(),
          shiftEndDate.getHours(),
          shiftEndDate.getMinutes()
        );

        return {
          ...shift,
          startTime: newStartDate.toISOString(),
          endTime: newEndDate.toISOString()
        };
      });

      errors = []; // Clear any previous errors
    } catch (error: any) {
      console.error('Error fetching shifts:', error);
      errors = [`Error fetching shifts: ${error.message}`];
      shifts = []; // Reset shifts to empty array in case of error
    } finally {
      isLoading = false;
    }
  }

  // Navigation functions
  function navigatePrevious() {
    currentDate = view === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
    fetchShiftsForPeriod(currentDate, view);
  }

  function navigateNext() {
    currentDate = view === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1);
    fetchShiftsForPeriod(currentDate, view);
  }

  function toggleView() {
    view = view === 'month' ? 'week' : 'month';
    fetchShiftsForPeriod(currentDate, view);
  }

  // Modal handling functions
  function openShiftModal(date: Date, shift: Shift | null = null) {
    selectedDate = date;
    currentShift = shift;

    if (shift) {
      // Edit existing shift
      formData.userId = shift.userId.toString();
      formData.startTime = format(new Date(shift.startTime), "yyyy-MM-dd'T'HH:mm");
      formData.endTime = format(new Date(shift.endTime), "yyyy-MM-dd'T'HH:mm");
      formData.status = shift.status;
      formData.notes = shift.notes || '';
    } else {
      // Create new shift
      formData.userId = '';
      formData.startTime = format(date, "yyyy-MM-dd'T'09:00"); // Default to 9 AM
      formData.endTime = format(date, "yyyy-MM-dd'T'17:00"); // Default to 5 PM
      formData.status = 'SCHEDULED';
      formData.notes = '';
    }

    showShiftModal = true;
  }

  function resetForm() {
    formData.userId = '';
    formData.startTime = '';
    formData.endTime = '';
    formData.status = 'SCHEDULED';
    formData.notes = '';
    errors = [];
  }

  function validateForm() {
    errors = [];

    if (!formData.userId) {
      errors.push('Please select a staff member');
    }

    if (!formData.startTime) {
      errors.push('Please specify a start time');
    }

    if (!formData.endTime) {
      errors.push('Please specify an end time');
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);

      if (start >= end) {
        errors.push('End time must be after start time');
      }
    }

    return errors.length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    // In a real app, this would send an API request
    if (currentShift) {
      // Update existing shift
      const index = shifts.findIndex((s) => s.id === currentShift.id);
      if (index !== -1) {
        shifts[index] = {
          ...currentShift,
          userId: parseInt(formData.userId),
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          status: formData.status,
          notes: formData.notes
        };
      }
    } else {
      // Create new shift
      const newShift: Shift = {
        id: shifts.length + 1, // In a real app, this would be generated by the backend
        userId: parseInt(formData.userId),
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        status: formData.status,
        location: 'main-kitchen', // Default location
        notes: formData.notes
      };

      shifts = [...shifts, newShift];
    }

    showShiftModal = false;
    resetForm();
  }

  function confirmDeleteShift() {
    showDeleteDialog = true;
  }

  function handleDeleteShift() {
    if (currentShift) {
      shifts = shifts.filter((s) => s.id !== currentShift.id);
      showDeleteDialog = false;
      showShiftModal = false;
      resetForm();
    }
  }

  function closeModal() {
    showShiftModal = false;
    resetForm();
  }

  function cancelDelete() {
    showDeleteDialog = false;
  }

  // Helper functions
  function getUserName(userId: number): string {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  function getShiftColor(shift: Shift): string {
    // First check status-based colors
    if (shift.status in colors) {
      return colors[shift.status as keyof typeof colors];
    }

    // If not colored by status, color by user
    const userKey = `user-${(shift.userId % 8) + 1}` as keyof typeof colors;
    return colors[userKey];
  }

  function getShiftsForDay(date: Date) {
    return shifts.filter((shift) => {
      // Apply filters
      if (userFilter !== 'all' && shift.userId.toString() !== userFilter) {
        return false;
      }

      if (locationFilter !== 'all' && shift.location !== locationFilter) {
        return false;
      }

      // Filter by search term
      if (searchTerm.trim() !== '') {
        const userName = getUserName(shift.userId).toLowerCase();
        if (
          !userName.includes(searchTerm.toLowerCase()) &&
          !(shift.notes && shift.notes.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return false;
        }
      }

      return isSameDay(parseISO(shift.startTime), date);
    });
  }

  // Reactive calendar data based on current date and view
  let calendarData = $derived(calendarize({ targetDate: currentDate, view }));

  // Reactive user options for the select dropdown
  let userOptions = $derived([
    { value: 'all', label: 'All Staff' },
    ...users.map((user) => ({
      value: user.id.toString(),
      label: `${user.firstName} ${user.lastName} (${user.role})`
    }))
  ]);

  // Reactive location options for the select dropdown
  let locationOptions = $derived(
    locations.map((loc) => ({
      value: loc.id,
      label: loc.name
    }))
  );
</script>

<div class="container mx-auto p-4 max-w-7xl">
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-2">Schedule Management</h1>
    <p class="text-gray-600">Manage shifts and schedules for all kitchen staff</p>
  </div>

  <!-- Controls Row -->
  <div class="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
    <!-- Navigation -->
    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon" onclick={navigatePrevious}>
        <ChevronLeft size={16} />
      </Button>
      <h2 class="text-lg font-semibold">
        {format(currentDate, view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy")}
      </h2>
      <Button variant="outline" size="icon" onclick={navigateNext}>
        <ChevronRight size={16} />
      </Button>
      <Button variant="outline" size="sm" class="ml-2" onclick={toggleView}>
        {view === 'month' ? 'Week View' : 'Month View'}
      </Button>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-2 md:w-auto w-full">
      <div class="relative w-full sm:w-60">
        <Search size={16} class="absolute left-2.5 top-2.5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by staff or notes..."
          class="pl-8"
          bind:value={searchTerm}
        />
      </div>

      <Select.Root type="single" bind:value={userFilter}>
        <Select.Trigger class="w-full sm:w-60">
          <div class="flex items-center gap-2">
            <User size={16} />
            <span>
              {userOptions.find((opt) => opt.value === userFilter)?.label || 'All Staff'}
            </span>
          </div>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each userOptions as option}
              <Select.Item value={option.value} label={option.label}>
                {option.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Select.Root type="single" bind:value={locationFilter}>
        <Select.Trigger class="w-full sm:w-60">
          <div class="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {locationOptions.find((opt) => opt.value === locationFilter)?.label ||
                'All Locations'}
            </span>
          </div>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each locationOptions as option}
              <Select.Item value={option.value} label={option.label}>
                {option.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Button class="gap-2 w-full sm:w-auto">
        <Plus size={16} />
        Add Shift
      </Button>
    </div>
  </div>

  <!-- Error Display -->
  {#if errors.length > 0}
    <div class="mb-4 p-4 border border-red-200 bg-red-50 rounded-md">
      <div class="flex items-start gap-2">
        <AlertCircle size={16} class="text-red-600 mt-0.5" />
        <div>
          {#each errors as error}
            <p class="text-sm text-red-600">{error}</p>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Loading State -->
  {#if isLoading}
    <Card.Root>
      <Card.Content class="p-8 flex justify-center items-center">
        <div class="flex flex-col items-center gap-2">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p class="text-gray-600">Loading schedule...</p>
        </div>
      </Card.Content>
    </Card.Root>
  {:else}
    <!-- Calendar View -->
    <Card.Root>
      <Card.Content class="p-0">
        <div class="grid grid-cols-7 gap-px bg-gray-200">
          <!-- Weekday Headers -->
          {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
            <div class="p-2 font-medium text-center text-gray-700 bg-gray-100">{day}</div>
          {/each}

          <!-- Calendar Data -->
          {#each calendarData as week}
            {#each week as day}
              <div
                class="bg-white p-2 min-h-32 overflow-y-auto relative {day.currentMonth
                  ? ''
                  : 'bg-gray-50'}"
              >
                <!-- Day Number -->
                <div class="flex justify-between items-center mb-1">
                  <span
                    class="text-sm font-semibold {isSameDay(day.date, new Date())
                      ? 'text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full'
                      : day.currentMonth
                        ? 'text-gray-700'
                        : 'text-gray-400'}"
                  >
                    {format(day.date, 'd')}
                  </span>

                  <!-- Add button for day -->
                  <button
                    class="p-0.5 text-gray-400 hover:text-blue-600 focus:outline-none"
                    onclick={() => openShiftModal(day.date)}
                    aria-label={`Add shift on ${format(day.date, 'MMMM d, yyyy')}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <!-- Shifts for the day -->
                <div class="space-y-1">
                  {#each getShiftsForDay(day.date) as shift}
                    <button
                      type="button"
                      class="p-1.5 text-xs rounded cursor-pointer hover:opacity-80 w-full text-left shadow-sm {getShiftColor(
                        shift
                      )}"
                      onclick={() => openShiftModal(day.date, shift)}
                    >
                      <div class="font-medium truncate">{getUserName(shift.userId)}</div>
                      <div class="text-xs">
                        {format(new Date(shift.startTime), 'h:mm a')} - {format(
                          new Date(shift.endTime),
                          'h:mm a'
                        )}
                      </div>
                      {#if shift.notes}
                        <div class="text-xs truncate opacity-80">{shift.notes}</div>
                      {/if}
                    </button>
                  {/each}
                </div>
              </div>
            {/each}
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  {/if}

  <!-- Summary Stats -->
  <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Shifts</p>
            <p class="text-2xl font-bold">{shifts.length}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <Calendar class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Staff Scheduled</p>
            <p class="text-2xl font-bold">{new Set(shifts.map((s) => s.userId)).size}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-full">
            <Users class="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Hours Scheduled</p>
            <p class="text-2xl font-bold">
              {shifts
                .reduce((total, shift) => {
                  const start = new Date(shift.startTime);
                  const end = new Date(shift.endTime);
                  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                  return total + hours;
                }, 0)
                .toFixed(0)}
            </p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <Clock class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Locations Used</p>
            <p class="text-2xl font-bold">{new Set(shifts.map((s) => s.location)).size}</p>
          </div>
          <div class="p-3 bg-amber-100 rounded-full">
            <LayoutGrid class="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>

<!-- Shift Modal Dialog -->
{#if showShiftModal}
  <div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-xl">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">{currentShift ? 'Edit Shift' : 'Add New Shift'}</h2>
          <button onclick={closeModal} class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X class="w-6 h-6" aria-label="Close modal" />
          </button>
        </div>

        <!-- Display Errors -->
        {#if errors.length > 0}
          <div class="mb-4 p-3 border border-red-200 bg-red-50 rounded-md">
            <div class="flex items-start gap-2">
              <AlertCircle size={16} class="text-red-600 mt-0.5" />
              <div>
                {#each errors as error}
                  <p class="text-sm text-red-600">{error}</p>
                {/each}
              </div>
            </div>
          </div>
        {/if}

        <form class="space-y-4">
          <!-- User Selection -->
          <div>
            <Label for="userId" class="block text-sm font-medium text-gray-700">Staff Member</Label>
            <Select.Root
              type="single"
              value={formData.userId}
              onValueChange={(value) => (formData.userId = value)}
            >
              <Select.Trigger id="userId" class="w-full">
                <div class="flex items-center gap-2">
                  <User size={16} />
                  <span>
                    {formData.userId
                      ? getUserName(parseInt(formData.userId))
                      : 'Select Staff Member'}
                  </span>
                </div>
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each users as user}
                    <Select.Item
                      value={user.id.toString()}
                      label={`${user.firstName} ${user.lastName}`}
                    >
                      <div class="flex flex-col">
                        <span>{user.firstName} {user.lastName}</span>
                        <span class="text-xs text-gray-500">{user.role}</span>
                      </div>
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Start Time -->
          <div>
            <Label for="startTime" class="block text-sm font-medium text-gray-700">Start Time</Label
            >
            <Input type="datetime-local" id="startTime" bind:value={formData.startTime} required />
          </div>

          <!-- End Time -->
          <div>
            <Label for="endTime" class="block text-sm font-medium text-gray-700">End Time</Label>
            <Input type="datetime-local" id="endTime" bind:value={formData.endTime} required />
          </div>

          <!-- Status -->
          <div>
            <Label for="status" class="block text-sm font-medium text-gray-700">Status</Label>
            <Select.Root
              type="single"
              value={formData.status}
              onValueChange={(value) => (formData.status = value)}
            >
              <Select.Trigger id="status" class="w-full">
                <span>
                  {formData.status === 'SCHEDULED'
                    ? 'Scheduled'
                    : formData.status === 'COMPLETED'
                      ? 'Completed'
                      : formData.status === 'CANCELLED'
                        ? 'Cancelled'
                        : formData.status === 'UNAVAILABLE'
                          ? 'Unavailable'
                          : 'Select Status'}
                </span>
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value="SCHEDULED" label="Scheduled">Scheduled</Select.Item>
                  <Select.Item value="COMPLETED" label="Completed">Completed</Select.Item>
                  <Select.Item value="CANCELLED" label="Cancelled">Cancelled</Select.Item>
                  <Select.Item value="UNAVAILABLE" label="Unavailable">Unavailable</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Location -->
          <div>
            <Label for="location" class="block text-sm font-medium text-gray-700">Location</Label>
            <Select.Root type="single" value={currentShift?.location || 'main-kitchen'}>
              <Select.Trigger id="location" class="w-full">
                {locationOptions.find(
                  (opt) => opt.value === (currentShift?.location || 'main-kitchen')
                )?.label || 'Select Location'}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each locationOptions.filter((loc) => loc.value !== 'all') as option}
                    <Select.Item value={option.value} label={option.label}>
                      {option.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Notes -->
          <div>
            <Label for="notes" class="block text-sm font-medium text-gray-700">Notes</Label>
            <textarea
              id="notes"
              bind:value={formData.notes}
              class="w-full min-h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Add shift notes here..."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-between pt-2">
            <Button type="button" onclick={handleSubmit} class="gap-2">
              <Check size={16} />
              {currentShift ? 'Update Shift' : 'Create Shift'}
            </Button>

            {#if currentShift}
              <Button
                type="button"
                variant="destructive"
                onclick={confirmDeleteShift}
                class="gap-2"
              >
                <Trash2 size={16} />
                Delete Shift
              </Button>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Dialog -->
{#if showDeleteDialog}
  <AlertDialog.Root open={showDeleteDialog}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete Shift</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this shift? This action cannot be undone.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel onclick={cancelDelete}>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action
          onclick={handleDeleteShift}
          class={buttonVariants({ variant: 'destructive' })}
        >
          Delete
        </AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}

<!-- Weekly View Component -->
{#if view === 'week' && !isLoading}
  <div class="mt-6">
    <Card.Root>
      <Card.Header>
        <Card.Title>Weekly Schedule</Card.Title>
        <Card.Description>
          Week of {format(currentDate, 'MMMM d, yyyy')}
        </Card.Description>
      </Card.Header>
      <Card.Content class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="sticky left-0 bg-white z-10 p-3 border-b border-r text-left">Staff</th>
                {#each calendarData[0] as day}
                  <th class="p-3 border-b text-center min-w-28">
                    <div
                      class={isSameDay(day.date, new Date()) ? 'text-blue-600' : 'text-gray-700'}
                    >
                      {format(day.date, 'EEE')}
                    </div>
                    <div class="text-xs text-gray-500">
                      {format(day.date, 'MMM d')}
                    </div>
                  </th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each users as user}
                {@const userShifts = shifts.filter(
                  (shift) =>
                    shift.userId === user.id &&
                    (userFilter === 'all' || shift.userId.toString() === userFilter) &&
                    (locationFilter === 'all' || shift.location === locationFilter) &&
                    (searchTerm.trim() === '' ||
                      `${user.firstName} ${user.lastName}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      (shift.notes && shift.notes.toLowerCase().includes(searchTerm.toLowerCase())))
                )}
                <tr class="hover:bg-gray-50">
                  <td class="sticky left-0 bg-white z-10 p-3 border-b border-r">
                    <div class="font-medium">{user.firstName} {user.lastName}</div>
                    <div class="text-xs text-gray-500">{user.role}</div>
                  </td>
                  {#each calendarData[0] as day}
                    {@const dayShifts = userShifts.filter((shift) =>
                      isSameDay(parseISO(shift.startTime), day.date)
                    )}
                    <td class="p-2 border-b text-center align-top h-24">
                      {#if dayShifts.length > 0}
                        <div class="space-y-1">
                          {#each dayShifts as shift}
                            <button
                              type="button"
                              class="p-1.5 text-xs rounded cursor-pointer hover:opacity-80 w-full text-left shadow-sm {getShiftColor(
                                shift
                              )}"
                              onclick={() => openShiftModal(day.date, shift)}
                            >
                              <div class="font-medium">
                                {format(new Date(shift.startTime), 'h:mm a')} - {format(
                                  new Date(shift.endTime),
                                  'h:mm a'
                                )}
                              </div>
                              {#if shift.notes}
                                <div class="text-xs truncate opacity-80">{shift.notes}</div>
                              {/if}
                            </button>
                          {/each}
                        </div>
                      {:else}
                        <button
                          class="w-full h-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                          onclick={() => openShiftModal(day.date)}
                        >
                          <Plus size={16} />
                        </button>
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

<!-- Daily Details Section (When a day is selected) -->
{#if selectedDate && !showShiftModal && !isLoading}
  <div class="mt-6">
    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between">
        <div>
          <Card.Title>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</Card.Title>
          <Card.Description>
            {getShiftsForDay(selectedDate).length} shifts scheduled
          </Card.Description>
        </div>
        <Button variant="outline" size="sm" onclick={() => (selectedDate = null)}>Close</Button>
      </Card.Header>
      <Card.Content>
        {#if getShiftsForDay(selectedDate).length === 0}
          <div class="text-center py-8 text-gray-500">
            <div class="mb-2">No shifts scheduled for this day</div>
            <Button variant="outline" onclick={() => openShiftModal(selectedDate)}>
              Add Shift
            </Button>
          </div>
        {:else}
          <div class="space-y-3">
            {#each getShiftsForDay(selectedDate) as shift}
              <div class="border rounded-lg overflow-hidden">
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b bg-gray-50"
                >
                  <div class="flex items-center gap-2">
                    <User size={16} class="text-gray-500" />
                    <span class="font-medium">{getUserName(shift.userId)}</span>
                  </div>

                  <Badge variant="outline" class={getShiftColor(shift)}>
                    {shift.status}
                  </Badge>
                </div>

                <div class="p-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div class="text-sm text-gray-500">Shift Time</div>
                      <div class="font-medium">
                        {format(new Date(shift.startTime), 'h:mm a')} - {format(
                          new Date(shift.endTime),
                          'h:mm a'
                        )}
                      </div>
                    </div>

                    <div>
                      <div class="text-sm text-gray-500">Location</div>
                      <div class="font-medium">
                        {locationOptions.find((loc) => loc.value === shift.location)?.label ||
                          shift.location}
                      </div>
                    </div>
                  </div>

                  {#if shift.notes}
                    <div class="mt-3">
                      <div class="text-sm text-gray-500">Notes</div>
                      <div class="text-sm mt-1">{shift.notes}</div>
                    </div>
                  {/if}

                  <div class="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onclick={() => openShiftModal(selectedDate, shift)}
                    >
                      Edit Shift
                    </Button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
{/if}
