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

export function getElectronegativity(symbol) {
    const config = ELEMENTS_BY_SYMBOL[symbol];
    return config ? config["pauling_negativity"] : 0;  // return zero if value cannot be accessed by symbol
}

/**
 * Returns bond information for the given elements.
 * The sum of covalent radii times the chemical connectivity factor is used as the default bond length.
 */
export function getElementsBondsData(element1, element2, order = undefined, chemicalConnectivityFactor = 1.05) {
    const element1CovalentRadius = ELEMENTS_BY_SYMBOL[element1].covalent_radius_pm / 100;
    const element2CovalentRadius = ELEMENTS_BY_SYMBOL[element2].covalent_radius_pm / 100;
    const allBonds = [
        ...ELEMENT_BONDS,
        // below is used as default
        {
            "elements": [
                element1,
                element2
            ],
            "energy": {
                "value": "",
                "units": "eV"
            },
            "length": {
                "value": (element1CovalentRadius + element2CovalentRadius) * chemicalConnectivityFactor,
                "units": "angstrom"
            },
            "order": order
        },
    ];
    return allBonds.filter(b => {
        return [element1, element2].every(e => b.elements.includes(e)) && (order ? b.order === order : true);
    });
}

/**
 * Determines whether elements are bonded. Elements are bonded if the distance is equal or less than
 *  - the bond length, if bond length exists, or
 *  - the sum of covalent radii times the chemical connectivity factor (http://www.xcrysden.org/doc/modify.html).
 */
export function areElementsBonded(element1, element2, distance, order = undefined, chemicalConnectivityFactor = 1.05) {
    const allBonds = getElementsBondData(element1, element2, order, chemicalConnectivityFactor);
    return Boolean(allBonds.find(b => b.length.value && b.length.value >= distance));
}
