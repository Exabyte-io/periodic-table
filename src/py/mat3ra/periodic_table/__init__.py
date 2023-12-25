import json

# Note: the paths are relative to the root of the project.
# This is meant to work with a non-editable (packaged/zipped) installation, e.g. `pip install ."[tests]"`

f1 = open("./element-bonds.json")
ELEMENT_BONDS = json.load(f1)
f2 = open("./element-colors.json")
ELEMENT_COLORS = json.load(f2)
f3 = open("./periodic-table.json")
PERIODIC_TABLE = json.load(f3)
