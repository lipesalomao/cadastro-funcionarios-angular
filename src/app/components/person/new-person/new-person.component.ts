import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css'],
})
export class NewPersonComponent implements OnInit {
  public form: FormGroup;
  modalToggle: boolean = this.personService.toggleDeleteModal;

  submitted: boolean = false;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id: string) => this.personService.readById(id))
      )
      .subscribe((person) => this.updateForm(person));

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: [null, [Validators.required]],
      hiredAt: [new Date(), [Validators.required]],
      email: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
      cep: [null, [Validators.required]],
      street: ['', [Validators.required]],
      number: [null, [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }
  updateForm(person) {
    this.form.patchValue({
      name: person.name,
      cpf: person.cpf,
      hiredAt: person.hiredAt.toDate(),
      email: person.email,
      isActive: person.isActive,
      cep: person.cep,
      street: person.street,
      number: person.number,
      district: person.district,
      city: person.city,
      state: person.state,
    });
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit(): void {
    this.submitted = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (id && this.form.valid) {
      this.personService.update(id, this.form.value);
      this.router.navigate(['person']);
      this.personService.showMessage('Cadastro atualizado com sucesso!');
    } else if (!id && this.form.valid) {
      this.personService.create(this.form.value);
      this.personService.showMessage('Funcionário cadastrado com sucesso!');
      this.router.navigate(['person']);
    } else {
      this.submitted = false;
      this.personService.showMessage('Preencha todos os campos corretamente!');
    }
  }

  cancel(): void {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['person']);
  }

  deleteCancel() {
    this.router.navigate(['person']);
    this.personService.deleteToggle();
  }

  deleteConfirm(person) {
    this.personService.delete(person);
    this.router.navigate(['person']);

    this.personService.deleteToggle();
    this.personService.showMessage('Cadastro excluído com sucesso!');
  }
}
