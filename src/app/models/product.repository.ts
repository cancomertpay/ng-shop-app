import { Product } from "./Product";

export class ProductRepository {
    private products: Product[] = [
        {id: 1, name: "Iphone 14", price: 20000, imageURL: "1.jpeg", description: "Thats a nice phone!", isActive: true},
        {id: 2, name: "Iphone 15", price: 30000, imageURL: "2.jpeg", description: "Thats a nice phone!", isActive: true},
        {id: 3, name: "Iphone 16", price: 40000, imageURL: "3.jpeg", description: "Thats a nice phone!", isActive: true},
    ];
    
    getProducts(): Product[] {
    return this.products.filter(p=>p.isActive);
    }

    getProductById(id: number) {
    return this.products.find(p=>p.id == id);
    }
}