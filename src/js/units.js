export const UNITS = {
    length: {
        angstrom: "ang",
        bohr: "bohr",
        picometer: "pm",
        nanometer: "nm",
        micrometer: "µm",
        millimeter: "mm",
        meter: "m",
    },
    energy: {
        hartree: "hartree",
        electronvolt: "eV",
        kJ_mol: "kJ/mol",
        kcal_mol: "kcal/mol",
        wavenumber: "cm-1",
        joule: "J",
    },
    mass: {
        kilogram: "kg",
        dalton: "Da",
        atomicMassUnit: "amu",
    },
};

/**
 * Conversion coefficients based on data taken from Wikipedia (date accessed: 05/20/2022)
 */
export const CONVERSION = {
    length: {
        [UNITS.length.angstrom]: {
            [UNITS.length.picometer]: 100,
        },
        [UNITS.length.bohr]: {
            [UNITS.length.picometer]: 52.9177210903,
            [UNITS.length.angstrom]: 0.529177210903,
        }
    },
    energy: {
        [UNITS.energy.hartree]: {
            [UNITS.energy.electronvolt]:  27.211386245988,
            [UNITS.energy.kJ_mol]: 2625.4996394799,
            [UNITS.energy.kcal_mol]: 627.5094740631,
            [UNITS.energy.joule]: 4.3597447222071e-18,
            [UNITS.energy.wavenumber]: 219474.63136320,
        },
        [UNITS.energy.electronvolt]: {
            [UNITS.energy.kJ_mol]: 96.48533212331287,
            [UNITS.energy.kcal_mol]: 23.06054783062068,
            [UNITS.energy.joule]: 1.602176634e-19,
        },
    },
    mass: {
        [UNITS.mass.atomicMassUnit]: {
            [UNITS.mass.kilogram]: 1.6605390660e-27,
            [UNITS.mass.dalton]: 1,
        },
    },
};

export function convertLength(value, {from = "pm", to = "pm"}) {
    if (from === to) return value;

    if (CONVERSION.length.hasOwnProperty(from) && CONVERSION.length[from].hasOwnProperty(to)) {
        return value * CONVERSION.length[from][to];
    } else if (CONVERSION.length.hasOwnProperty(to) && CONVERSION.length[to].hasOwnProperty(from)) {
        return value / CONVERSION.length[to][from];
    } else {
        console.warn([value, from, to], "Unable to convert unit of length!");
        return undefined;
    }
}

export function convertEnergy(value, {from = "eV", to = "eV"}) {
    if (from === to) return value;

    if (CONVERSION.energy.hasOwnProperty(from) && CONVERSION.energy[from].hasOwnProperty(to)) {
        return value * CONVERSION.energy[from][to];
    } else if (CONVERSION.energy.hasOwnProperty(to) && CONVERSION.energy[to].hasOwnProperty(from)) {
        return value / CONVERSION.energy[to][from];
    } else {
        console.warn([value, from, to], "Unable to convert unit of energy!");
        return undefined;
    }
}
