import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { CommentModel } from 'src/app/shared/comment-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-onerecipe',
  templateUrl: './onerecipe.component.html',
  styleUrls: ['./onerecipe.component.css']
})
export class OnerecipeComponent  {

  recipeId: number;
  recipe : RecipeModel;
  comments : Array<CommentModel>=[];

  commentToPost;
  

  constructor(private activateRoute: ActivatedRoute,private recipeService : RecipeService) { 
    this.recipeId = this.activateRoute.snapshot.params.id;
    this.recipeService.getRecipeById(this.recipeId).subscribe(data=> this.recipe=data);
    this.recipeService.getCommentsByRecipeId(this.recipeId).subscribe(data=> this.comments=data);

    this.commentToPost={
      content : '',
      recipeId : this.recipeId
    };
  }
  get steps() : Array<String>{
    let stepis=this.recipe.directions.split(".");
    stepis.pop();
    return stepis;
  }
  get isCommentsEmpty() : boolean{
    if(this.comments.length>0){
      return true;
    }
    return false;

  }
  createComment(){
    
    this.recipeService.createComment(this.commentToPost).subscribe((data) => {
      //this.commentToPost.content='';
      window.location.reload();
    }, error => {
      throwError(error);
    });
  }

  

}
