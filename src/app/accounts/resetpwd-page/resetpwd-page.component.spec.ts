import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwdPageComponent } from './resetpwd-page.component';

describe('ResetpwdPageComponent', () => {
  let component: ResetpwdPageComponent;
  let fixture: ComponentFixture<ResetpwdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpwdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpwdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
