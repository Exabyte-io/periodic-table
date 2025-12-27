from . import PERIODIC_TABLE as PERIODIC_TABLE_DATA
from .periodic_table import PeriodicTable

_periodic_table_instance = PeriodicTable(PERIODIC_TABLE_DATA)


def get_atomic_mass_from_element(element: str) -> float:
    """
    Get the atomic mass of an element by its symbol.

    Args:
        element: Element symbol (e.g., "Si", "H", "Fe")

    Returns:
        Atomic mass in atomic mass units (amu)

    Raises:
        ValueError: If element symbol is not found
    """
    return _periodic_table_instance.get_atomic_mass(element)

