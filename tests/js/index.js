import { expect } from "chai";

import {
    defaultElementsBondsDataEntry,
    ELEMENT_COLORS,
    filterBondsDataByElementsAndOrder,
    getElectronegativity,
    getElementsBondsData,
    PERIODIC_TABLE,
    Element,
} from "../../lib/js/index";

const testCases = [
    { el1: "H", el2: "H", name1: "Hydrogen", vdw: "number", maxOrder: 1 },
    { el1: "C", el2: "H", name1: "Carbon", vdw: "number", maxOrder: 1 },
    { el1: "N", el2: "H", name1: "Nitrogen", vdw: "number", maxOrder: 1 },
    { el1: "C", el2: "C", name1: "Carbon", vdw: "number", maxOrder: 3 },
    { el1: "Lr", el2: "Lr", name1: "Lawrencium", vdw: "string", maxOrder: undefined },
];

testCases.forEach(({ el1, name1, vdw }) => {
    describe("Element:Data", () => {
        it("should return element data", () => {
            const data = PERIODIC_TABLE[el1];
            expect(data.symbol).equal(el1);
            expect(data.name).equal(name1);
            const elem = new Element(el1.toLowerCase());
            expect(elem.symbol).equal(el1);
            expect(Element.isValidSymbol(el1)).to.be.true;
            expect(Element.isValidName(name1)).to.be.true;
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
