import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];
  imgerror: string = "";
  error: string = "";
  formerror: string = "";
  model: any = {
    categoryId: "0"
  };
  // two-way binding

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  saveProduct(form: NgForm) {

    const extensions = ["jpeg", " jpg", " png"];
    const extension = this.model.imageURL.split(".").pop();

    if(extensions.indexOf(extension) == - 1) {
      this.imgerror = `Please enter only ${extensions.toString()} extension images.`;
      return;
    }
  
    if(this.model.categoryId == "0") {
      this.error = "Please select a category.";
      return;
    }

    const product = {
      id: 1, 
      name: this.model.name, 
      price: this.model.price, 
      imageURL: this.model.imageURL, 
      description: this.model.description, 
      isActive: this.model.isActive, 
      categoryId: this.model.categoryId
    };

    if(form.valid){
      this.productService.createProduct(product).subscribe(data => {
        this.router.navigate(['/products']);
      });
    } else {
      this.formerror = "Something is off! Please review the form."
      return;
    };
  };
}
