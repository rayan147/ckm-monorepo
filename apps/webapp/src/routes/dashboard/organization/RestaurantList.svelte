<script>
	import { onMount } from 'svelte';
	import { Plus, MapPin, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import RestaurantForm from './RestaurantForm.svelte';
	import RestaurantDetails from './RestaurantDetails.svelte';
	import { restaurantStore } from '$lib/stores/restaurantStore';

	let showRestaurantModal = $state(false);
	let showRestaurantDetails = $state(false);
	let selectedRestaurant = $state(null);
	let currentPage = $state(1);
	let itemsPerPage = 5;

	onMount(async () => {
		await restaurantStore.fetchRestaurants();
	});

	function addRestaurant() {
		selectedRestaurant = null;
		showRestaurantModal = true;
	}

	function editRestaurant(restaurant) {
		selectedRestaurant = restaurant;
		showRestaurantModal = true;
	}

	function viewRestaurantDetails(restaurant) {
		selectedRestaurant = restaurant;
		showRestaurantDetails = true;
	}

	function nextPage() {
		if (currentPage < Math.ceil($restaurantStore.restaurants.length / itemsPerPage)) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	let paginatedRestaurants = $derived($restaurantStore.restaurants.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	));
</script>

<div class="mt-8">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-semibold text-gray-900">Restaurants</h2>
		<button
			onclick={addRestaurant}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Add Restaurant
		</button>
	</div>
	<div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
		<ul class="divide-y divide-gray-200">
			{#each paginatedRestaurants as restaurant (restaurant.id)}
				<li>
					<div class="flex items-center px-4 py-4 sm:px-6">
						<div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
							<div>
								<div class="flex text-sm">
									<p class="font-medium text-indigo-600 truncate">{restaurant.name}</p>
								</div>
								<div class="flex mt-2">
									<div class="flex items-center text-sm text-gray-500">
										<MapPin class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
										<p>{restaurant.address}</p>
									</div>
								</div>
							</div>
							<div class="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
								<div class="flex overflow-hidden">
									<p class="text-sm font-medium text-gray-500">
										Manager: {restaurant.manager}
									</p>
								</div>
							</div>
						</div>
						<div class="flex-shrink-0 ml-5">
							<button
								onclick={() => viewRestaurantDetails(restaurant)}
								class="mr-4 font-medium text-indigo-600 hover:text-indigo-500"
							>
								View
							</button>
							<button
								onclick={() => editRestaurant(restaurant)}
								class="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Edit
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex justify-between mt-4">
		<button
			onclick={prevPage}
			disabled={currentPage === 1}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
		>
			<ChevronLeft class="w-5 h-5 mr-2" />
			Previous
		</button>
		<button
			onclick={nextPage}
			disabled={currentPage === Math.ceil($restaurantStore.restaurants.length / itemsPerPage)}
			class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
		>
			Next
			<ChevronRight class="w-5 h-5 ml-2" />
		</button>
	</div>
</div>

{#if showRestaurantModal}
	<RestaurantForm restaurant={selectedRestaurant} on:close={() => (showRestaurantModal = false)} />
{/if}

{#if showRestaurantDetails}
	<RestaurantDetails
		restaurant={selectedRestaurant}
		on:close={() => (showRestaurantDetails = false)}
	/>
{/if}
