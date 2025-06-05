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

<div class="mater-bg-primary w-full p-6 lg:w-1/2 lg:max-w-md lg:rounded-l-4xl">
	<h2 class="mb-6 text-4xl font-bold text-white">Calculateur de section de câble électrique</h2>
	<form>
		<div class="mb-4">
			<label for="cableType" class="mb-2 block text-sm font-semibold text-white"
				>Type de Câble :</label
			>
			<select
				id="cableType"
				name="cableType"
				bind:value={cableType}
				class="block w-full rounded-lg border border-neutral-200/50 bg-neutral-100/10 px-3 py-2 text-white shadow-sm sm:text-sm"
			>
				<option class="text-black" value="copper">Cuivre</option>
				<option class="text-black" value="aluminum">Aluminium</option>
			</select>
		</div>

		<div class="mb-4">
			<label for="length" class="mb-2 block text-sm font-semibold text-white"
				>Longueur du Câble (m) :</label
			>
			<input
				type="number"
				id="length"
				name="length"
				bind:value={cableLength}
				class="w-full appearance-none rounded-lg border border-neutral-200/50 bg-neutral-100/10 px-3 py-2 leading-tight text-white focus:outline-none"
				min="0"
				step="any"
			/>
		</div>

		<div class="mb-4" data-type="monophase_power">
			<label for="power" class="mb-2 block text-sm font-semibold text-white"
				>Puissance sur la ligne (W) :</label
			>
			<input
				type="number"
				id="power"
				name="power"
				placeholder="Ex: 2150"
				bind:value={power}
				class="w-full appearance-none rounded-lg border border-neutral-200/50 bg-neutral-100/10 px-3 py-2 leading-tight text-white focus:outline-none"
				min="0"
				step="any"
			/>
		</div>

		<div class="mb-6">
			<label for="voltageDropPercentage" class="mb-2 block text-sm font-semibold text-white"
				>Chute de Tension Admissible (%) :</label
			>
			<input
				type="number"
				id="voltageDropPercentage"
				name="voltageDropPercentage"
				placeholder="Ex: 2"
				bind:value={voltageDropPercentage}
				class="w-full appearance-none rounded-lg border border-neutral-200/50 bg-neutral-100/10 px-3 py-2 leading-tight text-white focus:outline-none"
				min="1"
				max="3"
				step="0.1"
			/>
		</div>
	</form>
</div>

<style>
	.mater-bg-primary {
		background-color: #444594;
	}
</style>
