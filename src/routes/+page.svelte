<script lang="ts">
	let cableType = $state('copper');
	let cableLength = $state(15);
	let power = $state(2000);
	let voltageDropPercentage = $state(2);

	type CableOption = {
		value: string;
		label: string;
		resistivity: number;
	};

	const cableTypes: CableOption[] = [
		{ value: 'copper', label: 'Cuivre', resistivity: 0.0179 },
		{ value: 'aluminum', label: 'Aluminium', resistivity: 0.028 }
	];

	let cableSectionRaw = $derived.by(() => {
		let cableResistivity = cableTypes.find((cable) => cable.value === cableType)?.resistivity ?? 0;
		const nominalVoltage = 230;
		const deltaU_volts = (voltageDropPercentage / 100) * nominalVoltage;

		let calculatedSection =
			(cableResistivity * (2 * cableLength) * power) / (deltaU_volts * nominalVoltage);

		return parseFloat(calculatedSection.toFixed(2));
	});

	type Section = {
		value: number;
	};

	const Sections: Section[] = [
		{ value: 1.5 },
		{ value: 2.5 },
		{ value: 4 },
		{ value: 6 },
		{ value: 10 },
		{ value: 16 },
		{ value: 25 },
		{ value: 35 },
		{ value: 50 },
		{ value: 70 },
		{ value: 95 },
		{ value: 120 }
	];

	let cableSectionDeducted = $derived.by(() => {
		const rawSection = cableSectionRaw;

		if (isNaN(rawSection) || rawSection <= 0) {
			return null;
		}

		for (const section of Sections) {
			if (rawSection <= section.value) {
				return section.value;
			}
		}

		return Sections[Sections.length - 1].value;
	});

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

		<form>
			<div class="mb-4">
				<label for="cableType" class="mb-2 block text-sm font-semibold text-gray-700"
					>Type de Câble :</label
				>
				<select
					id="cableType"
					name="cableType"
					bind:value={cableType}
					class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
				>
					<option value="copper">Cuivre</option>
					<option value="aluminum">Aluminium</option>
				</select>
			</div>

			<div class="mb-4">
				<label for="length" class="mb-2 block text-sm font-semibold text-gray-700"
					>Longueur du Câble (m) :</label
				>
				<input
					type="number"
					id="length"
					name="length"
					bind:value={cableLength}
					class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
					min="0"
					step="any"
				/>
			</div>

			<div class="mb-4" data-type="monophase_power">
				<label for="power" class="mb-2 block text-sm font-semibold text-gray-700"
					>Puissance sur la ligne (W) :</label
				>
				<input
					type="number"
					id="power"
					name="power"
					placeholder="Ex: 2150"
					bind:value={power}
					class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
					min="0"
					step="any"
				/>
			</div>

			<div class="mb-6">
				<label for="voltageDropPercentage" class="mb-2 block text-sm font-semibold text-gray-700"
					>Chute de Tension Admissible (%) :</label
				>
				<input
					type="number"
					id="voltageDropPercentage"
					name="voltageDropPercentage"
					placeholder="Ex: 2"
					bind:value={voltageDropPercentage}
					class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
					min="0"
					max="100"
					step="0.1"
				/>
			</div>
		</form>
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
					<span class="font-medium">chute de tension admissible</span> (en Volts - V), soit la perte
					de tension maximale tolérable sans compromettre le bon fonctionnement des équipements.
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
</div>
