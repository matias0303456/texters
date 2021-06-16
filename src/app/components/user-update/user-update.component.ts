import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { User } from '../../models/user';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public page_title: string;
  public url: string;
  public status: string;
  public user: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Editar mis datos';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', '');
    // Rellenar objeto usuario
    this.user = new User(
      this.identity.sub, 
      this.identity.nick, 
      this.identity.email, 
      '',
      this.identity.bio
    )
  };

  ngOnInit(): void {
  }
  
  onSubmit(form){
    this._userService.update(this.user, this.token).subscribe(
      response => {
        if(response.status && response.status){
          this.status = 'success';

          if(response.changes.nick){
            this.identity.nick = response.changes.nick;
          }
          if(response.changes.email){
            this.identity.email = response.changes.email;
          }
          if(response.changes.bio){
            this.identity.bio = response.changes.bio;
          }
          
          localStorage.setItem('identity', JSON.stringify(this.identity));

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
