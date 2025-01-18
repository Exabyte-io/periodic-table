import unittest
from mat3ra.periodic_table import PERIODIC_TABLE
from mat3ra.periodic_table.bonds import ELEMENT_BONDS
from mat3ra.periodic_table.colors import ELEMENT_COLORS

BONDS = [
    {
        "elements": [
            "H",
            "H"
        ],
        "energy": {
            "value": 4.4773799,
            "units": "eV"
        },
        "length": {
            "value": 0.74,
            "units": "angstrom"
        },
        "order": 1
    },
    {
        "elements": [
            "H",
            "B"
        ],
        "energy": {
            "value": 4.03171477,
            "units": "eV"
        },
        "length": {
            "value": 1.19,
            "units": "angstrom"
        },
        "order": 1
    },
    {
        "elements": [
            "H",
            "C"
        ],
        "energy": {
            "value": 4.25972949,
            "units": "eV"
        },
        "length": {
            "value": 1.09,
            "units": "angstrom"
        },
        "order": 1
    },
]

class TestBase(unittest.TestCase):

    def test_periodic_table(self):
        assert PERIODIC_TABLE["H"]["name"] == "Hydrogen"
        assert PERIODIC_TABLE["H"]["atomic_radius_pm"] == 25

    def test_element_bonds(self):
        bond = next(b for b in ELEMENT_BONDS if b["elements"] == ["H", "O"])
        print(bond)
        assert bond["energy"]["value"] == 4.75721615
        assert bond["energy"]["units"] == "eV"
        assert bond["length"]["value"] == 0.96
        assert bond["length"]["units"] == "angstrom"

    def test_element_colors(self):
        assert ELEMENT_COLORS["H"] == "#FFFFFF"
