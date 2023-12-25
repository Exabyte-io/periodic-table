import ELEMENT_BONDS from "../../element-bonds.json";
import ELEMENT_COLORS from "../../element-colors.json";
import PERIODIC_TABLE from "../../periodic-table.json";
// eslint-disable-next-line import/no-cycle
import { ChemicalElement } from "./element";
import { UNITS } from "./units";

export { ELEMENT_BONDS };
export { PERIODIC_TABLE };
export { ELEMENT_COLORS };
export { ChemicalElement };
export { UNITS };

/**
 * Returns element electronegativity by symbol.
 * @param symbol {String} element symbol to get electronegativity for.
 * @returns {number}
 */
export function getElectronegativity(symbol) {
    const config = PERIODIC_TABLE[symbol];
    return config ? config.pauling_negativity : 0; // return zero if value cannot be accessed by symbol
}

/**
 * Filters the given bondsData array and returns the entries for given elements and order.
 * @param bondsData {Array} an array of bonds data entries
 * @param element1 {String} symbol of the first element
 * @param element2 {String} symbol of the second element
 * @param order {Number} the bond number
 * @returns {Array}
 */
export function filterBondsDataByElementsAndOrder(
    bondsData,
    element1,
    element2,
    order = undefined,
) {
    return bondsData.filter((b) => {
        return (
            b.elements.sort().toString() === [element1, element2].sort().toString() &&
            (order ? b.order === order : true)
        );
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
    const element1CovalentRadius = PERIODIC_TABLE[element1].covalent_radius_pm / 100;
    const element2CovalentRadius = PERIODIC_TABLE[element2].covalent_radius_pm / 100;
    return {
        elements: [element1, element2],
        energy: {
            value: "",
            units: "eV",
        },
        length: {
            value: element1CovalentRadius + element2CovalentRadius,
            units: "angstrom",
        },
        order,
    };
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
    const config = PERIODIC_TABLE[elementSymbol];
    if (config) {
        return PERIODIC_TABLE[elementSymbol].atomic_radius_pm / 100;
    }
    return 1.0;
}

/**
 *
 * @param obj {Object}
 * @param obj.elements {String[]} - List of elements (as symbols)
 * @param obj.properties {String[]} - List of properties
 * @param obj.propertiesMap {Object} - Object mapping property names to custom names (e.g. `{'atomic_radius_pm': 'radius'}`)
 * @param obj.separator {String} - Separator string for the suffix (default: ':')
 * @returns {Object[]} - List of Objects {property_key: property_value}
 * @example
 * getAtomicPropertiesFlat(
 *     ["H", "Na"],
 *     ["atomic_radius_pm", "atomic_number", "pauling_negativity"],
 *     { atomic_radius_pm: "atomic_radius" }
 * );
 * // returns
 * [
 *     { 'atomic_radius:H': 25 },
 *     { 'atomic_radius:Na': 180 },
 *     { 'atomic_number:H': 1 },
 *     { 'atomic_number:Na': 11 },
 *     { 'pauling_negativity:H': 2.2 },
 *     { 'pauling_negativity:Na': 0.93 }
 * ]
 */
export function getAtomicPropertiesFlat({
    elements,
    properties,
    propertiesMap = undefined,
    separator = ":",
}) {
    const allProperties = [];
    const filteredElems = elements.filter((e) => ChemicalElement.isValidSymbol(e));
    const filteredProps = properties.filter((p) => ChemicalElement.isValidProperty(p));

    filteredProps.forEach((prop) => {
        const pName =
            // eslint-disable-next-line no-prototype-builtins
            propertiesMap !== undefined && propertiesMap.hasOwnProperty(prop)
                ? propertiesMap[prop]
                : prop;
        filteredElems.forEach((elem) => {
            const key = `${pName}${separator}${elem}`;
            const val = PERIODIC_TABLE[elem][prop];
            if (val !== null && val !== "" && !Array.isArray(val)) {
                allProperties.push({ [key]: val });
            }
        });
    });
    return allProperties;
}
