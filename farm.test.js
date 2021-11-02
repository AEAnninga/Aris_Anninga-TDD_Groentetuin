const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {

        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });
    // added test without curly braces to get 100% test coverage
    test("Calculate total yield with multiple crops without curly braces", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield(crops)).toBe(23);
    });
    // end of added test

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// extra added tests:

describe("getCostsForCrop", () => {
    test("Calculate costs for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getCostsForCrop(crops)).toBe(10);
    });
})

describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getRevenueForCrop(crops)).toBe(60)
    })
})

describe("getProfitForCrop", () => {
    test("Calculate Profit for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            saleprice: 5
        }
        const crop = [
            { crop: corn, numCrops: 5 },
        ];
        const crop2 = [
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getProfitForCrop(crop)).toBe(50)
        expect(getProfitForCrop(crop2)).toBe(34)
    })
})

describe("getTotalProfit", () => {
    test("Calculate total profit multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            saleprice: 5
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit(crops)).toBe(84)
    })
})

// with environmental factors

describe("getYieldForPlant", () => {
    // also: corn does not have factor "soil", but enviromentFactors does
    // so with corn: 100% - 50%(sun) - 25%(wind) - 0%(soil) = 25% from yield = 7.5
    test("Get yield for plant WITH environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        expect(getYieldForPlant(corn)).toBe(7.5);
    });
});

describe("getYieldForCrop", () => {
    // also: corn does not have factor "soil", but enviromentFactors does
    // so with corn: 100% - 50%(sun) - 25%(wind) - 0%(soil) = 25% from yield = 7.5
    test("Get yield for plant WITH environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(7.5);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(6.15);
    });
    // added test without curly braces to get 100% test coverage
    test("Calculate total yield with multiple crops WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield(crops)).toBe(6.15);
    });
    // end of added test

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate costs for crop WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getCostsForCrop(crops)).toBe(16);
        expect(getCostsForCrop({crops})).toBe(16);
    });
})

describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            saleprice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getRevenueForCrop(crops)).toBe(27)
        expect(getRevenueForCrop({crops})).toBe(27)
    })
})

describe("getProfitForCrop", () => {
    test("Calculate Profit for crop WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            saleprice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crop1 = [
            { crop: corn, numCrops: 5 },
        ];
        const crop2 = [
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getProfitForCrop(crop1)).toBe(5)
        expect(getProfitForCrop(crop2)).toBe(6)
        expect(getProfitForCrop({crop1})).toBe(5)
        expect(getProfitForCrop({crop2})).toBe(6)
    })
})

describe("getTotalProfit", () => {
    test("Calculate total profit multiple crops WITH environmentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            saleprice: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -25,
                    high: -50
                },
                rain: {
                    low: 0,
                    medium: 10,
                    high: 25
                }
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            saleprice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -20
                },
                soil: {
                    sand: -50,
                    clay: -10,
                    earth: 0,
                    fertilizer: 25
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit(crops)).toBe(11)
        expect(getTotalProfit({crops})).toBe(11)
    })
})