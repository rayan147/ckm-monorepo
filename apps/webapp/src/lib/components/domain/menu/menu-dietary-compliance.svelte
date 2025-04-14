<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import {
    AlertCircle,
    ShieldCheck,
    AlertTriangle,
    Filter,
    Check,
    ExternalLink
  } from 'lucide-svelte';

  interface Props {
    menuId: number | null;
  }

  let { menuId } = $props();

  interface DietaryInfo {
    restriction: string;
    description: string;
    compliantItems: number;
    totalItems: number;
    compliancePercentage: number;
    items: {
      id: number;
      name: string;
      isCompliant: boolean;
      reason?: string;
    }[];
  }

  interface MenuDietaryCompliance {
    totalItems: number;
    fullyCompliantItems: number;
    restrictions: DietaryInfo[];
    overallComplianceScore: number;
    commonRestrictions: string[];
  }

  let loading = $state(true);
  let error = $state<string | null>(null);
  let data = $state<MenuDietaryCompliance | null>(null);
  let activeRestriction = $state<string | null>(null);
  let showNonCompliantOnly = $state(false);

  // Dummy data for testing
  const dummyData: MenuDietaryCompliance = {
    totalItems: 24,
    fullyCompliantItems: 16,
    overallComplianceScore: 78.5,
    commonRestrictions: ['Gluten-Free', 'Vegetarian', 'Vegan', 'Nut-Free', 'Dairy-Free'],
    restrictions: [
      {
        restriction: 'Gluten-Free',
        description:
          'Foods that do not contain wheat, barley, rye, or their derivatives, suitable for celiac disease and gluten sensitivities.',
        compliantItems: 18,
        totalItems: 24,
        compliancePercentage: 75.0,
        items: [
          {
            id: 1,
            name: 'Classic Burger',
            isCompliant: false,
            reason: 'Contains wheat in the bun'
          },
          {
            id: 2,
            name: 'Caesar Salad',
            isCompliant: false,
            reason: 'Contains croutons made with wheat flour'
          },
          { id: 3, name: 'Grilled Chicken', isCompliant: true },
          { id: 4, name: 'French Fries', isCompliant: true },
          { id: 5, name: 'Chocolate Cake', isCompliant: false, reason: 'Contains wheat flour' },
          { id: 6, name: 'Steak & Vegetables', isCompliant: true }
        ]
      },
      {
        restriction: 'Vegetarian',
        description:
          'Foods that contain no meat products but may include animal byproducts like eggs and dairy.',
        compliantItems: 14,
        totalItems: 24,
        compliancePercentage: 58.3,
        items: [
          { id: 1, name: 'Classic Burger', isCompliant: false, reason: 'Contains beef patty' },
          {
            id: 2,
            name: 'Caesar Salad',
            isCompliant: false,
            reason: 'Contains anchovy in dressing'
          },
          { id: 3, name: 'Vegetable Pasta', isCompliant: true },
          { id: 4, name: 'French Fries', isCompliant: true },
          { id: 5, name: 'Chocolate Cake', isCompliant: true },
          { id: 6, name: 'Garden Salad', isCompliant: true }
        ]
      },
      {
        restriction: 'Vegan',
        description:
          'Foods that contain no animal products or byproducts, including eggs, dairy, and honey.',
        compliantItems: 10,
        totalItems: 24,
        compliancePercentage: 41.7,
        items: [
          {
            id: 1,
            name: 'Classic Burger',
            isCompliant: false,
            reason: 'Contains beef patty and dairy'
          },
          {
            id: 2,
            name: 'Caesar Salad',
            isCompliant: false,
            reason: 'Contains egg, dairy, and anchovy'
          },
          { id: 3, name: 'Vegetable Pasta', isCompliant: false, reason: 'Contains dairy in sauce' },
          { id: 4, name: 'French Fries', isCompliant: true },
          { id: 5, name: 'Chocolate Cake', isCompliant: false, reason: 'Contains egg and dairy' },
          { id: 6, name: 'Garden Salad (no dressing)', isCompliant: true }
        ]
      },
      {
        restriction: 'Nut-Free',
        description:
          'Foods that do not contain nuts or nut derivatives, suitable for those with nut allergies.',
        compliantItems: 22,
        totalItems: 24,
        compliancePercentage: 91.7,
        items: [
          { id: 1, name: 'Classic Burger', isCompliant: true },
          { id: 2, name: 'Caesar Salad', isCompliant: true },
          { id: 3, name: 'Spinach Salad', isCompliant: false, reason: 'Contains walnuts' },
          { id: 4, name: 'French Fries', isCompliant: true },
          { id: 5, name: 'Chocolate Cake', isCompliant: true },
          { id: 6, name: 'Brownies', isCompliant: false, reason: 'Contains almonds' }
        ]
      },
      {
        restriction: 'Dairy-Free',
        description:
          'Foods that do not contain milk, cheese, butter, or other dairy products, suitable for lactose intolerance or milk allergies.',
        compliantItems: 16,
        totalItems: 24,
        compliancePercentage: 66.7,
        items: [
          { id: 1, name: 'Classic Burger', isCompliant: false, reason: 'Contains cheese' },
          { id: 2, name: 'Caesar Salad', isCompliant: false, reason: 'Contains parmesan cheese' },
          { id: 3, name: 'Grilled Chicken', isCompliant: true },
          { id: 4, name: 'French Fries', isCompliant: true },
          { id: 5, name: 'Chocolate Cake', isCompliant: false, reason: 'Contains butter and milk' },
          { id: 6, name: 'Fruit Sorbet', isCompliant: true }
        ]
      }
    ]
  };

  onMount(() => {
    fetchDietaryCompliance();
  });

  async function fetchDietaryCompliance() {
    if (!menuId) return;

    loading = true;
    error = null;

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use dummy data instead of actual API call
      data = dummyData;

      /* Original API call commented out
      const response = await fetch(`/api/menus/${menuId}/dietary-compliance`);
      if (!response.ok) throw new Error('Failed to fetch dietary compliance data');
      data = await response.json();
      */

      if (data && data.restrictions.length > 0) {
        activeRestriction = data.restrictions[0].restriction;
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      loading = false;
    }
  }

  function getActiveRestrictionData() {
    if (!data || !activeRestriction) return null;
    return data.restrictions.find((r) => r.restriction === activeRestriction);
  }

  function toggleShowNonCompliantOnly() {
    showNonCompliantOnly = !showNonCompliantOnly;
  }

  function getComplianceColor(percentage: number) {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-emerald-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-red-600';
  }

  function getProgressColor(percentage: number) {
    if (percentage >= 90) return 'bg-green-600';
    if (percentage >= 70) return 'bg-emerald-600';
    if (percentage >= 50) return 'bg-amber-600';
    return 'bg-red-600';
  }
