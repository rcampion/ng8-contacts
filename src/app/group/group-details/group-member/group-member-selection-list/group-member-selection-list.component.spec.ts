import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberSelectionListComponent } from './group-member-selection-list.component';

describe('GroupMemberSelectionListComponent', () => {
  let component: GroupMemberSelectionListComponent;
  let fixture: ComponentFixture<GroupMemberSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMemberSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
