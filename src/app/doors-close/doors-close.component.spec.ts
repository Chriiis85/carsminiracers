import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorsCloseComponent } from './doors-close.component';

describe('DoorsCloseComponent', () => {
  let component: DoorsCloseComponent;
  let fixture: ComponentFixture<DoorsCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorsCloseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorsCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
