const { cornflowerblue } = require("color-name")
const { REGEX_NON_SPECIAL_CHARS } = require("picomatch/lib/constants")
const { typeOf } = require("react-is")

/* 
environmentFactors must be declared and initiated in farm.js, because it is not passed into the function with the tests
*/
const environmentFactors = {
    sun: "low",
    wind: "medium",
    soil: "clay"
}

/* ------------------------------------------------------------------------------------- */

const getYieldForPlant = (plant) => {
    if (plant.factors) {
        let factorsArray = Object.keys(environmentFactors)
        let plantYieldPercentage = 100 
        for (i=0; i < factorsArray.length; i++) {
            let factor = factorsArray[i]
            let factorValue = environmentFactors[factor]
            if(plant.factors[factor]) {
                plantYieldPercentage += plant.factors[factor][factorValue]
            } else {
                plantYieldPercentage += 0
            }
        }
        let plantYieldMultiplier = plantYieldPercentage / 100
        return plant.yield * plantYieldMultiplier   
    } else {
        return plant.yield
    }  
}

/* ------------------------------------------------------------------------------------- */

const getYieldForCrop = (crop) => {
    return crop.numCrops * getYieldForPlant(crop.crop)
}
/* ------------------------------------------------------------------------------------- */

const getTotalYield = (crops) => {
    let totalYield = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        crops.crops.forEach(crop => {
            totalYield += getYieldForCrop(crop)  
        })
    } else {
        crops.forEach(crop => {
            totalYield += getYieldForCrop(crop)   
        })
    }
    return totalYield 
}

/* ------------------------------------------------------------------------------------- */
const getCostsForCrop = (crops) => {
    let cost = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        for(z=0; z < crops[Object.keys(crops)].length; z++) {
            cost += crops[Object.keys(crops)][z].crop.cost * crops[Object.keys(crops)][z].numCrops
        } 
        return cost
    } else {
        for(z=0; z < crops.length; z++){
            cost += crops[z].crop.cost * crops[z].numCrops 
        }
        return cost
    } 
}
/* ------------------------------------------------------------------------------------- */

const getRevenueForCrop = (crops) => {
    let revenue = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        for(x=0; x < crops[Object.keys(crops)].length; x++) {
            let cropYield = getYieldForCrop(crops[Object.keys(crops)][x])
            revenue += cropYield * crops[Object.keys(crops)][x].crop.saleprice
        }
        return revenue
    } else {
        for(x=0; x < crops.length; x++) {
            let cropYield = getYieldForCrop(crops[x])
            revenue += cropYield * crops[x].crop.saleprice
        }
        return revenue
    }    
}

/* ------------------------------------------------------------------------------------- */

const getProfitForCrop = (crops) => {
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        let cropRevenue = getRevenueForCrop(crops[Object.keys(crops)])
        let cropCosts = getCostsForCrop(crops[Object.keys(crops)])
        let profit = cropRevenue - cropCosts
        return profit
    } else {
        let cropRevenue = getRevenueForCrop(crops)
        let cropCosts = getCostsForCrop(crops)
        let profit = cropRevenue - cropCosts
        return profit
    }
}

/* ------------------------------------------------------------------------------------- */

const getTotalProfit = (crops) => {
    let totalProfit = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        for(y=0; y < crops[Object.keys(crops)].length; y++) {
            crops[Object.keys(crops)].forEach(crop => {
                let cropArray = [crop]
                totalProfit += getProfitForCrop(cropArray)
            })
            return totalProfit
        }
    } else { 
        for(y=0; y < crops.length; y++) {
            crops.forEach(crop => {
                let cropArray = [crop]
                totalProfit += getProfitForCrop(cropArray)
            })
            return totalProfit
        }
    }  
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}