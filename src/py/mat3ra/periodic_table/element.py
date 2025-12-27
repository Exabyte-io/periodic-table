from typing import Dict, Any

from mat3ra.esse.models.element import ElementSchema


class ChemicalElement:
    """
    Wrapper around ESSE ElementSchema with convenient access to periodic table data.
    """

    def __init__(self, symbol: str, data: Dict[str, Any]):
        self.symbol = symbol
        self._data = data
        self._schema: ElementSchema = ElementSchema(symbol=symbol, properties=[])

    @property
    def name(self) -> str:
        return self._data["name"]

    @property
    def atomic_number(self) -> int:
        return self._data["atomic_number"]

    @property
    def atomic_mass(self) -> float:
        return self._data["atomic_mass"]

    @property
    def schema(self) -> ElementSchema:
        return self._schema

    def __getattr__(self, name: str) -> Any:
        if name in self._data:
            return self._data[name]
        raise AttributeError(f"'{type(self).__name__}' object has no attribute '{name}'")

    def __repr__(self) -> str:
        return f"ChemicalElement(symbol='{self.symbol}', name='{self.name}')"

