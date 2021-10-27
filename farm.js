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

const getCostsForCrop = (crops) => {

    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        return crops.crop.cost * crops.numCrops
    } else {
        return (Array.from(crops)[0].crop).cost * Array.from(crops)[0].numCrops
    }
    
}

const getRevenueForCrop = (crops) => {
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        
        let cropYield = crops.numCrops * crops.crop.yield
        return cropYield * crops.crop.saleprice
    } else {
        let cropYield = Array.from(crops)[0].numCrops * Array.from(crops)[0].crop.yield
        return cropYield * Array.from(crops)[0].crop.saleprice
    }
}

// const corn = {
//     name: "corn",
//     yield: 3,
//     cost: 2,
//     saleprice: 4
// };

// const crops = [
//     { crop: corn, numCrops: 5 },
// ];

// console.log(crops[0].numCrops);
// console.log(crops[0].crop.yield * crops[0].numCrops);
// console.log(crops[0].crop.saleprice * (crops[0].crop.yield * crops[0].numCrops));
// console.log(getRevenueForCrop(crops))

const getProfitForCrop = (crops) => {
    let cropRevenue = getRevenueForCrop(crops)
    let cropCosts = getCostsForCrop(crops)
    return cropRevenue - cropCosts
}

// console.log(getProfitForCrop(crops));

const getTotalProfit = (crops) => {
    let totalProfit = 0
    crops.forEach(crop => {
        console.log(crop)
        totalProfit += getProfitForCrop(crop)
    })
    return totalProfit
}

// const corn = {
//     name: "corn",
//     yield: 3,
//     cost: 2,
//     saleprice: 4
// };
// const pumpkin = {
//     name: "pumpkin",
//     yield: 4,
//     cost: 3,
//     saleprice: 5
// };
// const crops = [
//     { crop: corn, numCrops: 5 },
//     { crop: pumpkin, numCrops: 2 },
// ];

// console.log(crops[0].numCrops)
// console.log(getTotalProfit(crops))


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}