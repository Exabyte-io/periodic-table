import path from "path";
import fs from "fs-extra";

const ELEMENTS_JSON_PATH = path.resolve(__dirname, "../../periodic-table.json");
const ELEMENTS = fs.readFileSync(ELEMENTS_JSON_PATH, 'utf8');
const ELEMENTS_JS_PATH = path.resolve(__dirname, "elements.js");
fs.writeFile(ELEMENTS_JS_PATH, `var ELEMENTS = ${ELEMENTS}; exports.ELEMENTS = ELEMENTS`);

