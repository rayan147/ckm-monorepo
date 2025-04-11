<!-- StaffManagement.svelte -->
<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import {
    Search,
    Plus,
    User,
    Users,
    Calendar,
    ChefHat,
    Utensils,
    Clock,
    ClipboardCheck,
    Briefcase,
    Building,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle2,
    XCircle,
    Mail,
    Phone
  } from 'lucide-svelte';

  // Reactive variables
  let tabValue = $state('all');
  let searchQuery = $state('');
  let selectedRole = $state('all');
  let selectedStatus = $state('all');

  // Roles dropdown options
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'head-chef', label: 'Head Chef' },
    { value: 'sous-chef', label: 'Sous Chef' },
    { value: 'line-cook', label: 'Line Cook' },
    { value: 'prep-cook', label: 'Prep Cook' },
    { value: 'pastry-chef', label: 'Pastry Chef' },
    { value: 'kitchen-manager', label: 'Kitchen Manager' },
    { value: 'dishwasher', label: 'Dishwasher' },
    { value: 'server', label: 'Server' }
  ];

  // Status dropdown options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Derived values for select components
  const roleContent = $derived(
    roleOptions.find((opt) => opt.value === selectedRole)?.label ?? 'All Roles'
  );

  const statusContent = $derived(
    statusOptions.find((opt) => opt.value === selectedStatus)?.label ?? 'All Status'
  );

  // Dummy staff data array
  const staffMembers = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 123-4567',
      profileImage: '/api/placeholder/150/150',
      role: 'head-chef',
      roleName: 'Head Chef',
      organization: 'Wellness Hospital Group',
      restaurant: 'Main Kitchen',
      status: 'active',
      specialties: ['Diabetic', 'Gluten-Free', 'Low Sodium'],
      availabilityType: 'Full-time',
      joinedDate: 'March 15, 2023',
      shiftsCompleted: 142,
      upcomingShift: 'Today, 8:00 AM - 4:00 PM',
      currentProduction: 'Weekly Meal Prep - Cardiac Unit',
      notesCount: 3
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phone: '(555) 987-6543',
      profileImage: '/api/placeholder/150/150',
      role: 'sous-chef',
      roleName: 'Sous Chef',
      organization: 'Wellness Hospital Group',
      restaurant: 'Main Kitchen',
      status: 'active',
      specialties: ['Vegan', 'Vegetarian', 'High Protein'],
      availabilityType: 'Full-time',
      joinedDate: 'June 10, 2023',
      shiftsCompleted: 98,
      upcomingShift: 'Today, 10:00 AM - 6:00 PM',
      currentProduction: 'Special Diet Menu Planning',
      notesCount: 1
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      phone: '(555) 456-7890',
      profileImage: '/api/placeholder/150/150',
      role: 'pastry-chef',
      roleName: 'Pastry Chef',
      organization: 'Wellness Hospital Group',
      restaurant: 'Main Kitchen',
      status: 'on-leave',
      specialties: ['Diabetic', 'Low Sugar', 'Gluten-Free'],
      availabilityType: 'Part-time',
      joinedDate: 'September 5, 2023',
      shiftsCompleted: 86,
      upcomingShift: 'April 15, 2025, 7:00 AM - 1:00 PM',
      currentProduction: '',
      notesCount: 2
    },
    {
      id: 4,
      firstName: 'Robert',
      lastName: 'Davis',
      email: 'robert.davis@example.com',
      phone: '(555) 789-0123',
      profileImage: '/api/placeholder/150/150',
      role: 'line-cook',
      roleName: 'Line Cook',
      organization: 'Community Schools District',
      restaurant: 'Central School Kitchen',
      status: 'active',
      specialties: ['Allergen-Free', 'Kid-Friendly'],
      availabilityType: 'Full-time',
      joinedDate: 'January 20, 2024',
      shiftsCompleted: 45,
      upcomingShift: 'Tomorrow, 6:00 AM - 2:00 PM',
      currentProduction: 'School Lunch Program',
      notesCount: 0
    },
    {
      id: 5,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      phone: '(555) 234-5678',
      profileImage: '/api/placeholder/150/150',
      role: 'kitchen-manager',
      roleName: 'Kitchen Manager',
      organization: 'Wellness Hospital Group',
      restaurant: 'Main Kitchen',
      status: 'active',
      specialties: ['Inventory Management', 'Staff Scheduling'],
      availabilityType: 'Full-time',
      joinedDate: 'October 15, 2022',
      shiftsCompleted: 189,
      upcomingShift: 'Today, 7:00 AM - 3:00 PM',
      currentProduction: 'Monthly Inventory Planning',
      notesCount: 5
    },
    {
      id: 6,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@example.com',
      phone: '(555) 345-6789',
      profileImage: '/api/placeholder/150/150',
      role: 'prep-cook',
      roleName: 'Prep Cook',
      organization: 'Serenity Wellness Retreat',
      restaurant: 'Wellness Kitchen',
      status: 'inactive',
      specialties: ['Plant-Based', 'Whole Foods'],
      availabilityType: 'Part-time',
      joinedDate: 'May 5, 2023',
      shiftsCompleted: 62,
      upcomingShift: '',
      currentProduction: '',
      notesCount: 4
    },
    {
      id: 7,
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'jennifer.martinez@example.com',
      phone: '(555) 567-8901',
      profileImage: '/api/placeholder/150/150',
      role: 'line-cook',
      roleName: 'Line Cook',
      organization: 'Wellness Hospital Group',
      restaurant: 'Cardiac Unit Kitchen',
      status: 'active',
      specialties: ['Low Sodium', 'Heart Healthy', 'Low Fat'],
      availabilityType: 'Full-time',
      joinedDate: 'July 12, 2023',
      shiftsCompleted: 76,
      upcomingShift: 'Tomorrow, 8:00 AM - 4:00 PM',
      currentProduction: 'Weekly Meal Prep - Cardiac Unit',
      notesCount: 1
    },
    {
      id: 8,
      firstName: 'Thomas',
      lastName: 'Anderson',
      email: 'thomas.anderson@example.com',
      phone: '(555) 678-9012',
      profileImage: '/api/placeholder/150/150',
      role: 'dishwasher',
      roleName: 'Dishwasher',
      organization: 'Community Schools District',
      restaurant: 'Central School Kitchen',
      status: 'active',
      specialties: [],
      availabilityType: 'Part-time',
      joinedDate: 'February 10, 2024',
      shiftsCompleted: 28,
      upcomingShift: 'Tomorrow, 10:00 AM - 4:00 PM',
      currentProduction: '',
      notesCount: 0
    }
  ];

  // Filtered staff list
  $effect(() => {
    // This is where you would filter based on search, role, and status if this was fully functional
    // For now, we'll just log the filtering criteria
    console.log(
      `Filtering with: search=${searchQuery}, role=${selectedRole}, status=${selectedStatus}`
    );
  });

  // Get appropriate status badge class
  function getStatusClass(status) {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-leave':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return '';
    }
  }

  // Get appropriate status text
  function getStatusText(status) {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on-leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
      default:
        return '';
    }
  }

  // Calculate filtered staff count
  function getFilteredCount() {
    return staffMembers.length;
  }

  // Handle view details
  function handleViewDetails(staffId) {
    console.log(`View details for staff ID: ${staffId}`);
    // In a real app, you would navigate to the staff detail page or show a modal
  }
