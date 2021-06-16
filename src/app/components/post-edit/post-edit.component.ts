import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [PostService, UserService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public url: string;
  public status: string;
  public user: User;
  public post: Post;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Editar relato';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', '');
    this.post = new Post(1, 1, '', '');
  }

  ngOnInit(): void {
    this.getPost();
  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
        }else{
          this.status = 'error';
        }
        if(response.changes.title){
          this.post.title = response.changes.title;
        }
        if(response.changes.content){
          this.post.content = response.changes.content;
        }
        this._router.navigate(['texto', this.post.id]);
      },
      error => {
        this.status = 'error';
      }
    );
  }

  getPost(){
    this._route.params.subscribe(params => {
      let id = parseInt(params['id']);
      this._postService.getPost(id).subscribe(
        response => {
          this.post = response.text;
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
