import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyScriptsAgregarComponent } from './body-scripts-agregar.component';

describe('HeadScriptsAgregarComponent', () => {
  let component: BodyScriptsAgregarComponent;
  let fixture: ComponentFixture<BodyScriptsAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyScriptsAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyScriptsAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
