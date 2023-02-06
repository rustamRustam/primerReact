import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogKartochekComponent } from './catalog-kartochek.component';

describe('CatalogKartochekComponent', () => {
  let component: CatalogKartochekComponent;
  let fixture: ComponentFixture<CatalogKartochekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogKartochekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogKartochekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
