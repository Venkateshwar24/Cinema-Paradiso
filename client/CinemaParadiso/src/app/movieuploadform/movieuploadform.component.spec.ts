import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieuploadformComponent } from './movieuploadform.component';

describe('MovieuploadformComponent', () => {
  let component: MovieuploadformComponent;
  let fixture: ComponentFixture<MovieuploadformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieuploadformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieuploadformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
