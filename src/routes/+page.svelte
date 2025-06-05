<script lang="ts">
	import CableForm from '../components/CableForm.svelte';
	import CableDiagram from '../components/CableDiagram.svelte';
	import Header from '../components/Header.svelte';

	import { cableTypes, Sections } from '$lib/constants';
	import { calculateCableSectionRaw, calculateCableSectionDeducted } from '$lib/calculations';
	import Formula from '../components/Formula.svelte';
	import Footer from '../components/Footer.svelte';

	import { ArrowLeftOutline } from 'flowbite-svelte-icons';

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

	<div class="flex flex-col justify-center bg-indigo-200/50">
		<div class="self-center p-4 px-4 lg:w-1/2">
			<div class="mb-3">
				<a
					class="flex flex-row items-center text-indigo-900"
					href="https://www.materfrance.fr/"
					target="_blank"
					><ArrowLeftOutline class="mr-3" />
					<p class="text-sm">Retour au site de MaterFrance</p></a
				>
			</div>
			<div
				class="flex flex-col items-center justify-center rounded-4xl border border-indigo-900 bg-white lg:flex-row"
			>
				<CableForm bind:cableType bind:cableLength bind:power bind:voltageDropPercentage />
				<CableDiagram bind:cableSectionDeducted />
			</div>
		</div>
		<Formula bind:cableSectionRaw />
		<Footer />
	</div>
</div>
