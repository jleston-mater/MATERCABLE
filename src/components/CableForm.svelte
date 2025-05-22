<script lang="ts">
	let {
		cableType = $bindable(),
		cableLength = $bindable(),
		power = $bindable(),
		voltageDropPercentage = $bindable()
	} = $props<{
		cableType: string;
		cableLength: number;
		power: number;
		voltageDropPercentage: number;
	}>();
</script>

<form>
	<div class="mb-4">
		<label for="cableType" class="mb-2 block text-sm font-semibold text-gray-700"
			>Type de Câble :</label
		>
		<select
			id="cableType"
			name="cableType"
			bind:value={cableType}
			class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
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
			class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
			class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
			class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
			min="0"
			max="100"
			step="0.1"
		/>
	</div>
</form>
