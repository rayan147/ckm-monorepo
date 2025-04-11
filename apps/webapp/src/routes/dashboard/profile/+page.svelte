<!-- UserProfile.svelte -->
<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import {
    Calendar,
    CalendarDays,
    Clock,
    Edit,
    ChefHat,
    Utensils,
    Building,
    Building2,
    ClipboardList,
    Bell,
    Settings,
    UserCircle,
    Lock
  } from 'lucide-svelte';

  // Reactive variables
  let tabValue = $state('overview');

  // Dummy data for the profile
  const user = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    profileImage: '/api/placeholder/150/150',
    restaurantName: 'Sunshine Catering',
    organizationName: 'Wellness Hospital Group',
    role: 'Head Chef',
    joinedDate: 'March 15, 2023',
    lastActive: 'Today at 2:30 PM',
    dietarySpecialties: ['Diabetic', 'Gluten-Free', 'Low Sodium'],
    recentShifts: [
      { date: 'April 8, 2025', time: '8:00 AM - 4:00 PM', location: 'Main Kitchen' },
      { date: 'April 7, 2025', time: '7:00 AM - 3:00 PM', location: 'Prep Area' },
      { date: 'April 5, 2025', time: '6:00 AM - 2:00 PM', location: 'Main Kitchen' }
    ],
    recentPrep: [
      { name: 'Vegetable Stock (Low Sodium)', date: 'April 8, 2025', quantity: '20L' },
      { name: 'Diabetic-Friendly Desserts', date: 'April 7, 2025', quantity: '50 servings' },
      { name: 'Gluten-Free Bread', date: 'April 6, 2025', quantity: '30 loaves' }
    ],
    upcomingProduction: [
      { name: 'Weekly Meal Prep - Cardiac Unit', date: 'April 10, 2025', status: 'Scheduled' },
      { name: 'Special Diet Menu Planning', date: 'April 11, 2025', status: 'Pending Approval' }
    ],
    stats: {
      shiftsCompleted: 142,
      recipesCreated: 38,
      wasteReduction: '12%',
      checklistsCompleted: 215
    }
  };

  // Helper function to check if a specialty is included in user's list
  function isSpecialtyIncluded(specialty) {
    return user.dietarySpecialties.includes(specialty);
  }

  // Availability options
  const availabilityOptions = [
    { value: 'full', label: 'Full-time' },
    { value: 'part', label: 'Part-time' },
    { value: 'weekends', label: 'Weekends Only' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  let availabilityValue = $state('full');
  const availabilityTriggerContent = $derived(
    availabilityOptions.find((opt) => opt.value === availabilityValue)?.label ??
      'Select availability'
  );
</script>

<div class="container mx-auto p-4 max-w-6xl">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Left Column - Profile Info -->
    <div class="md:col-span-1">
      <Card.Root class="shadow-md">
        <Card.Header class="pb-2">
          <div class="flex flex-col items-center">
            <Avatar.Root class="h-24 w-24 mb-4">
              <Avatar.Image src={user.profileImage} alt="{user.firstName} {user.lastName}" />
              <Avatar.Fallback class="text-2xl"
                >{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar.Fallback
              >
            </Avatar.Root>
            <Card.Title class="text-xl font-bold text-center"
              >{user.firstName} {user.lastName}</Card.Title
            >
            <Card.Description class="text-center mt-1">{user.email}</Card.Description>

            <div class="flex gap-2 mt-3">
              <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                {user.role}
              </Badge>
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm">
              <Building size={16} class="text-gray-500" />
              <span class="text-gray-600">Restaurant:</span>
              <span class="font-medium">{user.restaurantName}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <Building2 size={16} class="text-gray-500" />
              <span class="text-gray-600">Organization:</span>
              <span class="font-medium">{user.organizationName}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <CalendarDays size={16} class="text-gray-500" />
              <span class="text-gray-600">Joined:</span>
              <span class="font-medium">{user.joinedDate}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <Clock size={16} class="text-gray-500" />
              <span class="text-gray-600">Last active:</span>
              <span class="font-medium">{user.lastActive}</span>
            </div>

            <div class="pt-2">
              <div class="text-sm text-gray-600 mb-2">Dietary Specialties:</div>
              <div class="flex flex-wrap gap-2">
                {#each user.dietarySpecialties as specialty}
                  <Badge variant="secondary" class="bg-green-50 text-green-700 border-green-200">
                    {specialty}
                  </Badge>
                {/each}
              </div>
            </div>
          </div>
        </Card.Content>

        <Card.Footer class="flex justify-center border-t pt-4">
          <Button variant="outline" size="sm" class="flex items-center gap-2">
            <Edit size={16} />
            Edit Profile
          </Button>
        </Card.Footer>
      </Card.Root>

      <!-- Stats Card -->
      <Card.Root class="shadow-md mt-6">
        <Card.Header>
          <Card.Title class="text-lg">Performance Stats</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-lg p-3 text-center">
              <div class="text-blue-600 font-semibold text-xl">{user.stats.shiftsCompleted}</div>
              <div class="text-xs text-gray-600">Shifts Completed</div>
            </div>

            <div class="bg-purple-50 rounded-lg p-3 text-center">
              <div class="text-purple-600 font-semibold text-xl">{user.stats.recipesCreated}</div>
              <div class="text-xs text-gray-600">Recipes Created</div>
            </div>

            <div class="bg-green-50 rounded-lg p-3 text-center">
              <div class="text-green-600 font-semibold text-xl">{user.stats.wasteReduction}</div>
              <div class="text-xs text-gray-600">Waste Reduction</div>
            </div>

            <div class="bg-amber-50 rounded-lg p-3 text-center">
              <div class="text-amber-600 font-semibold text-xl">
                {user.stats.checklistsCompleted}
              </div>
              <div class="text-xs text-gray-600">Checklists Completed</div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <!-- Right Column - Tabs Content -->
    <div class="md:col-span-2">
      <Card.Root class="shadow-md">
        <Card.Header class="pb-0">
          <Tabs.Root bind:value={tabValue}>
            <Tabs.List class="grid grid-cols-5 w-full">
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="shifts">Shifts</Tabs.Trigger>
              <Tabs.Trigger value="prep">Prep</Tabs.Trigger>
              <Tabs.Trigger value="production">Production</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Card.Header>

        <Card.Content class="pt-6">
          {#if tabValue === 'overview'}
            <div class="space-y-6">
              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <Calendar size={20} />
                  Recent Shifts
                </h3>
                <div class="bg-gray-50 rounded-lg">
                  {#each user.recentShifts as shift, index}
                    <div
                      class="p-3 flex justify-between items-center {index !==
                      user.recentShifts.length - 1
                        ? 'border-b border-gray-200'
                        : ''}"
                    >
                      <div>
                        <div class="font-medium">{shift.date}</div>
                        <div class="text-sm text-gray-600">{shift.time}</div>
                      </div>
                      <Badge variant="outline">{shift.location}</Badge>
                    </div>
                  {/each}
                </div>
              </div>

              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <Utensils size={20} />
                  Recent Prep Items
                </h3>
                <div class="bg-gray-50 rounded-lg">
                  {#each user.recentPrep as prep, index}
                    <div
                      class="p-3 flex justify-between items-center {index !==
                      user.recentPrep.length - 1
                        ? 'border-b border-gray-200'
                        : ''}"
                    >
                      <div>
                        <div class="font-medium">{prep.name}</div>
                        <div class="text-sm text-gray-600">{prep.date}</div>
                      </div>
                      <Badge variant="outline">{prep.quantity}</Badge>
                    </div>
                  {/each}
                </div>
              </div>

              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <ClipboardList size={20} />
                  Upcoming Production Plans
                </h3>
                <div class="bg-gray-50 rounded-lg">
                  {#each user.upcomingProduction as plan, index}
                    <div
                      class="p-3 flex justify-between items-center {index !==
                      user.upcomingProduction.length - 1
                        ? 'border-b border-gray-200'
                        : ''}"
                    >
                      <div>
                        <div class="font-medium">{plan.name}</div>
                        <div class="text-sm text-gray-600">{plan.date}</div>
                      </div>
                      <Badge
                        variant={plan.status === 'Scheduled' ? 'default' : 'secondary'}
                        class={plan.status === 'Scheduled'
                          ? 'bg-blue-500'
                          : 'bg-amber-100 text-amber-700'}
                      >
                        {plan.status}
                      </Badge>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}

          {#if tabValue === 'shifts'}
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-lg">Scheduled Shifts</h3>
                <Button variant="outline" size="sm">View Calendar</Button>
              </div>

              <div class="flex flex-row gap-4 overflow-x-auto pb-2">
                {#each Array(4) as _, idx}
                  <Card.Root class="min-w-[250px] shadow-sm">
                    <Card.Header class="pb-2">
                      <Card.Title class="text-md">April {10 + idx}, 2025</Card.Title>
                      <Card.Description>7:00 AM - 3:00 PM</Card.Description>
                    </Card.Header>
                    <Card.Content class="pb-2">
                      <div class="text-sm">
                        <div class="flex items-center gap-2 mb-1">
                          <Building2 size={16} class="text-gray-500" />
                          <span>Wellness Hospital - Main Kitchen</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <ChefHat size={16} class="text-gray-500" />
                          <span>Breakfast & Lunch Service</span>
                        </div>
                      </div>
                    </Card.Content>
                    <Card.Footer class="pt-0">
                      <Button variant="ghost" size="sm" class="text-blue-600 hover:text-blue-800">
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                {/each}
              </div>

              <div class="mt-6">
                <h3 class="font-medium text-lg mb-3">Availability Settings</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label for="availability" class="text-sm text-gray-600 mb-2 block">
                        Default Availability
                      </Label>
                      <Select.Root type="single" bind:value={availabilityValue}>
                        <Select.Trigger class="w-full">
                          {availabilityTriggerContent}
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each availabilityOptions as option}
                              <Select.Item value={option.value} label={option.label}>
                                {option.label}
                              </Select.Item>
                            {/each}
                          </Select.Group>
                        </Select.Content>
                      </Select.Root>
                    </div>
                    <div>
                      <Label for="maxHours" class="text-sm text-gray-600 mb-2 block">
                        Max Hours per Week
                      </Label>
                      <Input id="maxHours" type="number" value="40" />
                    </div>
                  </div>
                  <Button class="mt-4">Update Availability</Button>
                </div>
              </div>
            </div>
          {/if}

          {#if tabValue === 'prep'}
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-lg">Prep Items History</h3>
                <div class="flex gap-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button variant="default" size="sm">Add New Prep</Button>
                </div>
              </div>

              <div class="bg-white border rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item Name
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Dietary Tags
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each [{ name: 'Vegetable Stock (Low Sodium)', date: 'April 8, 2025', quantity: '20L', tags: ['Low Sodium', 'Vegan'] }, { name: 'Diabetic-Friendly Desserts', date: 'April 7, 2025', quantity: '50 servings', tags: ['Diabetic', 'Low Sugar'] }, { name: 'Gluten-Free Bread', date: 'April 6, 2025', quantity: '30 loaves', tags: ['Gluten-Free'] }, { name: 'Protein-Rich Soup Base', date: 'April 5, 2025', quantity: '15L', tags: ['High Protein', 'Low Fat'] }, { name: 'Soft Texture Meals', date: 'April 4, 2025', quantity: '25 servings', tags: ['Soft Diet', 'Senior-Friendly'] }] as item, idx}
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div class="flex flex-wrap gap-1">
                            {#each item.tags as tag}
                              <Badge
                                variant="outline"
                                class="bg-green-50 text-green-700 border-green-200 text-xs"
                              >
                                {tag}
                              </Badge>
                            {/each}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          {/if}

          {#if tabValue === 'production'}
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-lg">Production Plans</h3>
                <Button size="sm">Create New Plan</Button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each [{ name: 'Weekly Meal Prep - Cardiac Unit', date: 'April 10, 2025', status: 'Scheduled', dietaryFocus: ['Low Sodium', 'Low Fat', 'Heart Healthy'], servings: 75 }, { name: 'Special Diet Menu Planning', date: 'April 11, 2025', status: 'Pending Approval', dietaryFocus: ['Diabetic', 'Gluten-Free', 'Dairy-Free'], servings: 50 }, { name: 'School Lunch Program', date: 'April 15, 2025', status: 'Draft', dietaryFocus: ['Balanced Nutrition', 'Kid-Friendly', 'Allergen-Free Options'], servings: 200 }, { name: 'Wellness Retreat Weekend', date: 'April 17-19, 2025', status: 'Planning', dietaryFocus: ['Plant-Based', 'Whole Foods', 'Anti-Inflammatory'], servings: 40 }] as plan, idx}
                  <Card.Root class="shadow-sm">
                    <Card.Header class="pb-2">
                      <div class="flex justify-between items-start">
                        <Card.Title class="text-md">{plan.name}</Card.Title>
                        <Badge
                          variant={plan.status === 'Scheduled' ? 'default' : 'secondary'}
                          class={plan.status === 'Scheduled'
                            ? 'bg-blue-500'
                            : plan.status === 'Pending Approval'
                              ? 'bg-amber-100 text-amber-700'
                              : plan.status === 'Draft'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-purple-100 text-purple-700'}
                        >
                          {plan.status}
                        </Badge>
                      </div>
                      <Card.Description>{plan.date}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                      <div class="text-sm space-y-2">
                        <div>
                          <span class="text-gray-600">Servings:</span>
                          {plan.servings}
                        </div>
                        <div>
                          <span class="text-gray-600">Dietary Focus:</span>
                          <div class="flex flex-wrap gap-1 mt-1">
                            {#each plan.dietaryFocus as focus}
                              <Badge
                                variant="outline"
                                class="bg-green-50 text-green-700 border-green-200 text-xs"
                              >
                                {focus}
                              </Badge>
                            {/each}
                          </div>
                        </div>
                      </div>
                    </Card.Content>
                    <Card.Footer class="flex justify-between pt-0">
                      <Button variant="ghost" size="sm" class="text-blue-600 hover:text-blue-800">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">Edit Plan</Button>
                    </Card.Footer>
                  </Card.Root>
                {/each}
              </div>
            </div>
          {/if}

          {#if tabValue === 'settings'}
            <div class="space-y-6">
              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <UserCircle size={20} />
                  Personal Information
                </h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label for="firstName" class="text-sm text-gray-600">First Name</Label>
                      <Input id="firstName" value={user.firstName} class="mt-1" />
                    </div>
                    <div>
                      <Label for="lastName" class="text-sm text-gray-600">Last Name</Label>
                      <Input id="lastName" value={user.lastName} class="mt-1" />
                    </div>
                    <div>
                      <Label for="email" class="text-sm text-gray-600">Email</Label>
                      <Input id="email" value={user.email} class="mt-1" />
                    </div>
                    <div>
                      <Label for="role" class="text-sm text-gray-600">Role</Label>
                      <Input id="role" value={user.role} class="mt-1" />
                    </div>
                  </div>
                  <Button class="mt-4">Save Changes</Button>
                </div>
              </div>

              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <Lock size={20} />
                  Security
                </h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="space-y-4">
                    <div>
                      <Label for="currentPassword" class="text-sm text-gray-600"
                        >Current Password</Label
                      >
                      <Input id="currentPassword" type="password" class="mt-1" />
                    </div>
                    <div>
                      <Label for="newPassword" class="text-sm text-gray-600">New Password</Label>
                      <Input id="newPassword" type="password" class="mt-1" />
                    </div>
                    <div>
                      <Label for="confirmPassword" class="text-sm text-gray-600"
                        >Confirm New Password</Label
                      >
                      <Input id="confirmPassword" type="password" class="mt-1" />
                    </div>
                  </div>
                  <Button class="mt-4">Change Password</Button>
                </div>
              </div>

              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <Bell size={20} />
                  Notifications
                </h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Shift Reminders</div>
                        <div class="text-sm text-gray-600">
                          Receive notifications about upcoming shifts
                        </div>
                      </div>
                      <div class="relative">
                        <input type="checkbox" checked class="toggle toggle-primary" />
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Production Plan Updates</div>
                        <div class="text-sm text-gray-600">
                          Get notified about changes to production plans
                        </div>
                      </div>
                      <div class="relative">
                        <input type="checkbox" checked class="toggle toggle-primary" />
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Inventory Alerts</div>
                        <div class="text-sm text-gray-600">
                          Alerts about low inventory or expiring items
                        </div>
                      </div>
                      <div class="relative">
                        <input type="checkbox" checked class="toggle toggle-primary" />
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Recipe Approvals</div>
                        <div class="text-sm text-gray-600">
                          Notifications when recipes need approval
                        </div>
                      </div>
                      <div class="relative">
                        <input type="checkbox" checked class="toggle toggle-primary" />
                      </div>
                    </div>
                  </div>
                  <Button class="mt-4">Save Notification Preferences</Button>
                </div>
              </div>

              <div>
                <h3 class="font-medium text-lg mb-3 flex items-center gap-2">
                  <Settings size={20} />
                  Dietary Specialties
                </h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-2">
                    {#each ['Diabetic', 'Gluten-Free', 'Low Sodium', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Low Fat', 'High Protein', 'Dairy-Free', 'Nut-Free', 'Soft Diet'] as specialty, idx}
                      <div class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`specialty-${idx}`}
                          class="checkbox"
                          checked={isSpecialtyIncluded(specialty)}
                        />
                        <label for={`specialty-${idx}`} class="text-sm">{specialty}</label>
                      </div>
                    {/each}
                  </div>
                  <Button class="mt-4">Update Specialties</Button>
                </div>
              </div>
            </div>
          {/if}
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</div>
