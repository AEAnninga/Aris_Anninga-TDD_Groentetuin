const { cornflowerblue } = require("color-name")
const { REGEX_NON_SPECIAL_CHARS } = require("picomatch/lib/constants")

const getYieldForPlant = (plant) => {
    return plant.yield
}

const getYieldForCrop = (input) => {
    return input.numCrops * (input.crop).yield
}

const getTotalYield = (crops) => {
    let totalYield = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        for (i=0; i < crops.crops.length; i++) {
            totalYield += (crops.crops[i].crop.yield) * (crops.crops[i].numCrops)
        }
    } else {
        for (i=0; i < Array.from(crops).length; i++) {
            totalYield += Array.from(crops)[i].crop.yield * Array.from(crops)[i].numCrops 
        }
    }
    return totalYield 
}

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

console.log(getTotalYield(crops))

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield    
}