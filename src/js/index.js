import _ from "underscore";

import {PERIDIC_TABLE} from "./peridic_table";
import {ELEMENT_COLORS} from "./element_colors";
import {ELEMENT_VDW_RADIIS} from "./element_vdwRadiis";

export {PERIDIC_TABLE};
export {ELEMENT_COLORS};
export {ELEMENT_VDW_RADIIS};

export const ELEMENTS_BY_SYMBOL = _.reduce(PERIDIC_TABLE, function (memo, item) {
    memo[item.symbol] = item;
    return memo;
}, {});

export function getElectronegativity(symbol) {
    const config = ELEMENTS_BY_SYMBOL[symbol];
    return config ? config["pauling_negativity"] : 0;  // return zero if value cannot be accessed by symbol
}
