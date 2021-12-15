import _ from "underscore";

import {ELEMENT_BONDS} from "./element_bonds";
import {PERIODIC_TABLE} from "./periodic_table";
import {ELEMENT_COLORS} from "./element_colors";
import {ELEMENT_VDW_RADII} from "./element_vdwRadii";

export {ELEMENT_BONDS};
export {PERIODIC_TABLE};
export {ELEMENT_COLORS};
export {ELEMENT_VDW_RADII};

export const ELEMENTS_BY_SYMBOL = _.reduce(PERIODIC_TABLE, function (memo, item) {
    memo[item.symbol] = item;
    return memo;
}, {});

/**
 * Returns element electronegativity by symbol.
 * @param symbol {String} element symbol to get electronegativity for.
 * @returns {number}
 */
export function getElectronegativity(symbol) {
    const config = ELEMENTS_BY_SYMBOL[symbol];
    return config ? config["pauling_negativity"] : 0;  // return zero if value cannot be accessed by symbol
}

/**
 * Filters the given bondsData array and returns the entries for given elements and order.
 * @param bondsData {Array} an array of bonds data entries
 * @param element1 {String} symbol of the first element
 * @param element2 {String} symbol of the second element
 * @param order {Number} the bond number
 * @returns {Array}
 */
export function filterBondsDataByElementsAndOrder(bondsData, element1, element2, order = undefined) {
    return bondsData.filter(b => {
        return b.elements.sort().toString() === [element1, element2].sort().toString()
            && (order ? b.order === order : true);
    });
}

/**
 * Returns default bond data for given elements. The sum of covalent radii is used as the default bond length.
 * @param element1 {String} symbol of the first element
 * @param element2 {String} symbol of the second element
 * @param order {Number} the bond number
 * @returns {Object}
 */
export function defaultElementsBondsDataEntry(element1, element2, order = undefined) {
    const element1CovalentRadius = ELEMENTS_BY_SYMBOL[element1].covalent_radius_pm / 100;
    const element2CovalentRadius = ELEMENTS_BY_SYMBOL[element2].covalent_radius_pm / 100;
    return {
        "elements": [
            element1,
            element2
        ],
        "energy": {
            "value": "",
            "units": "eV"
        },
        "length": {
            "value": element1CovalentRadius + element2CovalentRadius,
            "units": "angstrom"
        },
        "order": order
    }
}

/**
 * Returns bonds data for given elements.
 * @param element1 {String} symbol of the first element
 * @param element2 {String} symbol of the second element
 * @param order {Number} the bond number
 * @returns {Array}
 */
export function getElementsBondsData(element1, element2, order = undefined) {
    const defaultElementsBondsData = defaultElementsBondsDataEntry(element1, element2, order);
    const bondsData = filterBondsDataByElementsAndOrder(ELEMENT_BONDS, element1, element2, order);
    return bondsData.length ? bondsData : [defaultElementsBondsData];
}

/**
 * Returns the atomic radius for an element based on it's atomic symbol (i.e. 'O' for Oxygen)
 * The atomicRadius returned from PERIODIC_TABLE is in units of picometers (pm).
 * The radius is returned in units of Angstroms. To convert pm to Angstroms, multiply the pm value by 0.01.
 *
 * If the element does not exist inside the PERIODIC_TABLE then the atomicRadius is returned as 1.0.
 * A value of 1.0 is chosen so that if this value is used to set a new lattice size, then the lattice size
 * will not collapse to 0, but will instead have a size of at least 1.0 angstrom.
 *
 * @param elementSymbol {String}
 * @returns {Number}
 */
export function getElementAtomicRadius(elementSymbol) {
    const elementName = Object.keys(PERIODIC_TABLE).find(key => elementSymbol === PERIODIC_TABLE[key].symbol);
    if (elementName) {
        return PERIODIC_TABLE[elementName].atomic_radius_pm * 0.01;
    }
    return 1.0;
}
