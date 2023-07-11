<script lang="ts">
	import { onMount } from 'svelte';

	import type { LSystem } from '../lsystem/basic';
	import { Turtle } from '../lsystem/turtle/turtle';

	let w: number;
	let h: number;
	let canvas: HTMLCanvasElement;
	let frame = 0;

	export let lSystem: LSystem;
	export let turtleConfig: { distance: number; angleIncrement: number };
	export let maxGens = 5;

	// const productions: Productions = {
	// 	F: 'F[+F]F[-F]F'
	// };
	// const lSystem = new LSystem('F', productions);

	let gen = 0;
	const updateGen = () => gen++;

	onMount(() => {
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		const turtle = new Turtle(turtleConfig.distance, turtleConfig.angleIncrement, w, h);

		let animationFrame = requestAnimationFrame(animate);
		function animate(t: number) {
			frame++;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (frame % 150 === 0) {
				gen++;
			}
			const rules = lSystem.getStringAtGeneration(gen);
			turtle.march(rules, ctx);

			if (gen >= maxGens) {
				cancelAnimationFrame(animationFrame);
				return;
			}

			animationFrame = requestAnimationFrame(animate);
		}
		return () => {
			cancelAnimationFrame(animationFrame);
		};
	});
</script>

<button on:click={updateGen}>Update gen</button>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<canvas bind:this={canvas} width={200} height={200} />
</div>

<style>
	div {
		height: 100%;
	}
	canvas {
		background-color: hsl(197, 71%, 73%);
	}
	button {
		display: none;
	}
</style>
