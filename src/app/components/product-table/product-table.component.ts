import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { ResponseVO } from '../../vo/ResponseVO';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {

  constructor(
    private service: ProductService,
    private route: Router) {

  }

  products: any[] = [];
  productsFiltered: any[] = [];

  searchValue = '';
  tableSize = 5;


  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.service.getProducts().subscribe((res: ResponseVO) => {
      this.products = res.data;
      this.productsFiltered = res.data;
      this.tableSizeChange()
    })
  }

  searchProducts() {
    if (this.searchValue.length === 0) {
      this.productsFiltered = this.products;
    }else{
      this.productsFiltered = this.products.filter(p => p.name.toLowerCase().includes(this.searchValue.toLowerCase())
      || p.description.toLowerCase().includes(this.searchValue.toLowerCase()));
    }
    this.tableSizeChange()
  }

  tableSizeChange(){
    this.productsFiltered = this.productsFiltered.slice(0, this.tableSize);
  }

  addProduct(){
    this.service.product= null;
    this.route.navigate(["product-form"]);
  }

  editProduct(product: any){
    this.service.product= product;
    this.route.navigate(["product-form"]);
  }
}

