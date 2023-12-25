// eslint-disable-next-line import/no-cycle
import { ELEMENT_COLORS, PERIODIC_TABLE } from "./index";
import { CONVERSION, convertUnit, UNITS } from "./units";

export class ChemicalElement {
    /**
     * @summary ChemicalElement class constructor
     * @param {string} symbol - Atomic symbol (not case-sensitive)
     */
    constructor(symbol) {
        this.symbol = symbol;
        this._properties = PERIODIC_TABLE[this.symbol];
    }

    get name() {
        return this._properties.name;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(symbol) {
        if (ChemicalElement.isValidSymbol(symbol, true)) {
            this._symbol = symbol;
        } else if (ChemicalElement.isValidSymbol(symbol, false)) {
            this._symbol = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
        } else {
            throw new Error(`Invalid symbol: ${symbol}`);
        }
    }

    /**
     * @summary Returns atomic mass in amu.
     * @returns {number|undefined} - Atomic mass in amu
     */
    get mass() {
        if (typeof this._properties.atomic_mass === "number") {
            return this._properties.atomic_mass;
        }
        return undefined;
    }

    massInUnits(unit) {
        if (this.mass === undefined) return;
        if (unit === UNITS.mass.kilogram)
            return this.mass * CONVERSION.mass[UNITS.mass.atomicMassUnit][UNITS.mass.kilogram];
    }

    /**
     * Empirical atomic radii (source: [10.1063/1.1725697](https://doi.org/10.1063/1.1725697))
     * @summary Returns empirical atomic radius in pm.
     * @returns {number|undefined}
     */
    get atomicRadius() {
        if (typeof this._properties.atomic_radius_pm === "number") {
            return this._properties.atomic_radius_pm;
        }
        return undefined;
    }

    atomicRadiusInUnits(unit) {
        return convertUnit(this.atomicRadius, {
            from: UNITS.length.picometer,
            to: unit,
            conversionTree: CONVERSION.length,
        });
    }

    /**
     * Van der Waals radius in pm (sources: [10.1021/jp8111556](https://doi.org/10.1021/jp8111556),
     *  [10.1021/j100785a001](https://doi.org/10.1021/j100785a001))
     * @summary Returns van der Waals radius in pm.
     * @returns {number|undefined}
     */
    get vanDerWaalsRadius() {
        if (typeof this._properties.van_der_Waals_radius_pm === "number") {
            return this._properties.van_der_Waals_radius_pm;
        }
        return undefined;
    }

    vanDerWaalsRadiusInUnits(unit) {
        return convertUnit(this.vanDerWaalsRadius, {
            from: UNITS.length.picometer,
            to: unit,
            conversionTree: CONVERSION.length,
        });
    }

    /**
     * First ionization potential in eV
     * @summary Returns first ionization potential in eV.
     * @returns {number|undefined}
     */
    get ionizationPotential() {
        if (typeof this._properties.first_ionizing_kJ_mol === "number") {
            return (
                this._properties.first_ionizing_kJ_mol /
                CONVERSION.energy[UNITS.energy.electronvolt][UNITS.energy.kJ_mol]
            );
        }
        return undefined;
    }

    ionizationPotentialInUnits(unit) {
        return convertUnit(this.ionizationPotential, {
            from: UNITS.energy.electronvolt,
            to: unit,
            conversionTree: CONVERSION.energy,
        });
    }

    static get colors() {
        return ELEMENT_COLORS;
    }

    static getColorBySymbol(symbol) {
        return this.colors[symbol] || "#999";
    }

    static isValidName(elementName) {
        return (
            Object.keys(PERIODIC_TABLE).find((key) => PERIODIC_TABLE[key].name === elementName) !==
            undefined
        );
    }

    /**
     * @summary Determines whether symbol string is valid.
     * @param {string} symbol - Element symbol (e.g. 'Li')
     * @param {boolean} caseSensitive - Whether to use case-sensitive check for symbol (default: false)
     * @returns {boolean}
     */
    static isValidSymbol(symbol, caseSensitive = false) {
        if (!caseSensitive) {
            return (
                Object.keys(PERIODIC_TABLE)
                    .map((s) => s.toLowerCase())
                    .indexOf(symbol.toLowerCase()) > -1
            );
        }
        // eslint-disable-next-line no-prototype-builtins
        return PERIODIC_TABLE.hasOwnProperty(symbol);
    }

    /**
     * @summary Determines whether property string is valid.
     * @param {string} prop - Property name (e.g. 'atomic_number')
     * @returns {boolean}
     */
    static isValidProperty(prop) {
        // eslint-disable-next-line no-prototype-builtins
        return PERIODIC_TABLE.H.hasOwnProperty(prop);
    }
}
