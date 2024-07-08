import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePokemonsComponent } from './choose-pokemons.component';

describe('ChoosePokemonsComponent', () => {
  let component: ChoosePokemonsComponent;
  let fixture: ComponentFixture<ChoosePokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePokemonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoosePokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
