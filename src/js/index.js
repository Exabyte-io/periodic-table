import path from "path";
import fs from "fs-extra";
import _ from "underscore";

const filePath = path.resolve(__dirname, "../../periodic-table.json");
export const ELEMENTS = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export const ELEMENTS_BY_SYMBOL = _.reduce(ELEMENTS, function (memo, item) {
    memo[item.symbol] = item;
    return memo;
}, {});

export function getElectronegativity(symbol) {
    const config = ELEMENTS_BY_SYMBOL[symbol];
    return config ? config["pauling_negativity"] : 0;  // return zero if value cannot be accessed by symbol
}
