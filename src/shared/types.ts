export interface chef{
    name: string;
    image: string;
    summary: string;
    popularity: number;
    isNew: boolean;
    restaurants: restaurant[];
}

export interface restaurant{
    name: string;
    image: string;
    popularity: number;
    address: string;
    from: string;
    to: string;
    openingDate: string;
    averagePrice: number;
    distance: number;
    chef: string;
    dishes: dish[];
}

export interface dish{
    name: string;
    image: string;
    ingredients: string;
    icon: string;
    price: number;
    side: string[];
    changes: string[];
    mealType: string[];
    restaurant: string;
}

export interface user{
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface MyJwtPayload {
	userId: string;
	email: string;
	isAdmin: boolean;
}