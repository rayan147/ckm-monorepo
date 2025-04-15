<script>
  import * as Card from '$lib/components/ui/card';
  import BarChart from '../commons/charts/bar-chart.svelte';
  import LineChart from '../commons/charts/line-chart.svelte';
  import PieChart from '../commons/charts/pie-chart.svelte';

  import MetricCard from '$lib/components/domain/commons/metric-card.svelte';
  import ReviewCard from '$lib/components/domain/commons/review-card.svelte';
  import { Star, TrendingUp, MessageCircle, CheckCircle } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  // Props using Svelte 5 runes
  let { dateRange = '', selectedFacility = '', isLoading = false } = $props();

  // Sample data - replace with actual data from your API
  let satisfactionTrend = $state([
    { month: 'Jan', score: 4.3 },
    { month: 'Feb', score: 4.4 },
    { month: 'Mar', score: 4.2 },
    { month: 'Apr', score: 4.5 },
    { month: 'May', score: 4.7 },
    { month: 'Jun', score: 4.8 }
  ]);

  let feedbackCategories = $state([
    { category: 'Food Quality', count: 45 },
    { category: 'Service', count: 32 },
    { category: 'Ambiance', count: 18 },
    { category: 'Cleanliness', count: 15 },
    { category: 'Value', count: 22 }
  ]);

  let sentimentAnalysis = $state([
    { category: 'Positive', value: 72, color: '#22c55e' },
    { category: 'Neutral', value: 20, color: '#94a3b8' },
    { category: 'Negative', value: 8, color: '#ef4444' }
  ]);

  let recentReviews = $state([
    {
      name: 'Sarah J.',
      rating: 5,
      date: 'June 12, 2023',
      comment:
        'Absolutely loved the new seasonal menu! The service was impeccable and the atmosphere was perfect for our anniversary dinner.'
    },
    {
      name: 'Michael T.',
      rating: 4,
      date: 'June 10, 2023',
      comment:
        'Great food and friendly staff. Waited a bit longer than expected but the quality made up for it.'
    },
    {
      name: 'Emily R.',
      rating: 5,
      date: 'June 7, 2023',
      comment:
        "The chef's special was incredible! Will definitely be coming back to try more menu items."
    }
  ]);

  // Use effect to refetch data when props change
  $effect(() => {
    if (dateRange || selectedFacility) {
      // In a real application, you would fetch data based on these filters
      console.log(`Fetching satisfaction data for ${selectedFacility} over ${dateRange}`);
    }
  });
</script>

{#if isLoading}
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {#each Array(4) as _}
      <Skeleton class="h-32 w-full" />
    {/each}
  </div>
  <div class="grid gap-4 md:grid-cols-2 mt-4">
    {#each Array(2) as _}
      <Skeleton class="h-80 w-full" />
    {/each}
  </div>
  <div class="grid gap-4 md:grid-cols-3 mt-4">
    {#each Array(3) as _}
      <Skeleton class="h-80 w-full" />
    {/each}
  </div>
{:else}
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      title="Overall Rating"
      value="4.8/5"
      trend="up"
      change="0.3"
      period="vs. last quarter"
      icon={Star}
    />
    <MetricCard
      title="NPS Score"
      value="72"
      trend="up"
      change="6"
      period="vs. last month"
      icon={TrendingUp}
    />
    <MetricCard
      title="Review Count"
      value="127"
      trend="up"
      change="18%"
      period="this month"
      icon={MessageCircle}
    />
    <MetricCard
      title="Response Rate"
      value="94%"
      trend="up"
      change="7%"
      period="vs. target"
      icon={CheckCircle}
    />
  </div>

  <div class="grid gap-4 md:grid-cols-2 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Customer Satisfaction Trend</h3>
        <div class="h-80">
          <LineChart
            data={satisfactionTrend}
            xKey="month"
            yKey="score"
            color="#3b82f6"
            xLabel="Month"
            yLabel="Average Rating"
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Feedback by Category</h3>
        <div class="h-80">
          <BarChart
            data={feedbackCategories}
            xKey="category"
            yKey="count"
            colors={['#3b82f6']}
            xLabel="Category"
            yLabel="Mention Count"
          />
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="grid gap-4 md:grid-cols-3 mt-4">
    <Card.Root>
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Sentiment Analysis</h3>
        <div class="h-80">
          <PieChart
            data={sentimentAnalysis}
            nameKey="category"
            valueKey="value"
            colors={sentimentAnalysis.map((item) => item.color)}
          />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root class="md:col-span-2">
      <Card.Content class="pt-6">
        <h3 class="text-lg font-medium mb-4">Recent Reviews</h3>
        <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
          {#each recentReviews as review}
            <ReviewCard
              name={review.name}
              rating={review.rating}
              date={review.date}
              comment={review.comment}
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}
