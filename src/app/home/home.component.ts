import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { RecipeModel } from '../shared/recipe-model';
import { throwError } from 'rxjs';
import { CategoryModel } from '../shared/category-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  recipes : Array<RecipeModel> =[];
  categories : Array<CategoryModel>=[];
  followedCategories : Array<CategoryModel>=[];

  constructor(private recipeService : RecipeService,private router: Router) {
    

   }
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(data=> this.recipes=data);
    this.recipeService.getFollowedCategories().subscribe(data=> this.followedCategories=data);
    this.recipeService.getAllCategories().subscribe(data=> this.categories=data);
  }
  followOrUnCategory(category){
    if(this.askToComponent(category.id)){
      this.unfollowCategory(category.id);
    }else{
      this.followCategory(category.id);
    }
   window.location.reload();
   
   

  }
   askToComponent(id) : boolean{

      for(let cat of this.followedCategories){
        if(cat.id==id){
          return true;
        }
       
      }
      return false;
   }

  
   followCategory(id){
    this.recipeService.followNewCategory(id).subscribe((data) => {
      
    }, error => {
      throwError(error);
    });
  }
  unfollowCategory(id){
    this.recipeService.unfollowCategory(id).subscribe((data) => {
      
    }, error => {
      throwError(error);
    });
  }
  get followedRecipes() : Array<RecipeModel>{
    return this.recipes.filter(r =>{
      if(this.askToComponent(r.categoryId)){
        return true;
      }
      return false;
    });
  }

  goToRecipe(recipe): void {
    
    this.router.navigateByUrl('/view-recipe/' + recipe.id);
  }
   


}
