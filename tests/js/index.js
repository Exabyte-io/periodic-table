import { expect } from "chai";
import {
    ELEMENT_BONDS,
    ELEMENT_COLORS,
    ELEMENT_VDW_RADII,
    ELEMENTS_BY_SYMBOL,
    PERIODIC_TABLE,
    getElectronegativity,
    filterBondsDataByElementsAndOrder,
    defaultElementsBondsDataEntry,
    getElementsBondsData,
} from "../../lib/js/index";

const test_cases = [
    { el1: "H", el2: "H", name1: "Hydrogen", vdw: "number", maxOrder: 1},
    { el1: "C", el2: "H", name1: "Carbon", vdw: "number", maxOrder: 1},
    { el1: "N", el2: "H", name1: "Nitrogen", vdw: "number", maxOrder: 1},
    { el1: "C", el2: "C", name1: "Carbon", vdw: "number", maxOrder: 3},
    { el1: "U", el2: "U", name1: "Uranium", vdw: "undefined", maxOrder: undefined},
];

test_cases.forEach(({ el1 , name1, vdw }) => {
    describe("Element:Data", () => {
        it("should return element data", () => {
            const data = ELEMENTS_BY_SYMBOL[el1];
            expect(data.symbol).equal(el1);
            const other = PERIODIC_TABLE[name1];
            expect(data).equal(other);
            const color = ELEMENT_COLORS[el1];
            expect(color).to.be.a("string").and.satisfy(
                (color) => color.startsWith("#")
            );
            const radius = ELEMENT_VDW_RADII[el1];
            expect(radius).to.be.a(vdw);
        })
    })
})

test_cases.forEach(({ el1 }) => {
    describe("Element:Electronegativity", () => {
        it("should return electronegativity", () => {
            const data = getElectronegativity(el1);
            expect(data).not.equal(0);
        })
    })
})

test_cases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Order", () => {
        it("should return bond order", () => {
            const data = getElementsBondsData(el1, el2);
            const result = filterBondsDataByElementsAndOrder(data, el1,  el2, maxOrder);
            console.log(result);
            expect(result).to.be.length(1);
            expect(result[0]["order"]).to.be.equal(maxOrder);
        })
    })
})

test_cases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Entry", () => {
        it("should return bond entry", () => {
            const data = defaultElementsBondsDataEntry(el1, el2, maxOrder);
            expect(data).to.have.keys(["elements", "energy", "length", "order"]);
            expect(data["order"]).to.be.equal(maxOrder);
        })
    })
})

test_cases.forEach(({ el1, el2, maxOrder }) => {
    describe("Bonds:Data", () => {
        it("should return bond data", () => {
            const data = getElementsBondsData(el1, el2);
            console.log(data);
            expect(data).to.be.length(maxOrder || 1);
        })
    })
})
