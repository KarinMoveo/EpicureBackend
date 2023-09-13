export interface chef{
    name: string;
    image: string;
    summary: string;
    popularity: number;
    restaurants: restaurant[];
    isNew: boolean;
}

export interface restaurant{
    name: string;
    chef: string;
    popularity: number;
    image: string;
    address: string;
    from: string;
    to: string;
    openingDate: string;
    // dishes: dish[];
    averagePrice: number;
    lat: number;
    long: number;
    distance: number;
}

export interface dish{
    name: string;
    image: string;
    ingredients: string;
    icon: string;
    price: number;
    changes: string[];
    side: string[];
    restaurant: string;
    mealType: string[];
}