</script>

<div class="container mx-auto p-4 max-w-7xl">
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-2">Staff Management</h1>
    <p class="text-gray-600">Manage kitchen staff, assign roles, and track performance</p>
  </div>

  <!-- Filtering and Actions Row -->
  <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
    <div class="flex flex-col md:flex-row gap-4 justify-between">
      <!-- Search and Filters -->
      <div class="flex flex-col sm:flex-row gap-3 flex-grow">
        <div class="relative flex-grow max-w-md">
          <Search
            size={18}
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            placeholder="Search staff by name, email or role..."
            class="pl-10"
            bind:value={searchQuery}
          />
        </div>

        <div class="flex gap-3">
          <Select.Root type="single" bind:value={selectedRole}>
            <Select.Trigger class="min-w-[150px]">
              {roleContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each roleOptions as option}
                  <Select.Item value={option.value} label={option.label}>
                    {option.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Select.Root type="single" bind:value={selectedStatus}>
            <Select.Trigger class="min-w-[150px]">
              {statusContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each statusOptions as option}
                  <Select.Item value={option.value} label={option.label}>
                    {option.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <!-- Add New Button -->
      <div>
        <Button class="gap-2">
          <Plus size={18} />
          Add Staff Member
        </Button>
      </div>
    </div>
  </div>

  <!-- Tabs and Staff List -->
  <Card.Root>
    <Card.Header class="pb-0">
      <Tabs.Root bind:value={tabValue}>
        <Tabs.List class="w-full border-b">
          <Tabs.Trigger
            value="all"
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
          >
            All Staff <Badge class="ml-2 bg-gray-100 text-gray-800">{staffMembers.length}</Badge>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="active"
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
          >
            Active <Badge class="ml-2 bg-green-100 text-green-800"
              >{staffMembers.filter((s) => s.status === 'active').length}</Badge
            >
          </Tabs.Trigger>
          <Tabs.Trigger
            value="on-leave"
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
          >
            On Leave <Badge class="ml-2 bg-amber-100 text-amber-800"
              >{staffMembers.filter((s) => s.status === 'on-leave').length}</Badge
            >
          </Tabs.Trigger>
          <Tabs.Trigger
            value="inactive"
            class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
          >
            Inactive <Badge class="ml-2 bg-gray-100 text-gray-800"
              >{staffMembers.filter((s) => s.status === 'inactive').length}</Badge
            >
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Card.Header>

    <Card.Content class="p-0">
      {#if tabValue === 'all' || tabValue === 'active' || tabValue === 'on-leave' || tabValue === 'inactive'}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Staff Member</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Role</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Status</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Specialties</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Upcoming Shift</th
                >
                <th class="text-left whitespace-nowrap p-4 font-medium text-sm text-gray-500"
                  >Current Production</th
                >
                <th class="text-right p-4 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {#each staffMembers.filter((staff) => (tabValue === 'all' || staff.status === tabValue) && (selectedRole === 'all' || staff.role === selectedRole) && (selectedStatus === 'all' || staff.status === selectedStatus) && (searchQuery === '' || staff.firstName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || staff.lastName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || staff.email
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || staff.roleName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()))) as staff}
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <Avatar.Root class="h-10 w-10">
                        <Avatar.Image
                          src={staff.profileImage}
                          alt={`${staff.firstName} ${staff.lastName}`}
                        />
                        <Avatar.Fallback class="text-sm"
                          >{staff.firstName.charAt(0)}{staff.lastName.charAt(0)}</Avatar.Fallback
                        >
                      </Avatar.Root>
                      <div>
                        <div class="font-medium">{staff.firstName} {staff.lastName}</div>
                        <div class="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="flex flex-col">
                      <span class="font-medium">{staff.roleName}</span>
                      <span class="text-sm text-gray-500">{staff.restaurant}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <Badge variant="outline" class={getStatusClass(staff.status)}>
                      {getStatusText(staff.status)}
                    </Badge>
                  </td>
                  <td class="p-4">
                    {#if staff.specialties && staff.specialties.length > 0}
                      <div class="flex flex-wrap gap-1">
                        {#each staff.specialties.slice(0, 2) as specialty}
                          <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200">
                            {specialty}
                          </Badge>
                        {/each}
                        {#if staff.specialties.length > 2}
                          <Badge variant="outline" class="bg-gray-50 text-gray-700 border-gray-200">
                            +{staff.specialties.length - 2} more
                          </Badge>
                        {/if}
                      </div>
                    {:else}
                      <span class="text-gray-500 text-sm">None</span>
                    {/if}
                  </td>
                  <td class="p-4">
                    {#if staff.upcomingShift}
                      <div class="flex items-center gap-1">
                        <Calendar size={16} class="text-gray-400" />
                        <span class="text-sm">{staff.upcomingShift}</span>
                      </div>
                    {:else}
                      <span class="text-gray-500 text-sm">None scheduled</span>
                    {/if}
                  </td>
                  <td class="p-4">
                    {#if staff.currentProduction}
                      <div class="flex items-center gap-1">
                        <ClipboardCheck size={16} class="text-gray-400" />
                        <span class="text-sm">{staff.currentProduction}</span>
                      </div>
                    {:else}
                      <span class="text-gray-500 text-sm">None assigned</span>
                    {/if}
                  </td>
                  <td class="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      on:click={() => handleViewDetails(staff.id)}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </Card.Content>

    <Card.Footer class="flex justify-between items-center px-4 py-3 border-t">
      <div class="text-sm text-gray-500">
        Showing <span class="font-medium">{getFilteredCount()}</span> of
        <span class="font-medium">{staffMembers.length}</span> staff members
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </Card.Footer>
  </Card.Root>

  <!-- Staff Detail View Placeholder -->
  <div class="mt-6">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-xl">Staff Details</Card.Title>
        <Card.Description>Select a staff member to view or edit their details</Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Left column - Basic Info -->
          <div class="md:w-1/3">
            <div class="flex flex-col items-center text-center border rounded-lg p-6">
              <Avatar.Root class="h-24 w-24 mb-4">
                <Avatar.Image src="/api/placeholder/150/150" alt="Staff Profile" />
                <Avatar.Fallback class="text-2xl">JS</Avatar.Fallback>
              </Avatar.Root>
              <h3 class="text-xl font-bold">Jane Smith</h3>
              <p class="text-gray-500 mb-2">Head Chef</p>
              <div class="flex gap-2 mb-4">
                <Badge variant="outline" class="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
                <Badge variant="outline" class="bg-blue-100 text-blue-800 border-blue-200">
                  Full-time
                </Badge>
              </div>

              <div class="w-full space-y-2 mt-2">
                <div class="flex items-center gap-2 text-sm">
                  <Mail size={16} class="text-gray-400" />
                  <span>jane.smith@example.com</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <Phone size={16} class="text-gray-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <Building size={16} class="text-gray-400" />
                  <span>Wellness Hospital Group - Main Kitchen</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <Calendar size={16} class="text-gray-400" />
                  <span>Joined: March 15, 2023</span>
                </div>
              </div>

              <div class="flex gap-2 mt-6">
                <Button variant="outline" size="sm" class="gap-1">
                  <Edit size={16} />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" class="gap-1">
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div class="text-2xl font-bold text-blue-600">142</div>
                <div class="text-xs text-gray-500">Shifts Completed</div>
              </div>
              <div class="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div class="text-2xl font-bold text-green-600">38</div>
                <div class="text-xs text-gray-500">Recipes Created</div>
              </div>
              <div class="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div class="text-2xl font-bold text-purple-600">12%</div>
                <div class="text-xs text-gray-500">Waste Reduction</div>
              </div>
              <div class="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div class="text-2xl font-bold text-amber-600">215</div>
                <div class="text-xs text-gray-500">Checklists Completed</div>
              </div>
            </div>
          </div>

          <!-- Right column - Additional Details -->
          <div class="md:w-2/3">
            <Tabs.Root value="schedule" class="w-full">
              <Tabs.List class="w-full border-b mb-4">
                <Tabs.Trigger
                  value="schedule"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Schedule
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="specialties"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Specialties
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="notes"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Notes
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="documents"
                  class="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary mr-6"
                >
                  Documents
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>

            <!-- Schedule Content -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-lg">Upcoming Shifts</h3>
                <Button variant="outline" size="sm">View Full Schedule</Button>
              </div>

              <div class="space-y-3">
                {#each [{ date: 'Today', time: '8:00 AM - 4:00 PM', location: 'Main Kitchen', role: 'Head Chef', production: 'Weekly Meal Prep - Cardiac Unit' }, { date: 'Tomorrow', time: '9:00 AM - 5:00 PM', location: 'Main Kitchen', role: 'Head Chef', production: 'Recipe Testing - Low Sodium Options' }, { date: 'April 11, 2025', time: '7:00 AM - 3:00 PM', location: 'Main Kitchen', role: 'Head Chef', production: 'Special Diet Menu Planning' }] as shift}
                  <div class="border rounded-lg p-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="font-medium">{shift.date} • {shift.time}</div>
                        <div class="text-sm text-gray-500">{shift.location} • {shift.role}</div>
                      </div>
                      <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200">
                        {shift.production}
                      </Badge>
                    </div>
                  </div>
                {/each}
              </div>

              <div class="mt-6">
                <h3 class="font-medium text-lg mb-3">Availability & Constraints</h3>
                <div class="border rounded-lg p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label class="text-sm text-gray-600">Availability Type</Label>
                      <div class="font-medium mt-1">Full-time</div>
                    </div>
                    <div>
                      <Label class="text-sm text-gray-600">Max Hours per Week</Label>
                      <div class="font-medium mt-1">40 hours</div>
                    </div>
                  </div>

                  <div>
                    <Label class="text-sm text-gray-600">Scheduling Constraints</Label>
                    <div class="space-y-2 mt-2">
                      <div class="flex items-center gap-2 text-sm">
                        <XCircle size={16} class="text-red-500" />
                        <span>Cannot work Sundays</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} class="text-green-500" />
                        <span>Prefers morning shifts (before 3:00 PM)</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} class="text-green-500" />
                        <span>Available for overtime when needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
