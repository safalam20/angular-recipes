import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeModel } from './recipe-model';
import { CategoryModel } from './category-model';
import { CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
 
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Array<RecipeModel>> {
    return this.http.get<Array<RecipeModel>>('http://localhost:8080/api/recipes/allrecipes');
  }
  getRecipeById(id): Observable<RecipeModel> {
    return this.http.get<RecipeModel>('http://localhost:8080/api/recipes/recipe-by-id/'+id);
  }
  followNewCategory(id): Observable<any> {
    return this.http.get<Array<any>>('http://localhost:8080/api/categories/follow-category/'+id);
  }
  unfollowCategory(id): Observable<any> {
    return this.http.get<Array<any>>('http://localhost:8080/api/categories/unfollow-category/'+id);
  }

  getAllCategories(): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>('http://localhost:8080/api/categories/allcategories');
  }
  getFollowedCategories(): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>('http://localhost:8080/api/categories/followed-categories');
  }

  createRecipe(recipe: RecipeModel): Observable<any> {
    return this.http.post('http://localhost:8080/api/recipes/', recipe);
  }
  getCommentsByRecipeId(recipeId): Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>('http://localhost:8080/api/comments/'+recipeId);
  }
  createComment(comment): Observable<any> {
    return this.http.post('http://localhost:8080/api/comments/', comment);
  }
  
  
}
