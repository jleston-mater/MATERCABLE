<script lang="ts">
	import CableForm from '../components/CableForm.svelte';
	import CableDiagram from '../components/CableDiagram.svelte';
	import Header from '../components/Header.svelte';

	import { cableTypes, Sections } from '$lib/constants';
	import { calculateCableSectionRaw, calculateCableSectionDeducted } from '$lib/calculations';
	import Formula from '../components/Formula.svelte';
	import Footer from '../components/Footer.svelte';

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

<div class="w-full">
	<Header />

	<div class="  flex w-full flex-col justify-center bg-indigo-200/50">
		<div class="w-full self-center lg:-mt-10 lg:w-1/2 lg:p-4 lg:px-4">
			<div
				class="flex flex-col items-center border border-indigo-900 bg-white lg:flex-row lg:rounded-4xl"
			>
				<CableForm bind:cableType bind:cableLength bind:power bind:voltageDropPercentage />
				<CableDiagram bind:cableSectionDeducted />
			</div>
		</div>
		<Formula bind:cableSectionRaw />
		<Footer />
	</div>
</div>
