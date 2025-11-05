import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToGroupDialog } from './add-to-group-dialog';

describe('AddToGroupDialog', () => {
  let component: AddToGroupDialog;
  let fixture: ComponentFixture<AddToGroupDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToGroupDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToGroupDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
