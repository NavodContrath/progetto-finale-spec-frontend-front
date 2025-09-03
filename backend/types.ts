export type Product = {
    title: string,
    category: "Smartphone" | "Game" | "Pc",
    brand: string,
    price: number,
    releaseYear?: number,
    features?: string[],
    platform?: string,
    specs?: string[],
    img?: string,
};