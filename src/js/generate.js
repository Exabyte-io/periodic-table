import fs from "fs";
import path from "path";

// The JSON files are written into JS files to become accessible on both client and server.

const rootDir = path.resolve(__dirname, "../../");

[
    {
        srcFileName: "element-bonds.json",
        dstFileName: "element_bonds.js",
        variableName: "ELEMENT_BONDS",
    },
    {
        srcFileName: "element-colors.json",
        dstFileName: "element_colors.js",
        variableName: "ELEMENT_COLORS",
    },
    {
        srcFileName: "periodic-table.json",
        dstFileName: "periodic_table.js",
        variableName: "PERIODIC_TABLE",
    },
].forEach((config) => {
    const data = fs.readFileSync(path.resolve(rootDir, config.srcFileName), "utf8");
    const content = [
        `var ${config.variableName} = ${data}`,
        `exports.${config.variableName} = ${config.variableName}`,
    ].join("\n");
    fs.writeFileSync(path.resolve(__dirname, config.dstFileName), content);
});
