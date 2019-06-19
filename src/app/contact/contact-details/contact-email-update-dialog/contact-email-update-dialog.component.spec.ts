import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailUpdateDialogComponent } from './contact-email-update-dialog.component';

describe('ContactEmailUpdateDialogComponent', () => {
  let component: ContactEmailUpdateDialogComponent;
  let fixture: ComponentFixture<ContactEmailUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEmailUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
