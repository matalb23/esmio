import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisavisosPage } from './misavisos.page';

describe('MisavisosPage', () => {
  let component: MisavisosPage;
  let fixture: ComponentFixture<MisavisosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisavisosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisavisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
