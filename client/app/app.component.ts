import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import {QuestionComponent} from './question/question.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {AdminService} from './common/admin.service';
import {QuestionService} from './common/question.service';
import {StageService} from './common/stage.service';
import {UserService} from './common/user.service';
import {ConfigService} from './common/config.service';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [AdminService, QuestionService, UserService, ConfigService, StageService,HTTP_PROVIDERS ],
})
@Routes([
  {path: '/',            component: LoginComponent },
  {path: '/admin',       component: AdminComponent },
  {path: '/quiz',    component: QuestionComponent },
  {path: '/login',       component: LoginComponent },
  {path: '/*',           component: LoginComponent }
])
export class AppComponent {}
