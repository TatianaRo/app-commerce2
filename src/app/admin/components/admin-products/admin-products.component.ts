import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'app/shared/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  product : Product[];
  filteredProducts : any[];
  subscription : Subscription;
  dataSource : any;

  tableColumns  :  string[] = ['title', 'price','category','edit'] ;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private productService : ProductService,
              private route : ActivatedRoute,
     ) { 

    
       
  }

 

  query = new FormControl('');

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }

  // filter(query : String){
  //  this.filteredProducts = (query) ?
  //  this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //  this.products;
  // }



  ngOnInit(): void {

    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.product = products.map(
        product => {
          return <Product>{
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price'],
            key: product.key
          }
        }
      )
 
      this.dataSource = new MatTableDataSource(this.filteredProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
    
 
}

 

 ngOnDestroy(){
 //this.subscription.unsubscribe();

 }



 
   

  }