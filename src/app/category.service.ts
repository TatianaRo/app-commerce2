import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor(private db: AngularFireDatabase){}


  getCategories() {
    return this.db.list('/categories',
      query => query.orderByChild('name'));
  }

/* getCategories() {
  return this.firestore.list('categories').snapshotChanges();
} */

}
