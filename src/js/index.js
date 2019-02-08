import _ from "underscore";

import {ELEMENTS} from "./elements";
import {VDW_RADII} from "./vdwRadii";
import {ELEMENT_COLORS} from "./colors";

export {ELEMENTS};
export {VDW_RADII};
export {ELEMENT_COLORS};

export const ELEMENTS_BY_SYMBOL = _.reduce(ELEMENTS, function (memo, item) {
    memo[item.symbol] = item;
    return memo;
}, {});

export function getElectronegativity(symbol) {
    const config = ELEMENTS_BY_SYMBOL[symbol];
    return config ? config["pauling_negativity"] : 0;  // return zero if value cannot be accessed by symbol
}
