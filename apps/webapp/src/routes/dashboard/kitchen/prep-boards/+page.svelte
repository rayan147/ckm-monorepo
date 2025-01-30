<script lang="ts">
  import { preventDefault } from 'svelte/legacy';
  import { Plus, CheckCircle, XCircle, Clock, Edit, Trash2, ChevronLeft } from 'lucide-svelte';
  import { api } from '@ckm/lib-api';
  import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { PrepStatus, type PrepBoard, type PrepItem } from '@ckm/db';

  let { data } = $props();
  const queryClient = useQueryClient();

  let currentView = $state('list');
  let currentPrepBoard = $state<Omit<PrepBoard, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    status: PrepStatus.PENDING
  });

  // Main Query with initial data from the server
  const prepBoardsQuery = createQuery({
    queryKey: ['prepBoards'],
    queryFn: async (): Promise<PrepBoard[]> => {
      const res = await api.prepBoard.getPrepBoards({});
      if (res.status === 200) return res.body;
      throw new Error('Failed to fetch prep boards');
    },
    initialData: data.prepBoards
  });

  const deleteMutation = createMutation({
    mutationFn: async (id: number) => {
      // Then delete the prep board
      const res = await api.prepBoard.deletePrepBoard({
        params: { id }
      });
      if (res.status !== 200) {
        throw new Error('Failed to delete prep board');
      }
      return res.body;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepBoards'] });
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      alert('Failed to delete prep board. Please try again.');
    }
  });

  // Create Mutation
  const create = createMutation({
    mutationFn: async (createPrepBoard: {
      name: string;
      status: PrepStatus;
    }): Promise<PrepBoard> => {
      const res = await api.prepBoard.createPrepBoard({
        body: { name: createPrepBoard.name, status: createPrepBoard.status }
      });
      if (res.status !== 200) throw new Error('Failed to create prep board');
      return res.body as unknown as PrepBoard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepBoards'] });
      currentView = 'list';
      currentPrepBoard = {
        name: '',
        status: PrepStatus.CANCELLED
      };
    }
  });

  // Update Mutation
  const updateMutation = createMutation({
    mutationFn: async (board: PrepBoard) => {
      const res = await api.prepBoard.updatePrepBoard({
        params: { id: board.id },
        body: board
      });
      if (res.status !== 200) throw new Error('Failed to update prep board');
      return res.body;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepBoards'] });
      currentView = 'list';
      currentPrepBoard = {
        name: '',
        status: 'PENDING'
      };
    }
  });

  async function deletePrepBoard(id: number) {
    if (confirm('Are you sure you want to delete this prep board?')) {
      try {
        $deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  }

  async function savePrepBoard() {
    try {
      if (currentView === 'create') {
        $create.mutateAsync(currentPrepBoard);
      } else {
        if (currentPrepBoard !== null) updateMutation.mutateAsync(currentPrepBoard);
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  }

  function addPrepBoard(e) {
    console.log({ e });
    currentPrepBoard = { name: '', status: 'PENDING', recipes: [], prepItems: [] };
    currentView = 'create';
  }

  function editPrepBoard(board) {
    currentPrepBoard = { ...board };
    currentView = 'edit';
  }

  function viewPrepBoard(board) {
    currentPrepBoard = { ...board };
    currentView = 'view';
  }

  function goBack() {
    currentView = 'list';
    currentPrepBoard = null;
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'COMPLETED':
        return CheckCircle;
      case 'ON_PROGRESS':
        return Clock;
      case 'PENDING':
        return XCircle;
      default:
        return Clock;
    }
  }
</script>

<div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
  {#if currentView === 'list'}
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-semibold text-gray-900">Prep Boards ddd</h1>
      <button
        onclick={addPrepBoard}
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus class="w-5 h-5 mr-2" />
        Add Prep Board
      </button>
    </div>

    {#if $prepBoardsQuery.isLoading}
      <p class="text-center text-gray-500">Loading prep boards...</p>
    {:else if $prepBoardsQuery.isLoadingError}
      <p class="text-center text-red-500">{$prepBoardsQuery.error}</p>
    {:else}
      <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each $prepBoardsQuery.data as board (board.id)}
          {@debug board}
          {@const SvelteComponent = getStatusIcon(board.status)}
          <div
            class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-md"
          >
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <SvelteComponent class="w-8 h-8 mr-3 text-gray-400" />
                  <h2 class="text-xl font-semibold text-gray-900">{board.name}</h2>
                </div>
                <div class="flex space-x-2">
                  <button
                    onclick={() => editPrepBoard(board)}
                    class="text-indigo-600 hover:text-indigo-800"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                  <button
                    onclick={() => deletePrepBoard(board.id)}
                    class="text-red-600 hover:text-red-800"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <dl>
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900">{board.status}</dd>
                <dt class="mt-4 text-sm font-medium text-gray-500">Items</dt>
                <dd class="mt-1 text-sm text-gray-900">{board.prepItems.length} items</dd>
              </dl>
            </div>
            <div class="px-4 py-4 bg-gray-50 sm:px-6">
              <button
                onclick={() => viewPrepBoard(board)}
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Details
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {:else if currentView === 'create' || currentView === 'edit'}
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-semibold text-gray-900">
          {currentView === 'create' ? 'Create Prep Board' : 'Edit Prep Board'}
        </h1>
        <button
          onclick={goBack}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ChevronLeft class="w-5 h-5 mr-2" />
          Back
        </button>
      </div>
      <form onsubmit={preventDefault(savePrepBoard)} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            bind:value={currentPrepBoard.name}
            required
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            bind:value={currentPrepBoard.status}
            class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="PENDING">Pending</option>
            <option value="ON_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentView === 'create' ? 'Create Prep Board' : 'Update Prep Board'}
          </button>
        </div>
      </form>
    </div>
  {:else if currentView === 'view'}
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-semibold text-gray-900">{currentPrepBoard.name}</h1>
        <button
          onclick={goBack}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ChevronLeft class="w-5 h-5 mr-2" />
          Back to List
        </button>
      </div>
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Prep Board Details</h3>
        </div>
        <div class="px-4 py-5 border-t border-gray-200 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currentPrepBoard.status}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Prep Items</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul class="border border-gray-200 divide-y divide-gray-200 rounded-md">
                  {#each currentPrepBoard.prepItems as item (item.id)}
                    <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div class="flex items-center flex-1 w-0">
                        <span class="flex-1 w-0 ml-2 truncate"
                          >{item.recipe.name} (Qty: {item.quantity})</span
                        >
                      </div>
                      <div class="flex-shrink-0 ml-4">
                        <span class="font-medium text-indigo-600 hover:text-indigo-500">
                          {item.status}
                        </span>
                      </div>
                    </li>
                  {/each}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  {/if}
</div>
