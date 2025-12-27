from typing import Dict, Optional

from .element import ChemicalElement


class PeriodicTable:
    """
    Singleton manager for the periodic table of elements.
    Provides access to chemical element data and properties.
    """

    _instance: Optional["PeriodicTable"] = None
    _elements: Dict[str, ChemicalElement]

    def __new__(cls, data: Optional[Dict] = None):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._elements = {}
            if data:
                cls._instance._initialize(data)
        return cls._instance

    def _initialize(self, data: Dict):
        for symbol, element_data in data.items():
            self._elements[symbol] = ChemicalElement(symbol, element_data)

    def get_element(self, symbol: str) -> ChemicalElement:
        symbol_upper = symbol.strip().capitalize()
        if symbol_upper not in self._elements:
            raise ValueError(f"Element symbol '{symbol}' not found in periodic table")
        return self._elements[symbol_upper]

    def get_atomic_mass(self, symbol: str) -> float:
        return self.get_element(symbol).atomic_mass

    def __getitem__(self, symbol: str) -> ChemicalElement:
        return self.get_element(symbol)

    def __contains__(self, symbol: str) -> bool:
        symbol_upper = symbol.strip().capitalize()
        return symbol_upper in self._elements

