import pytest

from mat3ra.periodic_table.helpers import get_atomic_mass_from_element

ELEMENT_MASS_TEST_CASES = [
    ("H", 1.00794),
    ("Si", 28.0855),
]


@pytest.mark.parametrize("element,expected_mass", ELEMENT_MASS_TEST_CASES)
def test_get_atomic_mass_from_element(element, expected_mass):
    mass = get_atomic_mass_from_element(element)
    
    assert isinstance(mass, float)
    assert mass == expected_mass


