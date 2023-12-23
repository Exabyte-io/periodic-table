import os
import json
from pathlib import Path

CURRENT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))

f1 = open(f"{CURRENT_DIR.parent.parent.parent}/element-bonds.json")
ELEMENT_BONDS = json.load(f1)
f2 = open(f"{CURRENT_DIR.parent.parent.parent}/element-colors.json")
ELEMENT_COLORS = json.load(f2)
f3 = open(f"{CURRENT_DIR.parent.parent.parent}/periodic-table.json")
PERIODIC_TABLE = json.load(f3)
