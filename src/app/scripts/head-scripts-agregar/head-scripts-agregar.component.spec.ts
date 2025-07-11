import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadScriptsAgregarComponent } from './head-scripts-agregar.component';

describe('HeadScriptsAgregarComponent', () => {
  let component: HeadScriptsAgregarComponent;
  let fixture: ComponentFixture<HeadScriptsAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadScriptsAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadScriptsAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
