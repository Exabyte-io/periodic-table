[![npm version](https://badge.fury.io/js/%40exabyte-io%2Fperiodic-table.js.svg)](https://badge.fury.io/js/%40mat3ra%2Fperiodic-table)
[![PyPI version](https://badge.fury.io/py/mat3ra-periodic-table.svg)](https://badge.fury.io/py/mat3ra-periodic-table)
[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

# Periodic Table

Data about chemical elements arranged in JSON format. The module also contains a `Element` class for convenient access
to unit conversion of atomic properties (see example below).

The package has a dual-nature as both a Python and a Node.js package.

## 1. Installation

### 1.1. JavaScript

The package can be installed from NPM as follow:

```bash
npm install @mat3ra/periodic-table

```

### 1.2. Python

```bash
pip install mat3ra-periodic-table

```


## 2. Usage

### 2.1. JavaScript

```javascript
import {PERIODIC_TABLE, ChemicalElement} from "@mat3ra/periodic-table";

console.log(PERIODIC_TABLE.H);

const li = new ChemicalElement("Li");
console.log(li.atomicRadiusIn("bohr"));
```

### 2.2. Python

```python
from mat3ra.periodic_table import PERIODIC_TABLE

console.log(PERIODIC_TABLE.H);
```


## 3. Atomic Properties

- `name`: element name
- `symbol`: element symbol
- `atomic_number`: atomic number
- `atomic_mass`: atomic mass in amu
- `atomic_radius_pm`: empirical atomic radius in pm by Slater (doi: [10.1063/1.1725697](https://doi.org/10.1063/1.1725697))
- `covalent_radius_pm`: covalent radius "2008 values" (doi: [10.1039/b801115j](https://doi.org/10.1039/b801115j))
- `van_der_Waal_radius_pm`: van der Waals radius (doi: [10.1021/jp8111556](https://doi.org/10.1021/jp8111556), [10.1021/j100785a001](https://doi.org/10.1021/j100785a001))


## 4. Notes

- Colors are in CPK convention


## 5. Contributions

This repository is an [open-source](LICENSE.md) work-in-progress and we welcome contributions.


## 6. ToDos

- Add python code to make this repository into a python package


## 7. Links

1. Periodic table original source: GPeriodic, Open source Linux software: [link](http://gperiodic.seul.org/)

