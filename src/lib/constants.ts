export type CableOption = {
	value: string;
	label: string;
	resistivity: number;
};

export const cableTypes: CableOption[] = [
	{ value: 'copper', label: 'Cuivre', resistivity: 0.023 },
	{ value: 'aluminum', label: 'Aluminium', resistivity: 0.037 }
];

export type Section = {
	value: number;
};

export const Sections: Section[] = [
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
