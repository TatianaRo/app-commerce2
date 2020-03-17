import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/product.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore,
              private db : AngularFireDatabase) { }


  create(product){
    return this.db.list('products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();}

  getProduct(productId){
    return this.db.object('products/'+ productId);

  }
 /* getProducts() {
  return this.firestore.collection('products').snapshotChanges();
}
 */
/*
createProduct(product : Product){
  return this.firestore.collection('products').add(product);
}

updateProduct(product : Product){

  delete product.id;
  return this.firestore.doc('products/' + product.id).update(product);
}

deleteProduct(productId : string){
  this.firestore.doc('products/' + productId).delete();
}

teste(product : Product){

  delete product.id;
  console.log(product);

} */

}