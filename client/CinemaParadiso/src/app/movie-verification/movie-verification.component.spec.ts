import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVerificationComponent } from './movie-verification.component';

describe('MovieVerificationComponent', () => {
  let component: MovieVerificationComponent;
  let fixture: ComponentFixture<MovieVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
