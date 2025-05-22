import type { CableOption, Section } from '$lib/constants';

export function calculateCableSectionRaw(
    cableType: string,
    cableLength: number,
    power: number,
    voltageDropPercentage: number,
    cableTypes: CableOption[]
) {
    const nominalVoltage = 230;
    const cableResistivity = cableTypes.find((cable) => cable.value === cableType)?.resistivity ?? 0;
    const deltaU_volts = (voltageDropPercentage / 100) * nominalVoltage;

    const calculatedSection = (cableResistivity * (2 * cableLength) * power) / (deltaU_volts * nominalVoltage);
    return parseFloat(calculatedSection.toFixed(2));
}

export function calculateCableSectionDeducted(rawSection: number, Sections: Section[]): number {
    if (isNaN(rawSection) || rawSection <= 0) {
        return 0;
    }

    for (const section of Sections) {
        if (rawSection <= section.value) {
            return section.value;
        }
    }
    return Sections[Sections.length - 1].value;
}