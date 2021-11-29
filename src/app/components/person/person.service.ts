import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Person } from './person.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private snackBar: MatSnackBar, private db: AngularFirestore) {}

  toggleDeleteModal = false;

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(person: Person) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('persons')
        .add(person)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  read(): Observable<Person[]> {
    return this.db
      .collection('persons')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Person;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
  }

  readById(id: string) {
    return this.db.collection('persons').doc(id).valueChanges();
  }

  delete(id) {
    return this.db.collection('persons').doc(id).delete();
    this.deleteToggle();
  }

  deleteToggle() {
    this.toggleDeleteModal = !this.toggleDeleteModal;
  }

  update(id: string, person: Person) {
    return this.db.collection('persons').doc(id).update({
      name: person.name,
      cpf: person.cpf,
      hiredAt: person.hiredAt,
      email: person.email,
      isActive: person.isActive,
      //img
      cep: person.cep,
      street: person.street,
      number: person.number,
      district: person.district,
      city: person.city,
      state: person.state,
    });
  }
}
