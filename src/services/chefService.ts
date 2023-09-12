import chefsMockData from "../mockData/data/chefs";

export async function getAllChefs() {
    try {
        const allChefs = chefsMockData;
        return allChefs;
    } catch(e){
        console.log(e);
        throw Error('Error while Paginating chefs');
    }
}



