const { cornflowerblue } = require("color-name")
const { REGEX_NON_SPECIAL_CHARS } = require("picomatch/lib/constants")

// const corn = {
//     name: "corn",
//     yield: 30,
//     factors: {
//         sun: {
//             low: -50,
//             medium: 0,
//             high: 50
//         },
//         wind: {
//             low: 0,
//             medium: -25,
//             high: -50
//         },
//         rain: {
//             low: 0,
//             medium: 10,
//             high: 25
//         }
//     }
// };

// const environmentFactors = {
//     sun: "low",
//     wind: "medium",
//     soil: "clay"
// }

// const propertiesArray = Object.keys(environmentFactors)
// const properties = propertiesArray[0]
// console.log(properties)
// const propertiesValue = environmentFactors[properties]
// console.log(propertiesValue)
// const cornFactors = corn.factors
// console.log(cornFactors)
// console.log(cornFactors[properties][propertiesValue]);
// console.log(corn.factors[properties][propertiesValue])
// console.log(corn.factors[properties])
// let multiplierFactor =  100 + corn.factors[properties][propertiesValue];

const getYieldForPlant = (plant) => {
    if (plant.factors) {
        let factorsArray = Object.keys(environmentFactors)
        // console.log(factorsArray)
        let plantYieldPercentage = 100
        
        for (i=0; i < factorsArray.length; i++) {
            let factor = factorsArray[i]
            // console.log(factor)
            let factorValue = environmentFactors[factor]
            // console.log(factorValue)
            // console.log(plant)
            if(plant.factors[factor]) {
                plantYieldPercentage += plant.factors[factor][factorValue]
                console.log(plantYieldPercentage)
            } else {
                plantYieldPercentage += 0
            }
        }
        let plantYieldMultiplier = plantYieldPercentage / 100
        console.log(plantYieldMultiplier)
        console.log(plant.yield)
        console.log(plant.yield * plantYieldMultiplier)
        return plant.yield * plantYieldMultiplier
        
    } else {
        return plant.yield
    }  
}

// getYieldForPlant(corn)


/* ------------------------------------------------------------------------------------- */


const getYieldForCrop = (input) => {
    return input.numCrops * getYieldForPlant(input.crop)
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
// const input = {
//     crop: corn,
//     numCrops: 10,
// };

// console.log(getYieldForCrop(input))

/* ------------------------------------------------------------------------------------- */

const getTotalYield = (crops) => {
    let totalYield = 0
    
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        // for (i=0; i < Array.from(crops).length; i++) {
        //     totalYield += (crops.crops[i].crop.yield) * (crops.crops[i].numCrops)
        //     totalYield += getYieldForCrop(crops[i])
        // }
        Array.from(crops.crops).forEach(crop => {
            console.log(getYieldForCrop(crop))
            totalYield += getYieldForCrop(crop)
            
        })
    } else {
        // for (i=0; i < crops.length; i++) {
        //     totalYield += Array.from(crops)[i].crop.yield * Array.from(crops)[i].numCrops
        //     totalYield += getYieldForCrop(crops[i]) 
        // }
        crops.forEach(crop => {
            console.log(getYieldForCrop(crop))
            totalYield += getYieldForCrop(crop)
            
        })
    }
    console.log(totalYield)
    return totalYield 
}

const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
];
console.log(getYieldForCrop(crops[1]))
console.log(getTotalYield(crops))

/* ------------------------------------------------------------------------------------- */

const getCostsForCrop = (crops) => {
    let cost = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        // return crops.crop.cost * crops.numCrops
        for(i=0; i < crops.length; i++) {
            cost += (Array.from(crops).crop.cost * Array.from(crops).numCrops)
        } 
    } else {
        // return (Array.from(crops)[0].crop).cost * Array.from(crops)[0].numCrops
        for(i=0; i < crops.length; i++){
            console.log(crops[i].crop.cost)
            console.log(crops[i].numCrops * crops[i].crop.cost)
            cost += (crops[i].crop.cost * crops[i].numCrops)  
        }
        return cost
    } 
}

// console.log(getCostsForCrop(crops))

/* ------------------------------------------------------------------------------------- */

const getRevenueForCrop = (crops) => {
    let revenue = 0
    if (typeof crops === 'object' && !Array.isArray(crops) && crops !== null) {
        for(x=0; x < crops.length; x++) {
            let cropYield = getYieldForCrop(Array.from(crops)[x])
            revenue += cropYield * Array.from(crops)[x].crop.saleprice
        }

    } else {
        for(x=0; x < crops.length; x++) {
            console.log('GetYieldForCrop: ', getYieldForCrop(crops[x]))
            console.log("Number of crops: ", crops[x].numCrops)
            let cropYield = getYieldForCrop(crops[x])
            
            console.log(cropYield)
            revenue += cropYield * crops[x].crop.saleprice
            console.log(revenue)
        }

    }
    return revenue
}

console.log(getRevenueForCrop(crops))


/* ------------------------------------------------------------------------------------- */

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

// const apples = {
//     name: "apples",
//     yield: 8,
//     cost: 4,
//     saleprice: 6
// }

// const crops = [
//     { crop: corn, numCrops: 5 },
//     { crop: pumpkin, numCrops: 2 },
//     {crop: apples, numCrops: 10}
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