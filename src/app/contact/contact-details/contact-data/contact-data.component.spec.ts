import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDataComponent } from './contact-data.component';

describe('ContactDataComponent', () => {
  let component: ContactDataComponent;
  let fixture: ComponentFixture<ContactDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
