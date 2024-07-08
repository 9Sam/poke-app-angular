import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSmallCardComponent } from './profile-small-card.component';

describe('ProfileSmallCardComponent', () => {
  let component: ProfileSmallCardComponent;
  let fixture: ComponentFixture<ProfileSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSmallCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
