import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSelingComponent } from './top-seling.component';

describe('TopSelingComponent', () => {
  let component: TopSelingComponent;
  let fixture: ComponentFixture<TopSelingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSelingComponent]
    });
    fixture = TestBed.createComponent(TopSelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
