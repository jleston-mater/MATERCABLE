<script lang="ts">
	import { Sections } from '$lib/constants';

	let { cableSectionDeducted = $bindable() } = $props<{
		cableSectionDeducted: number;
	}>();

	const defaultStrokeColor = '#141553';
	const defaultStrokeWidth = 0.7;
	const highlightStrokeColor = '#ff977a';
	const highlightStrokeWidth = 2;

	function getCircleStyle(circleRadius: number) {
		const sectionDataForCircle = Sections.find((s) => s.value === circleRadius);

		if (
			sectionDataForCircle &&
			cableSectionDeducted !== null &&
			sectionDataForCircle.value === cableSectionDeducted
		) {
			return {
				stroke: highlightStrokeColor,
				'stroke-width': highlightStrokeWidth
			};
		} else {
			// Otherwise, use default styling
			return {
				stroke: defaultStrokeColor,
				'stroke-width': defaultStrokeWidth
			};
		}
	}
</script>

<div class="rounded-md border border-orange-200 lg:w-1/4">
	<div class=" flex justify-center p-4 text-center">
		<svg width="300" height="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
			<g transform="translate(110,110)">
				<circle
					r="95"
					stroke={getCircleStyle(95).stroke}
					stroke-width={getCircleStyle(95)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="70"
					stroke={getCircleStyle(70).stroke}
					stroke-width={getCircleStyle(70)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="50"
					stroke={getCircleStyle(50).stroke}
					stroke-width={getCircleStyle(50)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="35"
					stroke={getCircleStyle(35).stroke}
					stroke-width={getCircleStyle(35)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="25"
					stroke={getCircleStyle(25).stroke}
					stroke-width={getCircleStyle(25)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="16"
					stroke={getCircleStyle(16).stroke}
					stroke-width={getCircleStyle(16)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="10"
					stroke={getCircleStyle(10).stroke}
					stroke-width={getCircleStyle(10)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="6"
					stroke={getCircleStyle(6).stroke}
					stroke-width={getCircleStyle(6)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="4"
					stroke={getCircleStyle(4).stroke}
					stroke-width={getCircleStyle(4)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="2.5"
					stroke={getCircleStyle(2.5).stroke}
					stroke-width={getCircleStyle(2.5)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
				<circle
					r="1.5"
					stroke={getCircleStyle(1.5).stroke}
					stroke-width={getCircleStyle(1.5)['stroke-width']}
					fill="none"
					class="transition-all duration-300 ease-in-out"
				></circle>
			</g>
		</svg>
	</div>
	<div
		id="result"
		class="m-4 rounded-md border border-orange-200 bg-blue-50 p-4 text-center text-lg font-semibold text-blue-800"
	>
		<p class="text-indigo-950">
			SECTION DE CÂBLE RECOMMANDÉE : <b class="text-xl">{cableSectionDeducted}</b> mm²
		</p>
	</div>
	<div class="mx-auto max-w-xl space-y-4 p-4">
		<h2 class="mb-4 text-center text-lg text-indigo-950">Explication des termes de la formule</h2>

		<div class="space-y-3 text-sm leading-relaxed text-gray-800">
			<div>
				<span class="font-semibold text-orange-300">ρ (rhô)</span> : La
				<span class="font-medium">résistivité</span>
				du conducteur (en Ω·mm²/m). C’est une propriété physique du matériau utilisé, comme le
				<span class="text-orange-300">cuivre</span>
				ou <span class="text-orange-300">l’aluminium</span>.
			</div>

			<div>
				<span class="font-semibold text-orange-300">2L</span> : La
				<span class="font-medium">longueur totale du circuit</span> (en mètres), correspondant à l'aller-retour
				du courant dans le câble (aller + retour).
			</div>

			<div>
				<span class="font-semibold text-orange-300">P</span> : La
				<span class="font-medium">puissance</span> crête circulant sur la ligne (en Watts - W).
			</div>

			<div>
				<span class="font-semibold text-orange-300">ΔU</span> : La
				<span class="font-medium">chute de tension admissible</span> (en Volts - V), soit la perte de
				tension maximale tolérable sans compromettre le bon fonctionnement des équipements.
			</div>

			<div>
				<span class="font-semibold text-orange-300">U</span> : La
				<span class="font-medium">tension nominale</span>
				du réseau (en Volts - V), ici nous utilisons
				<span class="font-medium text-orange-300">230 V</span> pour un circuit monophasé standard français.
			</div>
		</div>
	</div>
</div>
