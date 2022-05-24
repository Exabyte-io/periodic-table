import { ELEMENT_BONDS } from "./element_bonds";
import { ELEMENT_COLORS } from "./element_colors";
import { PERIODIC_TABLE } from "./periodic_table";
import { Element } from "./element";

export { ELEMENT_BONDS };
export { PERIODIC_TABLE };
export { ELEMENT_COLORS };
export { Element };

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
 * @param elements {String[]} - List of elements (as symbols)
 * @param properties {String[]} - List of properties
 * @param propMap {Object} - Object mapping property names to custom names (e.g. {'atomic_radius_pm': 'radius'})
 * @param separator {String} - Separator string for the suffix (default: ':')
 * @returns {Object[]} - List of Objects {property_key: property_value}
 */
export function getAtomicPropertiesFlat(elements, properties, propMap, separator = ":") {
    const allProperties = [];
    const filteredElems = elements.filter((e) => Element.isValidSymbol(e));
    const filteredProps = properties.filter((p) => Element.isValidProperty(p));

    filteredProps.forEach((prop) => {
        const pName = (propMap !== undefined) && propMap.hasOwnProperty(prop) ? propMap[prop] : prop;
        filteredElems.forEach((elem) => {
            const key = `${pName}${separator}${elem}`;
            if (!Array.isArray(PERIODIC_TABLE[elem][prop])) {
                allProperties.push({ [key]: PERIODIC_TABLE[elem][prop] });
            }
        });
    });
    return allProperties;
}
