import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{


  selectedSortFilter = '';
  showLoader = false;


  constructor(public dashboardService: DashboardService){}

  ngOnInit() {
    // get category list
    this.getCategoryList();
    // get category
    this.getAllProducts('All categories');
  }


  getCategoryList(){
    // set default value
    this.dashboardService.categoryList=['All categories'];
    this.dashboardService.getAllCategory().subscribe(res => {
      // check for array
      if(Array.isArray(res)){
        this.dashboardService.categoryList = [...this.dashboardService.categoryList,...res];
        // this.resetFilter();
      }
    }, err => {
      console.log(err);
    })
  }


  getAllProducts(category){
    this.showLoader = true;
    // set default value
    let endPointObj = '';
    // check added to send empty in All Category
    if(category!='All categories') endPointObj = '/category/' + category;
    this.dashboardService.selectedCategory = category;
    this.dashboardService.getProductList(endPointObj).subscribe(res => {
      // check for array
      if(Array.isArray(res)){
        this.dashboardService.originalProductList = res;
        this.dashboardService.allProducts = res;
        this.resetFilter();
        this.getSliderValue(res);
        this.showLoader = false;
      }
    }, err => {
      console.log(err)
      this.showLoader = false;
    })
  }

  // change product filter
  changeProductFilter(filterObject){
    if(!filterObject.value) return;
    // change filter value and sort in ass or desc order
    this.selectedSortFilter = filterObject.event
    this.dashboardService.filtersProducts[this.selectedSortFilter] = filterObject.value;
    // sort for price
    if(filterObject.event=='price'){
      this.dashboardService.allProducts.sort((data1,data2)=> filterObject.value == 'Low' ? data1.price - data2.price : data2.price - data1.price)
      // reset discount sort
      this.dashboardService.filtersProducts.discount = '';
    }
    // sort for discount
    if(filterObject.event=='discount'){
      this.dashboardService.allProducts.sort((data1,data2)=>{
          // check discount map and return 0 if not present
          let discountA = this.dashboardService.discountMap.get(data1.category) || 0;
          let discountB = this.dashboardService.discountMap.get(data2.category) || 0;
          return filterObject.value == 'Low' ? discountA - discountB : discountB - discountA
      })
      // reset pricing sort
      this.dashboardService.filtersProducts.price = '';
    }
  }


  // find slider min max value
  getSliderValue(data){
    let priceValues = data.map(data=>data.price);
    this.dashboardService.filtersProducts.min = Math.round(Math.min(...priceValues));
    this.dashboardService.filtersProducts.max = Math.round(Math.max(...priceValues));
    this.dashboardService.filtersProducts.startRange = this.dashboardService.filtersProducts.min
    this.dashboardService.filtersProducts.endRange = this.dashboardService.filtersProducts.max
  }

  // range filter
  changePriceRange(){
    this.dashboardService.allProducts = this.dashboardService.originalProductList.filter(data=> data.price >= this.dashboardService.filtersProducts.startRange &&  data.price <= this.dashboardService.filtersProducts.endRange);
    this.changeProductFilter({event:this.selectedSortFilter,value:this.dashboardService.filtersProducts[this.selectedSortFilter]})
  }

  // reset filter
  resetFilter(){
    this.dashboardService.filtersProducts = {
      price : '',
      discount : '',
      min:0,
      max:0,
      startRange : 0,
      endRange : 0
    };
  }


}

