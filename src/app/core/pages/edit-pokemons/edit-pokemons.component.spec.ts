import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPokemonsComponent } from './edit-pokemons.component';

describe('EditPokemonsComponent', () => {
  let component: EditPokemonsComponent;
  let fixture: ComponentFixture<EditPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPokemonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
