<script>
  import { Bell, User } from 'lucide-svelte';
  import { fly } from 'svelte/transition';

  let notifications = [
    { id: 1, message: 'New order received' },
    { id: 2, message: 'Inventory item low on stock' }
    // Add more sample notifications...
  ];

  let showNotifications = $state(false);
  let showUserMenu = $state(false);

  function toggleNotifications() {
    showNotifications = !showNotifications;
  }

  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }

  async function logout(e) {
    // Redirect to login page or home
    console.log(e);
  }
</script>

<header class="bg-gray-100 shadow">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center flex-shrink-0">
        <!-- <h1 class="text-2xl font-bold text-gray-900">CKM OS</h1> -->
      </div>

      <!-- Right Side -->
      <div class="flex items-center">
        <!-- Notifications -->
        <div class="relative">
          <button
            onclick={toggleNotifications}
            class="p-1 text-indigo-600 rounded-full hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <Bell class="w-6 h-6" />
            {#if notifications.length > 0}
              <span
                class="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"
              ></span>
            {/if}
          </button>

          <!-- Notifications Dropdown -->
          {#if showNotifications}
            <div
              class="absolute right-0 z-50 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              transition:fly={{ y: -5, duration: 150 }}
            >
              <div class="py-1">
                {#each notifications as notification}
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {notification.message}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <!-- User Menu -->
        <div class="relative ml-4">
          <button
            onclick={toggleUserMenu}
            class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Open user menu</span>
            <User class="w-8 h-8 text-indigo-600 hover:text-indigo-800" />
          </button>

          <!-- User Dropdown -->
          {#if showUserMenu}
            <div
              class="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              transition:fly={{ y: -5, duration: 150 }}
            >
              <div class="py-1">
                <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </a>
                <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <button
                  onclick={logout}
                  class="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  /* Add any custom styles here */
</style>
