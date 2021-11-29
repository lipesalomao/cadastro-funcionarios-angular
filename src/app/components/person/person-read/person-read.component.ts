import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-read',
  templateUrl: './person-read.component.html',
  styleUrls: ['./person-read.component.css'],
})
export class PersonReadComponent implements OnInit {
  person: Person;

  persons: Observable<Person[]>;

  displayedColumns = ['name', 'isActive', 'hiredAt', 'action'];

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.persons = this.personService.read();
  }
  
  navigateToNewPerson(): void {
    this.router.navigate(['person/new']);
  }

  deleteScreen() {
    this.personService.deleteToggle();
  }
}
