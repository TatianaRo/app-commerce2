import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor(private db: AngularFireDatabase){}


  getCategories() {
    return this.db.list('categories')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        })
      );
  }





  /* getCategories() {
    return this.db.list('/categories',
      query => query.orderByChild('name')).snapshotChanges()
      .pipe(
        map(actions =>
          actions
            .map(a => ({ key: a.payload.key, ...(a.payload.val() as {}) }))
        )
      );
  
  } */

/* getCategories() {
  return this.firestore.list('categories').snapshotChanges();
} */

}
