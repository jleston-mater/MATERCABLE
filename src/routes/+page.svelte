<script lang="ts">
	import CableForm from '../components/CableForm.svelte';
	import CableDiagram from '../components/CableDiagram.svelte';

	import { cableTypes, Sections } from '$lib/constants';

	let cableType = $state('copper');
	let cableLength = $state(15);
	let power = $state(2000);
	let voltageDropPercentage = $state(2);

	let cableSectionRaw = $derived.by(() => {
		let cableResistivity = cableTypes.find((cable) => cable.value === cableType)?.resistivity ?? 0;
		const nominalVoltage = 230;
		const deltaU_volts = (voltageDropPercentage / 100) * nominalVoltage;

		let calculatedSection =
			(cableResistivity * (2 * cableLength) * power) / (deltaU_volts * nominalVoltage);

		return parseFloat(calculatedSection.toFixed(2));
	});

	let cableSectionDeducted = $derived.by(() => {
		const rawSection = cableSectionRaw;

		if (isNaN(rawSection) || rawSection <= 0) {
			return 0;
		}

		for (const section of Sections) {
			if (rawSection <= section.value) {
				return section.value;
			}
		}

		return Sections[Sections.length - 1].value;
	});
</script>

<div class="mt-10 flex flex-col items-start justify-center gap-10 px-4 lg:flex-row">
	<div class="w-full max-w-md bg-white p-6 lg:w-1/2">
		<div class="mb-4 flex justify-center">
			<a href="https://www.materfrance.fr" target="_blank">
				<img src="../fleur_mater.png" alt="Company Logo" class="h-20 w-20 object-contain" />
			</a>
		</div>

		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800">
			Calculateur de section de câble électrique
		</h2>

		<CableForm bind:cableType bind:cableLength bind:power bind:voltageDropPercentage />

		<div class="rounded-md border border-orange-200">
			<div id="result" class=" p-4 text-center text-lg">
				<div class=" text-lg text-gray-800">
					<div class="flex items-center justify-center">
						<div class="mr-2">Section de câble =</div>
						<div class="flex flex-col items-center">
							<div class="border-b-2 border-gray-500 pb-1">
								<span>&rho;</span> &times; 2L &times; P
							</div>
							<div class="pt-1">&Delta;U &times; U</div>
						</div>
						<div>&nbsp≈ {cableSectionRaw}</div>
					</div>
				</div>
			</div>
		</div>
		<div
			id="errorMessage"
			class="mt-4 hidden rounded-md border border-red-200 bg-red-100 p-3 text-center text-red-800"
		></div>

		<p class="mt-6 text-center text-sm text-gray-600">
			Ces calculs sont des estimations. Toujours consulter les normes électriques locales (e.g., <a
				class="text-blue-600 visited:text-purple-600"
				href="https://fr.wikipedia.org/wiki/NF_C_15-100"
				target="_blank">NF C 15-100</a
			>) et un professionnel qualifié pour des installations réelles.
		</p>
		<p class="mt-6 text-center text-sm text-gray-600">
			© -
			<a
				class="text-blue-600 visited:text-purple-600"
				href="https://www.materfrance.fr/"
				target="_blank">MATERFRANCE</a
			> - Tous droits réservés
		</p>
	</div>

	<CableDiagram bind:cableSectionDeducted />
</div>
