import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public page_title: string;
  public url: string;
  public user: User;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Perfil de ';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', '');
    this.posts = [new Post(1, 1, '', '')];
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this._route.params.subscribe(params => {
      let user_id = parseInt(params['id']);
      this.getUser(user_id);
      this.getPosts(user_id);
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

  getPosts(user_id){
    this._postService.getPosts(user_id).subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
