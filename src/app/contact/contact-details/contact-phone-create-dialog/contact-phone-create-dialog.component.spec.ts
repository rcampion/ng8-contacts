import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPhoneCreateDialogComponent } from './contact-phone-create-dialog.component';

describe('ContactPhoneCreateDialogComponent', () => {
  let component: ContactPhoneCreateDialogComponent;
  let fixture: ComponentFixture<ContactPhoneCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPhoneCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPhoneCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
