import pytest
from mat3ra.esse.models.element import Symbol

from mat3ra.periodic_table.element import ChemicalElement

# Test data
SILICON_DATA = {
    "name": "Silicon",
    "symbol": "Si",
    "atomic_number": 14,
    "atomic_mass": 28.0855,
    "density_g_per_cm3": 2.33,
    "melting_point_K": 1683,
    "lattice_structure": "DIA",
}

HYDROGEN_DATA = {
    "name": "Hydrogen",
    "symbol": "H",
    "atomic_number": 1,
    "atomic_mass": 1.00794,
    "density_g_per_cm3": "0.0708 (@ -253°C)",
}

ELEMENT_TEST_CASES = [
    ("Si", SILICON_DATA),
    ("H", HYDROGEN_DATA),
]


@pytest.mark.parametrize("symbol,data", ELEMENT_TEST_CASES)
def test_from_symbol_and_data(symbol, data):
    element = ChemicalElement.from_symbol_and_data(symbol, data)
    
    assert element.symbol == Symbol[symbol]
    assert element.name == data["name"]
    assert element.atomic_number == data["atomic_number"]
    assert element.atomic_mass == data["atomic_mass"]


@pytest.mark.parametrize(
    "symbol,property_name,expected_value",
    [
        ("Si", "density_g_per_cm3", 2.33),
        ("Si", "melting_point_K", 1683),
        ("Si", "lattice_structure", "DIA"),
        ("H", "density_g_per_cm3", "0.0708 (@ -253°C)"),
    ],
)
def test_dynamic_property_access(symbol, property_name, expected_value):
    data = SILICON_DATA if symbol == "Si" else HYDROGEN_DATA
    element = ChemicalElement.from_symbol_and_data(symbol, data)
    
    assert getattr(element, property_name) == expected_value


def test_dynamic_property_access_missing():
    element = ChemicalElement.from_symbol_and_data("Si", SILICON_DATA)
    
    with pytest.raises(AttributeError, match="object has no attribute 'nonexistent'"):
        _ = element.nonexistent
