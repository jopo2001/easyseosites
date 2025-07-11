import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadScriptsComponent } from './head-scripts.component';

describe('HeadScriptsComponent', () => {
  let component: HeadScriptsComponent;
  let fixture: ComponentFixture<HeadScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadScriptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
