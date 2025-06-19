import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueletosComponent } from './esqueletos.component';

describe('EsqueletosComponent', () => {
  let component: EsqueletosComponent;
  let fixture: ComponentFixture<EsqueletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EsqueletosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsqueletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
