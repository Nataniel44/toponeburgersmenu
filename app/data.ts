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
        shortDescription: "6 mini burgers a elección",
        fullDescription: "Caja especial con 6 mini burgers. Elige tus 3 sabores favoritos (¡vienen de a pares!) y acompáñalos con papas fritas.",
        ingredients: ["6x Hamburguesas Mini", "Papas Fritas", "dip de salsa de ajo ", "Sabores a elección"],
        price: 12000,
        image: "/mi.png",
        calories: 1500
    },
    {
        id: "6",
        name: "Hulk",
        shortDescription: "Doble carne, cheddar, cebolla caramelizada, salsa BBQ.",
        fullDescription: "Para los más hambrientos. Doble medallón de carne, abundante queso cheddar, cebolla caramelizada y salsa BBQ en pan de papa.",
        ingredients: ["Pan de Papa", "2x Medallones de Carne", "Queso Cheddar", "Cebolla Caramelizada", "Salsa BBQ"],
        price: 9000,
        image: "/hu.png",
        calories: 1200
    }
];
