import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosEditarComponent } from './precios-editar.component';

describe('PreciosEditarComponent', () => {
  let component: PreciosEditarComponent;
  let fixture: ComponentFixture<PreciosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreciosEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreciosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
