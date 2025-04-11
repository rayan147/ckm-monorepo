<script>
  import { fly } from 'svelte/transition';
  import Chef from '$lib/images/chef.svelte';
  import {
    Home,
    ChefHat,
    Book,
    ShoppingCart,
    Users,
    Calendar,
    Settings,
    Building2,
    Search,
    ChevronDown,
    Bell
  } from 'lucide-svelte';

  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  // Import shadcn sidebar components
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { getAuthConext } from '$lib/contexts/auth-context.svelte';
  import { logout } from '$lib/auth';

  let showNotifications = $state(false);
  let isLoggingOut = $state(false);
  const authState = getAuthConext();

  let notifications = [
    { id: 1, message: 'New order received' },
    { id: 2, message: 'Inventory item low on stock' }
    // Add more sample notifications...
  ];
  // Navigation items
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/kitchen', label: 'Kitchen', icon: ChefHat },
    { href: '/dashboard/menus', label: 'Menus', icon: Book },
    { href: '/dashboard/inventory', label: 'Inventory', icon: ShoppingCart },
    { href: '/dashboard/staff', label: 'Staff', icon: Users },
    { href: '/dashboard/schedules', label: 'Schedules', icon: Calendar },
    { href: '/dashboard/organization', label: 'Organization', icon: Building2 }
  ];

  let searchQuery = $state('');
  let isSearchFocused = $state(false);

  function handleSearch() {
    console.log('Searching for:', searchQuery);
  }

  async function handleLogout() {
    try {
      isLoggingOut = true;

      await logout();
      authState.clearAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      isLoggingOut = false;
    }
  }
</script>

<Sidebar.Root class="sidebar-root from-blue-800 to-indigo-900 bg-gradient-to-b text-gray-100">
  <Sidebar.Header>
    <a href="/" class="flex items-center h-20 px-6 bg-blue-900 bg-opacity-30">
      <Chef class="w-8 h-8 mr-2" />
      <span class="text-xl font-bold tracking-wide">CKM</span>
    </a>

    <!-- Global Search -->
    <div class="px-4 py-4">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          onfocus={() => (isSearchFocused = true)}
          onblur={() => (isSearchFocused = false)}
          placeholder="Search..."
          class="w-full px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 bg-white rounded-lg bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-opacity-20"
        />
        <button
          onclick={handleSearch}
          class="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 right-2 top-1/2 hover:text-white"
        >
          <Search size={18} />
        </button>
      </div>
      {#if isSearchFocused}
        <div transition:fly={{ y: -10, duration: 200 }} class="mt-2 text-xs text-gray-400">
          Press Enter to search
        </div>
      {/if}
    </div>
  </Sidebar.Header>

  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Tools</Sidebar.GroupLabel>
      <!-- Navigation -->
      <Sidebar.Menu>
        {#each navItems as item (item.label)}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              {#snippet child({ props })}
                <a href={item.href} {...props}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        {/each}
        <Sidebar.MenuItem>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton {...props}>
                  <Bell class="w-6 h-6" />
                  <span>Notifications</span>
                  {#if notifications.length > 0}
                    <span
                      class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {notifications.length}
                    </span>
                  {/if}
                </Sidebar.MenuButton>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="start"
              sideOffset={5}
              class="w-64 p-0 bg-white rounded-md shadow-lg"
            >
              <div class="p-3 text-sm font-medium border-b text-indigo-800 bg-indigo-50">
                Notifications
              </div>
              <div class="py-1">
                {#each notifications as notification}
                  <DropdownMenu.Item
                    class="px-4 py-3 focus:bg-gray-100 focus:text-gray-900 cursor-default"
                  >
                    <div class="text-sm text-gray-700">
                      {notification.message}
                    </div>
                  </DropdownMenu.Item>
                {/each}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>

  <Sidebar.Footer class="bg-indigo-900 bg-opacity-30">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton {...props}>
            <Settings class="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-300" />
            Settings
            <ChevronDown class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-[--bits-dropdown-menu-anchor-width]">
        <DropdownMenu.Item>
          <a href="/dashboard/profile">
            <span>Account</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <a href="/dashboard/billing">
            <span>Billing</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button onclick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.Footer>
</Sidebar.Root>
