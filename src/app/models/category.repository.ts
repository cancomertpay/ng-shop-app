import { Category } from "./category";

export class categoryRepository {
    private categories: Category[] = [
        {id: 1, name: "Mobile"},
        {id: 2, name: "Computer"},
        {id: 3, name: "TV"}
    ];

    getCategories(): Category[] {
        return this.categories;
    }

    getCategoryById(id: number) {
        return this.categories.find(c => c.id == id);
    } 
}