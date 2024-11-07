<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { Save } from 'lucide-svelte';

	let restaurantInfo = $state({
		name: '',
		address: '',
		phone: '',
		email: '',
		taxId: ''
	});

	let systemSettings = $state({
		currency: 'USD',
		timeZone: 'UTC',
		language: 'en',
		allowOnlineOrders: false,
		automaticInventoryUpdates: true
	});

	let notificationSettings = $state({
		lowStockAlerts: true,
		newOrderNotifications: true,
		dailyReportEmail: true
	});

	let currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
	let timeZones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
	let languages = ['en', 'es', 'fr', 'de', 'it', 'ja'];

	onMount(async () => {
		// Fetch current settings from API
		await fetchSettings();
	});

	async function fetchSettings() {
		// This would be an API call in a real application
		// For now, we'll use some dummy data
		restaurantInfo = {
			name: 'Gourmet Delights',
			address: '123 Main St, Foodville, FK 12345',
			phone: '(555) 123-4567',
			email: 'info@gourmetdelights.com',
			taxId: '12-3456789'
		};

		// System and notification settings would also be fetched here
	}

	async function saveSettings() {
		// This would be an API call to save the settings
		console.log('Saving settings:', { restaurantInfo, systemSettings, notificationSettings });
		// Implement API call here
		alert('Settings saved successfully!');
	}
</script>

<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900">Settings</h1>
	</div>

	<form onsubmit={preventDefault(saveSettings)} class="mt-8 space-y-12">
		<!-- Restaurant Information -->
		<div>
			<h2 class="text-2xl font-semibold text-gray-900">Restaurant Information</h2>
			<div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-6 sm:grid-cols-6">
				<!-- Restaurant Name -->
				<div class="sm:col-span-3">
					<label for="restaurant-name" class="block text-sm font-medium text-gray-700"
						>Restaurant Name</label
					>
					<input
						type="text"
						name="restaurant-name"
						id="restaurant-name"
						bind:value={restaurantInfo.name}
						class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Address -->
				<div class="sm:col-span-3">
					<label for="address" class="block text-sm font-medium text-gray-700">Address</label>
					<input
						type="text"
						name="address"
						id="address"
						bind:value={restaurantInfo.address}
						class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Phone -->
				<div class="sm:col-span-2">
					<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
					<input
						type="tel"
						name="phone"
						id="phone"
						bind:value={restaurantInfo.phone}
						class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Email -->
				<div class="sm:col-span-2">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={restaurantInfo.email}
						class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Tax ID -->
				<div class="sm:col-span-2">
					<label for="tax-id" class="block text-sm font-medium text-gray-700">Tax ID</label>
					<input
						type="text"
						name="tax-id"
						id="tax-id"
						bind:value={restaurantInfo.taxId}
						class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
			</div>
		</div>

		<!-- System Settings -->
		<div>
			<h2 class="text-2xl font-semibold text-gray-900">System Settings</h2>
			<div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-6 sm:grid-cols-6">
				<!-- Currency -->
				<div class="sm:col-span-2">
					<label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
					<select
						id="currency"
						name="currency"
						bind:value={systemSettings.currency}
						class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>

				<!-- Time Zone -->
				<div class="sm:col-span-2">
					<label for="timezone" class="block text-sm font-medium text-gray-700">Time Zone</label>
					<select
						id="timezone"
						name="timezone"
						bind:value={systemSettings.timeZone}
						class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						{#each timeZones as tz}
							<option value={tz}>{tz}</option>
						{/each}
					</select>
				</div>

				<!-- Language -->
				<div class="sm:col-span-2">
					<label for="language" class="block text-sm font-medium text-gray-700">Language</label>
					<select
						id="language"
						name="language"
						bind:value={systemSettings.language}
						class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						{#each languages as lang}
							<option value={lang}>{lang}</option>
						{/each}
					</select>
				</div>

				<!-- Allow Online Orders -->
				<div class="sm:col-span-3">
					<div class="flex items-center mt-4">
						<input
							id="allow-online-orders"
							name="allow-online-orders"
							type="checkbox"
							bind:checked={systemSettings.allowOnlineOrders}
							class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
						/>
						<label for="allow-online-orders" class="block ml-2 text-sm text-gray-700">
							Allow Online Orders
						</label>
					</div>
				</div>

				<!-- Automatic Inventory Updates -->
				<div class="sm:col-span-3">
					<div class="flex items-center mt-4">
						<input
							id="automatic-inventory-updates"
							name="automatic-inventory-updates"
							type="checkbox"
							bind:checked={systemSettings.automaticInventoryUpdates}
							class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
						/>
						<label for="automatic-inventory-updates" class="block ml-2 text-sm text-gray-700">
							Automatic Inventory Updates
						</label>
					</div>
				</div>
			</div>
		</div>

		<!-- Notification Settings -->
		<div>
			<h2 class="text-2xl font-semibold text-gray-900">Notification Settings</h2>
			<div class="mt-6 space-y-4">
				<!-- Low Stock Alerts -->
				<div class="flex items-center">
					<input
						id="low-stock-alerts"
						name="low-stock-alerts"
						type="checkbox"
						bind:checked={notificationSettings.lowStockAlerts}
						class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
					/>
					<label for="low-stock-alerts" class="block ml-2 text-sm text-gray-700">
						Low Stock Alerts
					</label>
				</div>

				<!-- New Order Notifications -->
				<div class="flex items-center">
					<input
						id="new-order-notifications"
						name="new-order-notifications"
						type="checkbox"
						bind:checked={notificationSettings.newOrderNotifications}
						class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
					/>
					<label for="new-order-notifications" class="block ml-2 text-sm text-gray-700">
						New Order Notifications
					</label>
				</div>

				<!-- Daily Report Email -->
				<div class="flex items-center">
					<input
						id="daily-report-email"
						name="daily-report-email"
						type="checkbox"
						bind:checked={notificationSettings.dailyReportEmail}
						class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
					/>
					<label for="daily-report-email" class="block ml-2 text-sm text-gray-700">
						Daily Report Email
					</label>
				</div>
			</div>
		</div>

		<!-- Save Button -->
		<div class="pt-8">
			<div class="flex justify-end">
				<button
					type="submit"
					class="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<Save class="w-5 h-5 mr-2" />
					Save Settings
				</button>
			</div>
		</div>
	</form>
</div>

<style>
	/* Add any custom styles here */
</style>
