import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainAgregarComponent } from './header-main-agregar.component';

describe('HeaderMainAgregarComponent', () => {
  let component: HeaderMainAgregarComponent;
  let fixture: ComponentFixture<HeaderMainAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderMainAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMainAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
