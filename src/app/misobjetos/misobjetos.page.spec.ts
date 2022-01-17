import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisobjetosPage } from './misobjetos.page';

describe('MisobjetosPage', () => {
  let component: MisobjetosPage;
  let fixture: ComponentFixture<MisobjetosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisobjetosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisobjetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
