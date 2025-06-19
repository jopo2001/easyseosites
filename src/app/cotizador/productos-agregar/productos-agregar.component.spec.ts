import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAgregarComponent } from './productos-agregar.component';

describe('ProductosAgregarComponent', () => {
  let component: ProductosAgregarComponent;
  let fixture: ComponentFixture<ProductosAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
