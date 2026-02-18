export interface Burger {
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    ingredients: string[];
    price: number;
    image: string;
    calories: number;
}

export const burgers: Burger[] = [
    {
        id: "1",
        name: "Cheese",
        shortDescription: "Pan de papa, medallón, queso cheddar, aderezos.",
        fullDescription: "La clásica infalible. Medallón de carne seleccionado con abundante queso cheddar fundido y nuestros aderezos especiales en un suave pan de papa.",
        ingredients: ["Pan de Papa", "Medallón de Carne", "Queso Cheddar", "Aderezos"],
        price: 5500,
        image: "/c.png",
        calories: 780
    },
    {
        id: "2",
        name: "Classic",
        shortDescription: "Pan de papa, medallón, queso barra, jamón, huevo, tomate, lechuga.",
        fullDescription: "Una hamburguesa completa y fresca. Medallón de carne con queso barra, jamón cocido, huevo, rodajas de tomate fresco y lechuga crujiente.",
        ingredients: ["Pan de Papa", "Medallón de Carne", "Queso Barra", "Jamón", "Huevo", "Tomate", "Lechuga", "Aderezos"],
        price: 7000,
        image: "/cl.png",
        calories: 850
    },
    {
        id: "3",
        name: "Top One",
        shortDescription: "Cebolla caramelizada, huevo, queso cheddar, tomate, lechuga.",
        fullDescription: "Nuestra especialidad de la casa. Medallón jugoso con el toque dulce de la cebolla caramelizada, huevo, queso cheddar, tomate y lechuga en pan de papa.",
        ingredients: ["Pan de Papa", "Medallón de Carne", "Queso Cheddar", "Cebolla Caramelizada", "Huevo", "Tomate", "Lechuga", "Aderezos"],
        price: 8000,
        image: "/t.png",
        calories: 950
    },
    {
        id: "4",
        name: "Súper Promo",
        shortDescription: "¡Doble sabor! 2 Hamburguesas completas con papas.",
        fullDescription: "Ideal para compartir. Dos hamburguesas completas con queso cheddar y aderezos, acompañadas de una generosa porción de papas fritas.",
        ingredients: ["2x Hamburguesas", "Queso Cheddar", "Papas Fritas", "Pan de Papa"],
        price: 9000,
        image: "/s.png",
        calories: 1500
    },
    {
        id: "5",
        name: "Mini Burgers",
        shortDescription: "6 mini burgers",
        fullDescription: "6 mini burgers con papas fritas",
        ingredients: ["6x Hamburguesas", "Papas Fritas", "Queso cheddar", "Beacon"],
        price: 10000,
        image: "/mini.png",
        calories: 1500
    }
];
