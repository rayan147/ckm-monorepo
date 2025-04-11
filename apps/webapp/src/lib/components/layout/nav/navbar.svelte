<script lang="ts">
  import Chef from '$lib/images/chef.svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from '$lib/components/ui/dropdown-menu';
  import { ChevronDown } from 'lucide-svelte';

  const auth = {
    user: {
      firstName: 'Rayan'
    },
    logout: async () => {
      console.log(`logging out`);
    }
  };
</script>

<nav class="bg-white border-b border-gray-200">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <div class="flex items-center flex-shrink-0 mr-4">
          <div class="w-auto h-10">
            <Chef />
          </div>
          <span class="ml-2 text-xl font-semibold text-indigo-600">CKM</span>
        </div>

        <div class="hidden lg:ml-6 lg:flex lg:space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger
              class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 flex items-center"
            >
              Solutions <ChevronDown class="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="#" class="w-full">For Caterers</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#" class="w-full">For Hospitals</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#" class="w-full">For Schools</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#features"
            class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50"
          >
            Features
          </a>

          <a
            href="#"
            class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50"
          >
            Pricing
          </a>

          <a
            href="#email-form"
            class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50"
          >
            Contact
          </a>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <a
          href="#email-form"
          class="hidden md:inline-flex px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50"
        >
          Request Demo
        </a>

        {#if auth}
          <div class="hidden md:flex items-center">
            <span class="px-3 py-2 text-sm font-medium text-gray-700">
              Welcome, {auth.user?.firstName}
            </span>
            <Button variant="ghost" size="sm" onclick={() => auth.logout()}>Logout</Button>
          </div>
        {:else}
          <a
            href="/login"
            class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50"
          >
            Login
          </a>
        {/if}

        <Button href="/register" variant="default" size="sm" class="hidden sm:inline-flex">
          Start Free Trial
        </Button>
      </div>
    </div>
  </div>
</nav>
