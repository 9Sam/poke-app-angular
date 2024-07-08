import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPokemonsComponent } from './preview-pokemons.component';

describe('PreviewPokemonsComponent', () => {
   let component: PreviewPokemonsComponent;
   let fixture: ComponentFixture<PreviewPokemonsComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [PreviewPokemonsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PreviewPokemonsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
