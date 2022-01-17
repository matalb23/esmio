import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolverPage } from './devolver.page';

describe('DevolverPage', () => {
  let component: DevolverPage;
  let fixture: ComponentFixture<DevolverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
