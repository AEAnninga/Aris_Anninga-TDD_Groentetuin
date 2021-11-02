const { cornflowerblue } = require("color-name")
const { REGEX_NON_SPECIAL_CHARS } = require("picomatch/lib/constants")
const { typeOf } = require("react-is")

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
const environmentFactors = {
    sun: "low",
    wind: "medium",
    soil: "clay"
}
const crop1 = {crop: corn, numCrops: 5 }
const crop2 = {crop: pumpkin, numCrops: 2 }


const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
];
/* ------------------------------------------------------------------------------------- */

const getYieldForCrop = (crop) => {
    return crop.numCrops * getYieldForPlant(crop.crop)
}
/* ------------------------------------------------------------------------------------- */

const getTotalYield = (crops) => {
    let totalYield = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        console.log('regel 109 totalyield', crops.crops)
        crops.crops.forEach(crop => {
            // console.log(getYieldForCrop(crop))
            totalYield += getYieldForCrop(crop)  
        })
    } else {
        crops.forEach(crop => {
            // console.log(getYieldForCrop(crop))
            totalYield += getYieldForCrop(crop)   
        })
    }
    // console.log(totalYield)
    return totalYield 
}





// console.log(getTotalYield({crops}))

/* ------------------------------------------------------------------------------------- */
const getCostsForCrop = (crops) => {
    let cost = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        console.log('Regel 144', crops);
        for(z=0; z < crops[Object.keys(crops)].length; z++) {
            console.log('regel 149', crops[Object.keys(crops)][z].crop.cost)
            cost += crops[Object.keys(crops)][z].crop.cost * crops[Object.keys(crops)][z].numCrops
            console.log('regel 151',cost)
        } 
        return cost
    } else {
        for(z=0; z < crops.length; z++){
            console.log('Regel 156', crops)
            console.log(crops[z].crop.cost)
            console.log(crops[z].numCrops * crops[z].crop.cost)
            cost += crops[z].crop.cost * crops[z].numCrops 
        }
        return cost
    } 
}

// console.log('regel 165', {crop1})
// console.log('regel 166', getCostsForCrop({crop1}))
/* ------------------------------------------------------------------------------------- */

const getRevenueForCrop = (crops) => {
    let revenue = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        console.log("Regel 172 object: ", crops)
        for(x=0; x < crops[Object.keys(crops)].length; x++) {
            console.log("Regel 174 object: ", crops[Object.keys(crops)])
            console.log('Regel 175 GetYieldForCrop: ', getYieldForCrop(crops[Object.keys(crops)][x]))
            console.log("Regel 176 Number of crops: ", crops[Object.keys(crops)][x].numCrops)
            let cropYield = getYieldForCrop(crops[Object.keys(crops)][x])
            revenue += cropYield * crops[Object.keys(crops)][x].crop.saleprice
        }
        return revenue
    } else {
        for(x=0; x < crops.length; x++) {
            console.log("Regel 182 array length: ", crops.length)
            console.log("Regel 183 array: ", crops)
            console.log('Regel 184 GetYieldForCrop: ', getYieldForCrop(crops[x]))
            console.log("Regel 185 Number of crops: ", crops[x].numCrops)
            let cropYield = getYieldForCrop(crops[x])
            console.log(cropYield)
            revenue += cropYield * crops[x].crop.saleprice
            console.log('Regel 189 revenue', revenue)
        }
        return revenue
    }    
}
// console.log('regel 195', getRevenueForCrop(crop2))
// console.log('regel 196', getRevenueForCrop({crop2}))

/* ------------------------------------------------------------------------------------- */

const getProfitForCrop = (crops) => {
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        console.log('Regel 201 Array from crops: ', crops[Object.keys(crops)])
        console.log('Regel 202 Get Revenue: ', getRevenueForCrop(crops[Object.keys(crops)]))
        console.log('Regel 203 Get costs: ', getCostsForCrop(crops[Object.keys(crops)]))
        let cropRevenue = getRevenueForCrop(crops[Object.keys(crops)])
        let cropCosts = getCostsForCrop(crops[Object.keys(crops)])
        const profit = cropRevenue - cropCosts
        console.log('Regel 207 Profit crop:', profit)
        return profit
    } else {
        console.log('Regel 210 crops array',crops)
        let cropRevenue = getRevenueForCrop(crops)
        let cropCosts = getCostsForCrop(crops)
        const profit = cropRevenue - cropCosts
        console.log('Regel 214 Profit crop:', profit)

        return profit
    }
}


// console.log('regel 215', {crops})
// console.log(getProfitForCrop({crop1}));

/* ------------------------------------------------------------------------------------- */

const getTotalProfit = (crops) => {
    let totalProfit = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        console.log('Regel 229 crops array length', crops[Object.keys(crops)].length)
        for(y=0; y < crops[Object.keys(crops)].length; y++) {
            crops[Object.keys(crops)].forEach(crop => {
                console.log('Regel 232 Crop: ',  crop)
                console.log('Regel 233 Crop array', Array.from(crop))
                console.log('regel 234 Get profit for crop: ', getProfitForCrop(Array.from(crop.crop)))
                let cropArray = [crop]
                console.log('Regel 236 Crop Array', cropArray)
                console.log('Regel 237 total profit:', totalProfit)
                console.log('Regel 238 profit crop', getProfitForCrop(cropArray))
                totalProfit += getProfitForCrop(cropArray)
                console.log('Regel 240 total profit', totalProfit)
            })
            return totalProfit
        }
    } else {   
    console.log('Regel 245 crops array length', crops.length)
        for(y=0; y < crops.length; y++) {
            // console.log('Regel 233 crops array',crops)
            crops.forEach(crop => {
                // console.log('Regel 238 Crop: ',  crop)
                // console.log('Regel 239 Crop array', Array.from(crop))
                // console.log('regel 241 Get profit for crop: ', getProfitForCrop(Array.from(crop.crop)))
                let cropArray = [crop]
                console.log('Regel 253 Crop Array', cropArray)
                console.log('Regel 254 total profit:', totalProfit)
                console.log('Regel 255 profit crop', getProfitForCrop(cropArray))
                totalProfit += getProfitForCrop(cropArray)
                console.log('Regel 257 total profit', totalProfit)
            })
            return totalProfit
        }
    }

    
}

// console.log('Regel 266', getTotalProfit(crops))
// console.log('Regel 267', getTotalProfit({crops}))

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}