import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreviewComponent } from './genreview.component';

describe('GenreviewComponent', () => {
  let component: GenreviewComponent;
  let fixture: ComponentFixture<GenreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
