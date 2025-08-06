import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaMainComponent } from './galeria-main.component';

describe('GaleriaMainComponent', () => {
  let component: GaleriaMainComponent;
  let fixture: ComponentFixture<GaleriaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaleriaMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GaleriaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
