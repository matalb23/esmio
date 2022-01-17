import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarObjetosPage } from './cargar-objetos.page';

describe('CargarObjetosPage', () => {
  let component: CargarObjetosPage;
  let fixture: ComponentFixture<CargarObjetosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarObjetosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarObjetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
