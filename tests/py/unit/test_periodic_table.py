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


def test_init():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    assert len(table.elements) == 3
    assert "H" in table.elements
    assert "He" in table.elements
    assert "Si" in table.elements


def test_get_element():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    h = table.get_element("H")
    assert isinstance(h, ChemicalElement)
    assert h.name == "Hydrogen"
    assert h.atomic_number == 1
    assert h.atomic_mass == 1.00794


@pytest.mark.parametrize("symbol", ["H", "h", " H ", " h "])
def test_get_element_case_insensitive(symbol):
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    element = table.get_element(symbol)
    assert element.name == "Hydrogen"


def test_get_element_not_found():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    with pytest.raises(ValueError, match="not found in periodic table"):
        table.get_element("NotAnElement")


def test_get_atomic_mass():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    mass = table.get_atomic_mass("Si")
    assert mass == 28.0855


def test_getitem():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    si = table["Si"]
    assert si.name == "Silicon"


def test_contains():
    table = PeriodicTable(SIMPLE_PERIODIC_DATA)
    
    assert "H" in table
    assert "Si" in table
    assert "NotAnElement" not in table
