import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseVO } from '../vo/ResponseVO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  URL = 'sofka/bp/products'

  product = null;

  getProducts() : Observable<ResponseVO>{
    return this.http.get<ResponseVO>(this.URL);
  }

  validateId(id: string){
    return this.http.get(this.URL+'/verification/'+id);
  }

  createProduct(product:any){
    return this.http.post(this.URL, product);
  }

  updateProduct(id:string, product: any){
    return this.http.put(this.URL+'/'+id, product);
  }
}
