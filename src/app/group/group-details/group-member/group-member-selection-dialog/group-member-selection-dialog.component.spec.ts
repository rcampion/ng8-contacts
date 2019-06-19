import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberSelectionDialogComponent } from './group-member-selection-dialog.component';

describe('GroupMemberSelectionDialogComponent', () => {
  let component: GroupMemberSelectionDialogComponent;
  let fixture: ComponentFixture<GroupMemberSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMemberSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
