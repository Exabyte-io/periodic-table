import { ELEMENT_COLORS } from "./element_colors";
import { PERIODIC_TABLE } from "./periodic_table.js";
import { CONVERSION, UNITS, convertLength, convertEnergy } from "./units";

export class Element {
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
        if (Element.isValidSymbol(symbol, true)) {
            this._symbol = symbol;
        } else if (Element.isValidSymbol(symbol, false)) {
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
        if (Number.isFinite(this._properties.atomic_mass)) {
            return this._properties.atomic_mass;
        }
    }

    massIn(unit) {
        if (this.mass === undefined) return;
        if (unit === UNITS.mass.kilogram)
            return this.mass * CONVERSION[UNITS.mass.atomicMassUnit][UNITS.mass.kilogram];
    }

    /**
     * Empirical atomic radii (source: [10.1063/1.1725697](https://doi.org/10.1063/1.1725697))
     * @summary Returns empirical atomic radius in pm.
     * @returns {number|undefined}
     */
    get atomicRadius() {
        if (Number.isFinite(this._properties.atomic_radius_pm)) {
            return this._properties.atomic_radius_pm;
        }
    }

    atomicRadiusIn(unit) {
        if (this.atomicRadius === undefined) return;
        return convertLength(this.atomicRadius, { from: UNITS.length.picometer, to: unit });
    }

    /**
     * Van der Waals radius in pm (sources: [10.1021/jp8111556](https://doi.org/10.1021/jp8111556),
     *  [10.1021/j100785a001](https://doi.org/10.1021/j100785a001))
     * @summary Returns van der Waals radius in pm.
     * @returns {number|undefined}
     */
    get vanDerWaalsRadius() {
        if (Number.isFinite(this._properties.van_der_Waals_radius_pm)) {
            return this._properties.van_der_Waals_radius_pm;
        }
    }

    vanDerWaalsRadiusIn(unit) {
        if (this.vanDerWaalsRadius === undefined) return;
        return convertLength(this.vanDerWaalsRadius, { from: UNITS.length.picometer, to: unit });
    }

    /**
     * First ionization potential in eV
     * @summary Returns first ionization potential in eV.
     * @returns {number|undefined}
     */
    get ionizationPotential() {
        if (Number.isFinite(this._properties.first_ionizing_kJ_mol)) {
            return (
                this._properties.first_ionizing_kJ_mol /
                CONVERSION.energy[UNITS.energy.electronvolt][UNITS.energy.kJ_mol]
            );
        }
    }

    ionizationPotentialIn(unit) {
        if (this.ionizationPotential === undefined) return;
        return convertEnergy(this.ionizationPotential, { from: UNITS.energy.electronvolt, to: unit })
    }

    static get colors() {
        return ELEMENT_COLORS;
    }

    static getColorBySymbol(symbol) {
        return (this.colors[symbol] || "#999");
    }

    static isValidName(elementName) {
        return (
            Object.keys(PERIODIC_TABLE).find((key) => PERIODIC_TABLE[key].name === elementName) !== undefined
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
            return Object.keys(PERIODIC_TABLE).map((s) => s.toLowerCase()).indexOf(symbol.toLowerCase()) > -1;
        } else {
            return PERIODIC_TABLE.hasOwnProperty(symbol);
        }
    }

    /**
     * @summary Determines whether property string is valid.
     * @param {string} prop - Property name (e.g. 'atomic_number')
     * @returns {boolean}
     */
    static isValidProperty(prop) {
        return PERIODIC_TABLE.H.hasOwnProperty(prop);
    }
}
