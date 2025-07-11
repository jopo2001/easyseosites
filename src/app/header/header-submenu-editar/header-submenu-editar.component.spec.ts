import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubmenuEditarComponent } from './header-submenu-editar.component';

describe('HeaderSubmenuEditarComponent', () => {
  let component: HeaderSubmenuEditarComponent;
  let fixture: ComponentFixture<HeaderSubmenuEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSubmenuEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSubmenuEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
