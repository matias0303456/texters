import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
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
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', '');
    this.post = new Post(1, 1, '', '');
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    this._route.params.subscribe(params => {
      let id = parseInt(params['id']);
      this._postService.getPost(id).subscribe(
        response => {
          this.post = response.text;
          this.getUser(this.post.user_id);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  getUser(user_id){
    this._userService.getUser(user_id).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(){
    this._postService.delete(this.token, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
        }else{
          this.status = 'error';
        }
        this._router.navigate(['perfil', this.identity.sub]);
      },
      error => {
        this.status = 'error';
      }
    );
  }
}
