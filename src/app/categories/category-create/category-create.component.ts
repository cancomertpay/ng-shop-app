import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  error: string = "";

  constructor(
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  saveCategory(name:any) {
    if(name.value == "" || name.value.length < 2) {
      this.error = "Please set a valid category name.";
      return;
    }

    this.categoryService.createCategory({id: 0, name: name.value }).subscribe(data => {
      this.router.navigate(["/products"]);
    })
  }
}
