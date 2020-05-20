import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDecisioneComponent } from './home-decisione.component';

describe('HomeDecisioneComponent', () => {
  let component: HomeDecisioneComponent;
  let fixture: ComponentFixture<HomeDecisioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDecisioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDecisioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
