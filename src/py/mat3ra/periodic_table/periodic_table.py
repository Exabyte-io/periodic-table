from typing import Dict

from .element import ChemicalElement


class PeriodicTable:
    """
    Manager for the periodic table of elements.
    Provides access to chemical element data and properties.
    """

    def __init__(self, data: Dict):
        self.elements: Dict[str, ChemicalElement] = {}
        for symbol, element_data in data.items():
            self.elements[symbol] = ChemicalElement.from_symbol_and_data(symbol, element_data)

    def get_element(self, symbol: str) -> ChemicalElement:
        symbol_upper = symbol.strip().capitalize()
        if symbol_upper not in self.elements:
            raise ValueError(f"Element symbol '{symbol}' not found in periodic table")
        return self.elements[symbol_upper]

    def get_atomic_mass(self, symbol: str) -> float:
        return self.get_element(symbol).atomic_mass

    def __getitem__(self, symbol: str) -> ChemicalElement:
        return self.get_element(symbol)

    def __contains__(self, symbol: str) -> bool:
        symbol_upper = symbol.strip().capitalize()
        return symbol_upper in self.elements

