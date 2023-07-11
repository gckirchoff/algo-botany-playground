<script lang="ts">
	import LSystemCanvas from '../lib/components/LSystemCanvas.svelte';
	import { lSystemConfigs } from '../lib/constants/lSystemConfigs';
</script>

<div class="tree-grid">
	{#each lSystemConfigs as lSystemConfig}
		<LSystemCanvas {...lSystemConfig} />
	{/each}
</div>

<style>
	.tree-grid {
		--padding: 1rem;
		padding: var(--padding);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
		grid-auto-rows: calc(50vh - calc(var(--padding)) * 2);
		gap: var(--padding);
	}
</style>
