import { Product } from "./Product";

export class ProductRepository {
    private products: Product[] = [
        // {id: 1, name: "Iphone 14", price: 20000, imageURL: "1.jpeg", description: "Thats a nice phone!", isActive: true , categoryId: 1},
        // {id: 2, name: "Iphone 15", price: 30000, imageURL: "2.jpeg", description: "Thats a nice phone!", isActive: true, categoryId: 1},
        // {id: 3, name: "Iphone 16", price: 40000, imageURL: "3.jpeg", description: "Thats a nice phone!", isActive: true, categoryId: 2},
        // {id: 4, name: "Iphone 16", price: 40000, imageURL: "1.jpeg", description: "Thats a nice phone!", isActive: true, categoryId: 2},
        // {id: 5, name: "Iphone 16", price: 40000, imageURL: "2.jpeg", description: "Thats a nice phone!", isActive: true, categoryId: 3},
        // {id: 6, name: "Iphone 16", price: 40000, imageURL: "3.jpeg", description: "Thats a nice phone!", isActive: true, categoryId: 3}
    ];
    
    getProducts(): Product[] {
    return this.products.filter(p=>p.isActive);
    }

    getProductById(id: number) {
    return this.products.find(p=>p.id == id);
    }
    getProductsByCategoryId(id: number): Product[] {
        return this.products.filter(p=>p.categoryId == id);
        }
}