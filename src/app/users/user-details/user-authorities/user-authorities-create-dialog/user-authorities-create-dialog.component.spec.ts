import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthoritiesCreateDialogComponent } from './user-authorities-create-dialog.component';

describe('UserAuthoritiesCreateDialogComponent', () => {
  let component: UserAuthoritiesCreateDialogComponent;
  let fixture: ComponentFixture<UserAuthoritiesCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthoritiesCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthoritiesCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
