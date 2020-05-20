import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RilasciaComponent } from './rilascia.component';

describe('RilasciaComponent', () => {
  let component: RilasciaComponent;
  let fixture: ComponentFixture<RilasciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RilasciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RilasciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
