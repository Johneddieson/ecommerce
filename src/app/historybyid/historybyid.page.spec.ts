import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorybyidPage } from './historybyid.page';

describe('HistorybyidPage', () => {
  let component: HistorybyidPage;
  let fixture: ComponentFixture<HistorybyidPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorybyidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
