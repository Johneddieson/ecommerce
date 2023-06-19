import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiderPage } from './rider.page';

describe('RiderPage', () => {
  let component: RiderPage;
  let fixture: ComponentFixture<RiderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RiderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
