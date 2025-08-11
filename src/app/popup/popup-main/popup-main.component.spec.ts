import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMainComponent } from './popup-main.component';

describe('PopupMainComponent', () => {
  let component: PopupMainComponent;
  let fixture: ComponentFixture<PopupMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
