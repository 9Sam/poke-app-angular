import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPokemonsComponent } from './pick-pokemons.component';

describe('PickPokemonsComponent', () => {
  let component: PickPokemonsComponent;
  let fixture: ComponentFixture<PickPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickPokemonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
