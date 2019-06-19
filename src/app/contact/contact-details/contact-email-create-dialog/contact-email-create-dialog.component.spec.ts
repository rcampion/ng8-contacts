import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailCreateDialogComponent } from './contact-email-create-dialog.component';

describe('ContactEmailCreateDialogComponent', () => {
  let component: ContactEmailCreateDialogComponent;
  let fixture: ComponentFixture<ContactEmailCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEmailCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
