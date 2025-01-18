import json

# Note: the paths are relative to the root of the project.
# This is meant to work with a non-editable (packaged/zipped) installation, e.g. `pip install ."[tests]"`

f1 = open("./element-bonds.json")
ELEMENT_BONDS = json.load(f1)
f2 = open("./element-colors.json")
ELEMENT_COLORS = json.load(f2)
f3 = open("./periodic-table.json")
PERIODIC_TABLE = json.load(f3)

with open("src/py/mat3ra/periodic_table/bonds.py", "w") as f:
    f.write("import json\n" + f"ELEMENT_BONDS = json.loads(json.dumps({ELEMENT_BONDS}))")

with open("src/py/mat3ra/periodic_table/colors.py", "w") as f:
    f.write("import json\n" + f"ELEMENT_COLORS = json.loads(json.dumps({ELEMENT_COLORS}))")

with open("src/py/mat3ra/periodic_table/__init__.py", "w") as f:
    f.write("import json\n" + f"PERIODIC_TABLE = json.loads(json.dumps({PERIODIC_TABLE}))")
