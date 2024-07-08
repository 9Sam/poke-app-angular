import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPokemonCardComponent } from './preview-pokemon-card.component';

describe('PreviewPokemonCardComponent', () => {
   let component: PreviewPokemonCardComponent;
   let fixture: ComponentFixture<PreviewPokemonCardComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [PreviewPokemonCardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PreviewPokemonCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
