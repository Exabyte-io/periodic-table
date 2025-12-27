from . import PERIODIC_TABLE


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
    symbol = element.strip().capitalize()

    if symbol not in PERIODIC_TABLE:
        raise ValueError(f"Element symbol '{element}' not found in periodic table")

    return PERIODIC_TABLE[symbol]["atomic_mass"]
