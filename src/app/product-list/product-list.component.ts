import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductRepository } from '../models/product.repository';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  productRepository: ProductRepository;

  constructor() { 
    this.productRepository = new ProductRepository();
    this.products = this.productRepository.getProducts();
  }

  ngOnInit(): void {
  }

}
