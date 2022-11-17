/* eslint-disable no-prototype-builtins */
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
 *
 * Sources:
 *   - https://en.wikipedia.org/wiki/Hartree
 *   - https://en.wikipedia.org/wiki/Hartree_atomic_units
 */
export const CONVERSION = {
    length: {
        [UNITS.length.angstrom]: {
            [UNITS.length.picometer]: 100,
        },
        [UNITS.length.bohr]: {
            [UNITS.length.picometer]: 52.9177210903,
            [UNITS.length.angstrom]: 0.529177210903,
        },
    },
    energy: {
        [UNITS.energy.hartree]: {
            [UNITS.energy.electronvolt]: 27.211386245988,
            [UNITS.energy.kJ_mol]: 2625.4996394799,
            [UNITS.energy.kcal_mol]: 627.5094740631,
            [UNITS.energy.joule]: 4.3597447222071e-18,
            [UNITS.energy.wavenumber]: 219474.6313632,
        },
        [UNITS.energy.electronvolt]: {
            [UNITS.energy.kJ_mol]: 96.48533212331287,
            [UNITS.energy.kcal_mol]: 23.06054783062068,
            [UNITS.energy.joule]: 1.602176634e-19,
        },
    },
    mass: {
        [UNITS.mass.atomicMassUnit]: {
            [UNITS.mass.kilogram]: 1.660539066e-27,
            [UNITS.mass.dalton]: 1,
        },
    },
};

/**
 * Convert value from source unit (`from`) to target unit (`to`) using a unit conversion object which has a tree-like
 * structure (see example). If no coefficient can be found in `conversionTree[from][to]`, the reverse operation will
 * be attempted (dividing by `conversionTree[to][from]`).
 *
 * @summary Converts value from one unit to another.
 * @param value {number} - Value to be converted
 * @param obj {Object} - Object containing unit details.
 * @param obj.from {string} - Source unit as in `UNITS` constant
 * @param obj.to {string} - Target unit as in `UNITS` constant
 * @param obj.conversionTree {Object} - Object containing conversion coefficients in a tree-like structure
 *        ( `Obj[fromUnit][toUnit]` )
 * @returns {number|undefined}
 * @example
 *  convertUnit(1,
 *    {
 *       from: UNITS.energy.hartree,
 *       to: UNITS.energy.electronvolt,
 *       conversionTree: {
 *           hartree: {
 *               eV: 27.21138
 *           }
 *       }
 *    }
 *  );
 *  // returns 27.21138
 */
export function convertUnit(
    value,
    {
        from = UNITS.energy.electronvolt,
        to = UNITS.energy.electronvolt,
        conversionTree = CONVERSION.energy,
    },
) {
    if (typeof value !== "number") {
        return undefined;
    }
    if (from === to) {
        return value;
    }
    if (conversionTree.hasOwnProperty(from) && conversionTree[from].hasOwnProperty(to)) {
        return value * conversionTree[from][to];
    }
    if (conversionTree.hasOwnProperty(to) && conversionTree[to].hasOwnProperty(from)) {
        return value / conversionTree[to][from];
    }
    console.warn([value, from, to], "Unable to convert unit of energy!");
    return undefined;
}
