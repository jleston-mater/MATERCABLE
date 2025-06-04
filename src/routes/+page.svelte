<script lang="ts">
	import CableForm from '../components/CableForm.svelte';
	import CableDiagram from '../components/CableDiagram.svelte';
	import Header from '../components/Header.svelte';

	import { cableTypes, Sections } from '$lib/constants';
	import { calculateCableSectionRaw, calculateCableSectionDeducted } from '$lib/calculations';
	import Formula from '../components/Formula.svelte';

	let cableType = $state('copper');
	let cableLength = $state(15);
	let power = $state(2000);
	let voltageDropPercentage = $state(2);

	let cableSectionRaw = $derived.by(() => {
		return calculateCableSectionRaw(
			cableType,
			cableLength,
			power,
			voltageDropPercentage,
			cableTypes
		);
	});

	let cableSectionDeducted = $derived.by(() => {
		return calculateCableSectionDeducted(cableSectionRaw, Sections);
	});
</script>

<div>
	<Header />

	<div class="place-items-center bg-slate-200 lg:flex-row">
		<div class=" bg-slate-200 p-4 px-4">
			<div
				class="flex flex-col items-center justify-center rounded-4xl border border-indigo-900 bg-white lg:flex-row"
			>
				<CableForm bind:cableType bind:cableLength bind:power bind:voltageDropPercentage />

				<CableDiagram bind:cableSectionDeducted />
			</div>
		</div>
		<Formula bind:cableSectionRaw />
		<div class="p-4">
			<p class="mt-6 text-center text-sm text-black">
				Ces calculs sont des estimations. Toujours consulter les normes électriques locales (e.g., <a
					class="text-blue-600 visited:text-purple-600"
					href="https://fr.wikipedia.org/wiki/NF_C_15-100"
					target="_blank">NF C 15-100</a
				>) et un professionnel qualifié pour des installations réelles.
			</p>
			<p class="mt-6 text-center text-sm text-black">
				© -
				<a
					class="text-blue-600 visited:text-purple-600"
					href="https://www.materfrance.fr/"
					target="_blank">MATERFRANCE</a
				> - Tous droits réservés
			</p>
		</div>
	</div>
</div>
