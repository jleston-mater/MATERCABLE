<script lang="ts">
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { PlusOutline, MinusOutline } from 'flowbite-svelte-icons';
	let { cableSectionRaw = $bindable() } = $props<{
		cableSectionRaw: number;
	}>();
</script>

<div class="mx-auto space-y-4 p-4 lg:w-1/2">
	<Accordion class="rounded-4xl border-indigo-900  focus:!border-[none]">
		<AccordionItem
			class="border-hidden bg-transparent  hover:bg-transparent focus:bg-transparent  focus:ring-0"
		>
			{#snippet header()}<span class="text-indigo-900"
					>Comment est calculé la section de câble ?</span
				>{/snippet}
			{#snippet arrowup()}
				<MinusOutline class=" h-4 w-4" />
			{/snippet}
			{#snippet arrowdown()}
				<PlusOutline class=" h-4 w-4" />
			{/snippet}
			<div class=" p-4 text-center text-lg">
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
		</AccordionItem>
	</Accordion>
</div>
