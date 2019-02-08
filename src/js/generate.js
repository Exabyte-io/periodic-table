import path from "path";
import fs from "fs-extra";

// The JSON files are written into JS files to become accessible on both client and server.

const rootDir = path.resolve(__dirname, "../../");

[
    {
        srcFileName: "element-colors.json",
        dstFileName: "colors.js",
        variableName: "ELEMENT_COLORS"
    },
    {
        srcFileName: "periodic-table.json",
        dstFileName: "elements.js",
        variableName: "ELEMENTS"
    },
    {
        srcFileName: "element-vdwRadii",
        dstFileName: "vdwRadii.js",
        variableName: "ELEMENT_VDW_RADII"
    }

].forEach(config => {
    const data = fs.readFileSync(path.resolve(rootDir, config.srcFileName), 'utf8');
    const content = [
        `var ${config.variableName} = ${data}`,
        `exports.${config.variableName} = ${config.variableName}`
    ].join("\n");
    fs.writeFile(path.resolve(__dirname, config.dstFileName), content);
});
