import { expect } from "chai";

import {
    ChemicalElement,
    defaultElementsBondsDataEntry,
    ELEMENT_COLORS,
    filterBondsDataByElementsAndOrder,
    getAtomicPropertiesFlat,
    getElectronegativity,
    getElementsBondsData,
    PERIODIC_TABLE,
    UNITS,
} from "../../lib/js/index";

const testCases = [
    {
        el1: "H",
        el2: "H",
        name1: "Hydrogen",
        vdw: "number",
        maxOrder: 1,
        atomicRadiusBohr: 0.47243,
    },
    { el1: "C", el2: "H", name1: "Carbon", vdw: "number", maxOrder: 1, atomicRadiusBohr: 1.32281 },
    {
        el1: "N",
        el2: "H",
        name1: "Nitrogen",
        vdw: "number",
        maxOrder: 1,
        atomicRadiusBohr: 1.22832,
    },
    { el1: "C", el2: "C", name1: "Carbon", vdw: "number", maxOrder: 3, atomicRadiusBohr: 1.32281 },
    {
        el1: "Lr",
        el2: "Lr",
        name1: "Lawrencium",
        vdw: "string",
        maxOrder: undefined,
        atomicRadiusBohr: undefined,
    },
];

testCases.forEach(({ el1, name1, vdw }) => {
    describe("Element:Data", () => {
        it("should return element data", () => {
            const data = PERIODIC_TABLE[el1];
            expect(data.symbol).equal(el1);
            expect(data.name).equal(name1);
            // eslint-disable-next-line no-unused-expressions
            expect(ChemicalElement.isValidSymbol(el1)).to.be.true;
            // eslint-disable-next-line no-unused-expressions
            expect(ChemicalElement.isValidName(name1)).to.be.true;
            const color = ELEMENT_COLORS[el1];
            expect(color)
                .to.be.a("string")
                .and.satisfy((c) => c.startsWith("#"));
            const radius = PERIODIC_TABLE[el1].van_der_Waals_radius_pm;
            expect(radius).to.be.a(vdw);
        });
    });
});

testCases.forEach(({ el1 }) => {
    describe("Element:Electronegativity", () => {
        it("should return electronegativity", () => {
            const data = getElectronegativity(el1);
            expect(data).not.equal(0);
        });
    });
});

testCases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Order", () => {
        it("should return bond order", () => {
            const data = getElementsBondsData(el1, el2);
            const result = filterBondsDataByElementsAndOrder(data, el1, el2, maxOrder);
            expect(result).to.be.length(1);
            expect(result[0].order).to.be.equal(maxOrder);
        });
    });
});

testCases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Entry", () => {
        it("should return bond entry", () => {
            const data = defaultElementsBondsDataEntry(el1, el2, maxOrder);
            expect(data).to.have.keys(["elements", "energy", "length", "order"]);
            expect(data.order).to.be.equal(maxOrder);
        });
    });
});

testCases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Data", () => {
        it("should return bond data", () => {
            const data = getElementsBondsData(el1, el2);
            expect(data).to.be.length(maxOrder || 1);
        });
    });
});

const classPropertyCases = [
    {
        el: "Li",
        mass_kg: 1.153e-26,
        atomicRadius_bohr: 2.7401,
        vdwRadius_ang: 1.82,
        IP_hartree: 0.19802,
    },
    {
        el: "N",
        mass_kg: 2.326e-26,
        atomicRadius_bohr: 1.22832,
        vdwRadius_ang: 1.55,
        IP_hartree: 0.5338,
    },
    {
        el: "I",
        mass_kg: 2.107e-25,
        atomicRadius_bohr: 2.64562,
        vdwRadius_ang: 1.98,
        IP_hartree: 0.38404,
    },
];

classPropertyCases.forEach(({ el }) => {
    describe("ChemicalElement:Data", () => {
        it("should reproduce Periodic Table data", () => {
            const elem = new ChemicalElement(el.toLowerCase());
            const data = PERIODIC_TABLE[el];
            expect(elem.symbol).equal(el);
            expect(elem.name).equal(data.name);
            expect(ChemicalElement.getColorBySymbol(el)).equal(ELEMENT_COLORS[el]);
            if (typeof data.atomic_radius_pm === "number") {
                expect(elem.atomicRadius).to.be.equal(data.atomic_radius_pm);
            } else {
                expect(elem.atomicRadius).to.be.a("undefined");
            }
        });
    });
});

classPropertyCases.forEach(({ el, mass_kg, atomicRadius_bohr, vdwRadius_ang, IP_hartree }) => {
    describe("ChemicalElement:Data", () => {
        it("should convert units", () => {
            const elem = new ChemicalElement(el);
            if (typeof mass_kg === "number") {
                expect(elem.massInUnits(UNITS.mass.kilogram)).to.be.closeTo(mass_kg, 1e-27);
            } else {
                expect(elem.massInUnits(UNITS.mass.kilogram)).to.be.a("undefined");
            }
            // atomic radius
            if (typeof atomicRadius_bohr === "number") {
                expect(elem.atomicRadiusInUnits(UNITS.length.bohr)).to.be.closeTo(
                    atomicRadius_bohr,
                    1e-3,
                );
            } else {
                expect(elem.atomicRadiusInUnits(UNITS.length.bohr)).to.be.a("undefined");
            }
            // vdW radius
            if (typeof vdwRadius_ang === "number") {
                expect(elem.vanDerWaalsRadiusInUnits(UNITS.length.angstrom)).to.be.closeTo(
                    vdwRadius_ang,
                    1e-2,
                );
            } else {
                expect(elem.vanDerWaalsRadiusInUnits(UNITS.length.angstrom)).to.be.a("undefined");
            }
            // ionization potential
            if (typeof IP_hartree === "number") {
                expect(elem.ionizationPotentialInUnits(UNITS.energy.hartree)).to.be.closeTo(
                    IP_hartree,
                    1e-3,
                );
            } else {
                expect(elem.ionizationPotentialInUnits(UNITS.energy.hartree)).to.be.a("undefined");
            }
        });
    });
});

const propertyListCases = [
    {
        elm: ["H", "C"],
        props: ["pauling_negativity"],
        propMap: undefined,
        res: [{ "pauling_negativity:H": 2.2 }, { "pauling_negativity:C": 2.55 }],
    },
    {
        elm: ["Pd", "Ds"],
        props: ["density_g_per_cm3", "atomic_number"],
        propMap: { density_g_per_cm3: "density" },
        res: [{ "density:Pd": 12.02 }, { "atomic_number:Pd": 46 }, { "atomic_number:Ds": 110 }],
    },
];

propertyListCases.forEach(({ elm, props, propMap, res }) => {
    describe("PropertyList", () => {
        it("should generate list", () => {
            expect(
                getAtomicPropertiesFlat({
                    elements: elm,
                    properties: props,
                    propertiesMap: propMap,
                }),
            ).to.deep.equal(res);
        });
    });
});
