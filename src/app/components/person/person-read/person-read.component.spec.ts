import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonReadComponent } from './person-read.component';

describe('PersonReadComponent', () => {
  let component: PersonReadComponent;
  let fixture: ComponentFixture<PersonReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
