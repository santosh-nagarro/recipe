import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  igChangeSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientChange
      .subscribe((ingrdient: Ingredient[]) => {
        this.ingredients = ingrdient;
      });
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
