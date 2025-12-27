from typing import Any, Dict

from mat3ra.code.entity import InMemoryEntityPydantic
from mat3ra.esse.models.element import ElementSchema, Symbol
from pydantic import Field


class ChemicalElement(ElementSchema, InMemoryEntityPydantic):
    name: str
    atomic_number: int
    atomic_mass: float
    _data: Dict[str, Any] = Field(default_factory=dict, exclude=True, repr=False)

    @classmethod
    def from_symbol_and_data(cls, symbol: str, data: Dict[str, Any]) -> "ChemicalElement":
        """Factory method to create ChemicalElement from periodic table data."""
        return cls(
            symbol=Symbol[symbol],
            name=data["name"],
            atomic_number=data["atomic_number"],
            atomic_mass=data["atomic_mass"],
            properties=[],
            _data=data,
        )

    def __getattr__(self, name: str) -> Any:
        if name.startswith("_"):
            raise AttributeError(f"'{type(self).__name__}' object has no attribute '{name}'")
        data = object.__getattribute__(self, "_data")
        if name in data:
            return data[name]
        raise AttributeError(f"'{type(self).__name__}' object has no attribute '{name}'")
