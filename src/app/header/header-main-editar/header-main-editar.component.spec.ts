import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainEditarComponent } from './header-main-editar.component';

describe('HeaderMainEditarComponent', () => {
  let component: HeaderMainEditarComponent;
  let fixture: ComponentFixture<HeaderMainEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderMainEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMainEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
