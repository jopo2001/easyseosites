import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubmenuAgregarComponent } from './header-submenu-agregar.component';

describe('HeaderSubmenuAgregarComponent', () => {
  let component: HeaderSubmenuAgregarComponent;
  let fixture: ComponentFixture<HeaderSubmenuAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSubmenuAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSubmenuAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
