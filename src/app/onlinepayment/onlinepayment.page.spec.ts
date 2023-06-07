import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinepaymentPage } from './onlinepayment.page';

describe('OnlinepaymentPage', () => {
  let component: OnlinepaymentPage;
  let fixture: ComponentFixture<OnlinepaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OnlinepaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
