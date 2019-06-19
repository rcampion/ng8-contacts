import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailListComponent } from './contact-email-list.component';

describe('ContactEmailListComponent', () => {
  let component: ContactEmailListComponent;
  let fixture: ComponentFixture<ContactEmailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEmailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
