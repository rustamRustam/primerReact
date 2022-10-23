import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartochekaViewComponent } from './kartocheka-view.component';

describe('KartochekaViewComponent', () => {
  let component: KartochekaViewComponent;
  let fixture: ComponentFixture<KartochekaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KartochekaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KartochekaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