</script>

<div>
  <div class="mb-6">
    <h2 class="text-2xl font-bold">Dietary Compliance</h2>
    <p class="text-gray-600 mt-1">
      Ensure your menu meets required dietary specifications for medical needs, allergies, and
      preferences.
    </p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  {:else if error}
    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <AlertCircle class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else if data}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg flex items-center gap-2">
            <ShieldCheck class="h-5 w-5 text-indigo-600" />
            <span>Overall Compliance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Overall Score</span>
                <span class={`font-medium ${getComplianceColor(data.overallComplianceScore)}`}>
                  {data.overallComplianceScore.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={data.overallComplianceScore}
                class={getProgressColor(data.overallComplianceScore)}
              />
            </div>

            <div class="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p class="text-sm text-gray-500">Total Menu Items</p>
                <p class="text-2xl font-bold">{data.totalItems}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Fully Compliant Items</p>
                <p class="text-2xl font-bold">{data.fullyCompliantItems}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg flex items-center gap-2">
            <AlertTriangle class="h-5 w-5 text-amber-600" />
            <span>Common Dietary Restrictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <p class="text-sm text-gray-600 mb-3">
              These are the most common dietary needs you should consider for your menu.
            </p>
            <div class="flex flex-wrap gap-2">
              {#each data.commonRestrictions as restriction}
                <Badge
                  variant="outline"
                  class="cursor-pointer {activeRestriction === restriction
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : ''}"
                  onclick={() => (activeRestriction = restriction)}
                >
                  {restriction}
                </Badge>
              {/each}
            </div>
            <div class="mt-4">
              <a
                href="https://www.dietaryrestrictions.org"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Learn more about dietary requirements</span>
                <ExternalLink class="h-3 w-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="mb-6">
      <Tabs class="w-full">
        <div class="flex justify-between items-center mb-4">
          <TabsList>
            {#each data.restrictions as restriction}
              <TabsTrigger
                value={restriction.restriction}
                onclick={() => (activeRestriction = restriction.restriction)}
                class={activeRestriction === restriction.restriction ? 'bg-indigo-100' : ''}
              >
                {restriction.restriction}
              </TabsTrigger>
            {/each}
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            class="flex items-center gap-2"
            onclick={toggleShowNonCompliantOnly}
          >
            <Filter class="h-4 w-4" />
            <span>{showNonCompliantOnly ? 'Show All' : 'Show Non-Compliant Only'}</span>
          </Button>
        </div>

        {#each data.restrictions as restriction}
          <TabsContent value={restriction.restriction} class="space-y-4">
            <Card>
              <CardHeader class="pb-2">
                <CardTitle>{restriction.restriction}</CardTitle>
                <CardDescription>{restriction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-500">Compliance Score</span>
                      <span
                        class={`font-medium ${getComplianceColor(restriction.compliancePercentage)}`}
                      >
                        {restriction.compliancePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={restriction.compliancePercentage}
                      class={getProgressColor(restriction.compliancePercentage)}
                    />
                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                      <span
                        >{restriction.compliantItems} of {restriction.totalItems} items compliant</span
                      >
                      <span
                        >{restriction.totalItems - restriction.compliantItems} items need attention</span
                      >
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div class="space-y-4">
              <h3 class="text-lg font-medium">Menu Items</h3>

              {#if restriction.items.filter((item) => !showNonCompliantOnly || !item.isCompliant).length === 0}
                <div class="text-center py-8 text-gray-500">
                  <p>No {showNonCompliantOnly ? 'non-compliant ' : ''}items found.</p>
                </div>
              {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each restriction.items.filter((item) => !showNonCompliantOnly || !item.isCompliant) as item}
                    <div
                      class={`border rounded-lg p-4 ${item.isCompliant ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                    >
                      <div class="flex justify-between items-start">
                        <h4 class="font-medium">{item.name}</h4>
                        {#if item.isCompliant}
                          <Badge
                            variant="outline"
                            class="bg-green-100 text-green-800 border-green-200"
                          >
                            <Check class="h-3 w-3 mr-1" />
                            Compliant
                          </Badge>
                        {:else}
                          <Badge variant="outline" class="bg-red-100 text-red-800 border-red-200">
                            <AlertCircle class="h-3 w-3 mr-1" />
                            Non-Compliant
                          </Badge>
                        {/if}
                      </div>

                      {#if !item.isCompliant && item.reason}
                        <div class="mt-2 text-sm text-red-700">
                          <p>{item.reason}</p>
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </TabsContent>
        {/each}
      </Tabs>
    </div>

    <div class="bg-gray-50 border-l-4 border-indigo-500 p-4">
      <div class="flex">
        <ShieldCheck class="h-5 w-5 text-indigo-600 flex-shrink-0 mr-3" />
        <div>
          <h3 class="font-medium text-gray-900">Compliance Best Practices</h3>
          <div class="mt-2 text-sm text-gray-600">
            <ul class="list-disc pl-5 space-y-1">
              <li>Clearly mark all allergens on menu descriptions</li>
              <li>
                Create separate preparation areas for allergen-free foods to prevent
                cross-contamination
              </li>
              <li>Train staff on common dietary restrictions and proper handling procedures</li>
              <li>
                Create alternative options for common restrictions like gluten-free, dairy-free, and
                vegan
              </li>
              <li>
                For healthcare settings, ensure nutritional information is accurately recorded and
                available
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <p class="text-gray-600 mb-2">No dietary compliance data available for this menu yet.</p>
      <p class="text-sm text-gray-500">
        Add menu items with allergen and nutritional information to see compliance analysis.
      </p>
    </div>
  {/if}
</div>
