import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'cerrar-sesion/:sure', component: LoginComponent },
  { path: 'perfil/:id', component: ProfileComponent },
  { path: 'editar-perfil', component: UserUpdateComponent },
  { path: 'crear-texto', component: PostCreateComponent },
  { path: 'texto/:id', component: PostDetailComponent },
  { path: 'editar-texto/:id', component: PostEditComponent },
  { path: 'borrar-texto/:id', component: PostEditComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
