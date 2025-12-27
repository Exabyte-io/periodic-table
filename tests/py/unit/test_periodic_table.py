import pytest

from mat3ra.periodic_table.element import ChemicalElement
from mat3ra.periodic_table.periodic_table import PeriodicTable

SIMPLE_PERIODIC_DATA = {
    "H": {
        "name": "Hydrogen",
        "atomic_number": 1,
        "atomic_mass": 1.00794,
    },
    "He": {
        "name": "Helium",
        "atomic_number": 2,
        "atomic_mass": 4.002602,
    },
    "Si": {
        "name": "Silicon",
        "atomic_number": 14,
        "atomic_mass": 28.0855,
    },
}

ELEMENT_SYMBOLS = ["H", "He", "Li", "C", "N", "O", "Si"]

PERIODIC_TABLE = PeriodicTable(SIMPLE_PERIODIC_DATA)


def test_init():
    assert len(PERIODIC_TABLE.elements) == 3
    assert "H" in PERIODIC_TABLE.elements
    assert "He" in PERIODIC_TABLE.elements
    assert "Si" in PERIODIC_TABLE.elements


def test_get_element():
    h = PERIODIC_TABLE.get_element("H")
    assert isinstance(h, ChemicalElement)
    assert h.name == "Hydrogen"
    assert h.atomic_number == 1
    assert h.atomic_mass == 1.00794


@pytest.mark.parametrize("symbol", ["H", "h", " H ", " h "])
def test_get_element_case_insensitive(symbol):
    element = PERIODIC_TABLE.get_element(symbol)
    assert element.name == "Hydrogen"


def test_get_element_not_found():
    with pytest.raises(ValueError, match="not found in periodic PERIODIC_TABLE"):
        PERIODIC_TABLE.get_element("NotAnElement")


def test_get_atomic_mass():
    mass = PERIODIC_TABLE.get_atomic_mass("Si")
    assert mass == 28.0855


def test_getitem():
    si = PERIODIC_TABLE["Si"]
    assert si.name == "Silicon"


def test_contains():
    assert "H" in PERIODIC_TABLE
    assert "Si" in PERIODIC_TABLE
    assert "NotAnElement" not in PERIODIC_TABLE
