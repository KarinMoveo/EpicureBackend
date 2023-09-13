import dishesMockData from "../mockData/data/dishes";

export async function getAllDishes() {
    try {
        const allDishes = dishesMockData;
        return allDishes;
    } catch(e){
        console.log(e);
        throw Error('Error while Paginating dishes');
    }
}

