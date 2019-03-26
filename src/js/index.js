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
