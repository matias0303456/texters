import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Iniciar sesión';
    this.user = new User(1, '', '', '', '');
  }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();
  }

  onSubmit(form){
    // en la primera llamada a login pido el token solo
    this._userService.login(this.user).subscribe(
      response => {
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          // en la segunda llamada mando getToken == true para obtener los datos 
          // decodificados del usuario en base a su token, guardarlos en identity,
          // persistirlos como identity en el localstrorage y redirigir a inicio
          this._userService.login(this.user, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
            }
          );
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;
        
        this._router.navigate(['/inicio']);
      }
    });
  }
}
