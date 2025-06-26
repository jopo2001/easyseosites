import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBlogsEnComponent } from './lista-blogs-en.component';

describe('ListaBlogsEnComponent', () => {
  let component: ListaBlogsEnComponent;
  let fixture: ComponentFixture<ListaBlogsEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaBlogsEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaBlogsEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
