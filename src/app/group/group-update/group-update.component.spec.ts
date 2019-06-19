import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUpdateComponent } from './group-update.component';

describe('ContactUpdateComponent', () => {
  let component: GroupUpdateComponent;
  let fixture: ComponentFixture<GroupUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
