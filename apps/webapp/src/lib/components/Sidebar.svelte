<script>
	import { page } from '$app/stores';
	import {
		Home,
		ChefHat,
		Book,
		ShoppingCart,
		Users,
		Calendar,
		Settings,
		Building2,
		Search
	} from 'lucide-svelte';
	import Chef from './chef.svelte';
	import { fly } from 'svelte/transition';

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard', icon: Home },
		{ href: '/dashboard/kitchen', label: 'Kitchen', icon: ChefHat },
		{ href: '/dashboard/menus', label: 'Menus', icon: Book },
		{ href: '/dashboard/inventory', label: 'Inventory', icon: ShoppingCart },
		{ href: '/dashboard/staff', label: 'Staff', icon: Users },
		{ href: '/dashboard/schedules', label: 'Schedules', icon: Calendar },
		{ href: '/dashboard/cookbooks', label: 'Cookbooks', icon: Book },
		{ href: '/dashboard/organization', label: 'Organization', icon: Building2 }
	];

	let searchQuery = $state('');
	let isSearchFocused = $state(false);

	function handleSearch() {
		// Implement search functionality here
		console.log('Searching for:', searchQuery);
	}
</script>

<aside class="min-h-screen text-gray-100 bg-gradient-to-b from-blue-800 to-indigo-900">
	<div class="flex flex-col h-full">
		<!-- Logo or Branding -->
		<a href="/" class="flex items-center h-20 px-6 bg-blue-900 bg-opacity-30">
			<div class="flex items-center h-20 px-6 bg-blue-900 bg-opacity-30">
				<Chef class="w-8 h-8 mr-2" />
				<span class="text-xl font-bold tracking-wide">CKM</span>
			</div>
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

		<!-- Navigation -->
		<nav class="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
			{#each navItems as item}
				<a
					href={item.href}
					class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
            {$page.url.pathname === item.href
						? 'bg-white bg-opacity-10 text-white shadow-md'
						: 'text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white'}"
					aria-current={$page.url.pathname === item.href ? 'page' : undefined}
				>
					<item.icon
						class="w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200
              {$page.url.pathname === item.href
							? 'text-blue-300'
							: 'text-gray-400 group-hover:text-blue-300'}"
						aria-hidden="true"
					/>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Settings Button -->
		<div class="flex-shrink-0 p-4 bg-indigo-900 bg-opacity-30">
			<a href="/dashboard/settings" class="block">
				<button
					class="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 ease-in-out rounded-lg hover:bg-white hover:bg-opacity-5 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
				>
					<Settings class="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-300" />
					Settings
				</button>
			</a>
		</div>
	</div>
</aside>
