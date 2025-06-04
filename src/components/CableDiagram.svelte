<script lang="ts">
	import { Sections } from '$lib/constants';

	let { cableSectionDeducted = $bindable() } = $props<{
		cableSectionDeducted: number;
	}>();

	const defaultStrokeColor = '#141553';
	const defaultStrokeWidth = 2;
	const highlightStrokeColor = '#FFBF00';
	const highlightStrokeWidth = 2;
	const strokeDashArrayDotted = '4 3';
	const strokeDashArrayFull = '0';

	const topLineLength = $derived(cableSectionDeducted * 5);
	const lineX1 = $derived(200 - topLineLength);
	const lineX2 = $derived(200 + topLineLength);

	function getCircleStyle(circleRadius: number) {
		const sectionDataForCircle = Sections.find((s) => s.value === circleRadius);

		if (
			sectionDataForCircle &&
			cableSectionDeducted !== null &&
			sectionDataForCircle.value === cableSectionDeducted
		) {
			return {
				stroke: highlightStrokeColor,
				'stroke-width': highlightStrokeWidth,
				'stroke-dasharray': strokeDashArrayFull
			};
		} else {
			return {
				stroke: defaultStrokeColor,
				'stroke-width': defaultStrokeWidth,
				'stroke-dasharray': strokeDashArrayDotted
			};
		}
	}
</script>

<div class="!lg:w-1/2">
	<div id="result" class="m-4 text-center text-lg font-semibold text-blue-800">
		<p class="text-indigo-950">Section de câble recommandée</p>
		<p class="text-3xl font-bold text-indigo-950">{cableSectionDeducted} mm²</p>
	</div>
	<div class="flex justify-center p-4 text-center">
		<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
			<line
				x1={lineX1}
				y1="30"
				x2={lineX2}
				y2="30"
				stroke={highlightStrokeColor}
				stroke-width="4"
			/>
			<defs>
				<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
					<stop offset="0%" stop-color="rgba(0,0,0,0)" />
					<stop offset="100%" stop-color="rgba(0,0,0,0)" />
				</radialGradient>
			</defs>

			<g transform="translate(200, 50)">
				{#each [35, 25, 16, 10, 6, 4, 2.5, 1.5] as radius}
					<path
						d="M -{radius * 5} 0 A {radius * 5} {radius * 5} 0 0 0 {radius * 5} 0"
						fill="none"
						stroke={getCircleStyle(radius).stroke}
						stroke-width={getCircleStyle(radius)['stroke-width']}
						stroke-dasharray={getCircleStyle(radius)['stroke-dasharray']}
					/>
				{/each}
			</g>
		</svg>
	</div>
</div>
