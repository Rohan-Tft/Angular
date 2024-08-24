import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  originalProductList = []
  allProducts = [];
  categoryList = [];
  selectedCategory = 'All categories';

  // initial discounted categry
  discountMap = new Map([[ 'jewelery', 10 ],['electronics', 30]])

  //  value which can be assigned - Low | High for price
  filtersProducts = {
    price : '',
    discount : '',
    min:0,
    max:0,
    startRange : 0,
    endRange : 0
  }

  constructor(private http: HttpClient) {
    this.discountMap
    debugger
  }

  // get category list
  getAllCategory(){
    return this.http.get(`https://fakestoreapi.com/products/categories`);
  }

  getProductList(endpoint){
    return this.http.get(`https://fakestoreapi.com/products${endpoint}`);
  }


}
