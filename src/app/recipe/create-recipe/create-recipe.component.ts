import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { CategoryModel } from 'src/app/shared/category-model';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  categories : Array<CategoryModel>=[];
  recipe : RecipeModel;

  constructor(private recipeService : RecipeService,private router : Router) {
    this.recipeService.getAllCategories().subscribe(data=> this.categories=data);
    this.recipe={
      id : -1,
      name : '',
      calories : '',
      cookTime : '',
      directions : '',
      ingredients : '',
      picUrl : '',
      servings : '',
      prepTime : '',
      categoryId : -1,
    };
   }

  ngOnInit(): void {
  }
  createRecipe(){
    
    this.recipeService.createRecipe(this.recipe).subscribe((data) => {
      this.router.navigateByUrl('/home');
    }, error => {
      throwError(error);
    });
  }

}
