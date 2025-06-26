import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateBlogComponent } from './translate-blog.component';

describe('TranslateBlogComponent', () => {
  let component: TranslateBlogComponent;
  let fixture: ComponentFixture<TranslateBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslateBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
