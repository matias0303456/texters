import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  providers: [PostService, UserService]
})
export class PostCreateComponent implements OnInit {
  public page_title: string;
  public url: string;
  public post: Post;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Nuevo texto';
    this.url = global.url;
    this.post = new Post(1, 1, '', '');
    this.user = new User(1, '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          form.reset();
          this.status = 'success';
          this.post = response.post;
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
