<!-- Simple test component to debug tabs -->
<script lang="ts">
  const { organizationId } = $props<{
    organizationId?: number;
  }>();
</script>

<div class="border rounded-md p-4 bg-green-50">
  <h2 class="text-lg font-semibold mb-2">User Test Component</h2>
  <p>organizationId: {organizationId || 'Not provided'}</p>
  <pre class="bg-white p-2 rounded mt-2 border">Debug: {JSON.stringify({ organizationId }, null, 2)}</pre>
</div>