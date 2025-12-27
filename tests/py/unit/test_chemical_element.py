import pytest

from mat3ra.periodic_table import PERIODIC_TABLE, get_atomic_mass_from_element

# Test cases
ELEMENT_SYMBOLS = ["H", "He", "Li", "C", "N", "O", "Si"]

ELEMENT_PROPERTIES = [
    ("Si", "atomic_mass", 28.0855),
    ("H", "atomic_mass", 1.00794),
    ("Si", "atomic_number", 14),
    ("H", "atomic_number", 1),
    ("Si", "name", "Silicon"),
    ("H", "name", "Hydrogen"),
    ("Si", "density_g_per_cm3", 2.33),
    ("Si", "melting_point_K", 1683),
]


@pytest.mark.parametrize("symbol", ELEMENT_SYMBOLS)
def test_get_element(symbol):
    element = PERIODIC_TABLE[symbol]
    assert element.atomic_number > 0
    assert element.atomic_mass > 0


@pytest.mark.parametrize("symbol", ELEMENT_SYMBOLS)
def test_get_atomic_mass_from_element(symbol):
    mass = get_atomic_mass_from_element(symbol)
    assert isinstance(mass, float)
    assert mass > 0


@pytest.mark.parametrize("symbol,property_name,expected_value", ELEMENT_PROPERTIES)
def test_element_property_access(symbol, property_name, expected_value):
    element = PERIODIC_TABLE[symbol]
    assert getattr(element, property_name) == expected_value

