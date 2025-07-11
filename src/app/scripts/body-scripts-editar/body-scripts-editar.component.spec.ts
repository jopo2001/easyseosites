import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyScriptsEditarComponent } from './body-scripts-editar.component';

describe('HeadScriptsEditarComponent', () => {
  let component: BodyScriptsEditarComponent;
  let fixture: ComponentFixture<BodyScriptsEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyScriptsEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyScriptsEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
