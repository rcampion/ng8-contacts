import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPhoneListComponent } from './contact-phone-list.component';

describe('ContactPhoneListComponent', () => {
  let component: ContactPhoneListComponent;
  let fixture: ComponentFixture<ContactPhoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPhoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
