import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadScriptsEditarComponent } from './head-scripts-editar.component';

describe('HeadScriptsEditarComponent', () => {
  let component: HeadScriptsEditarComponent;
  let fixture: ComponentFixture<HeadScriptsEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadScriptsEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadScriptsEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
