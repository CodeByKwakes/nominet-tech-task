import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNameServerComponent } from './add-name-server.component';

describe('AddNameServerComponent', () => {
  let component: AddNameServerComponent;
  let fixture: ComponentFixture<AddNameServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddNameServerComponent]
    });
    fixture = TestBed.createComponent(AddNameServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
