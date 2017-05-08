import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {Observable}  from 'rxjs/Rx';
import {UserService} from '../common/user.service';
import {User} from '../common/user';
import {ConfigService} from '../common/config.service';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    title: string = 'Login Page';
    user:User;

    constructor(private _userService:UserService, private _router:Router, private _configServie:ConfigService ) {
        this.user = {"id" : 0 , "name":"", "score":0};
    }

    ngOnInit() {
      
    }

    login(){
        this._userService.createUser(this.user)
            .subscribe(
                res=>{ 
                     // TODO: remove this after implementing cookies  
                       debugger;
                    this.user=res;
                    this._configServie.loggedInUserId=this.user.id;
                  
                    
                    this._router.navigate(['quiz']);
                },
                err=> {console.log("Error in login()-subscribe:" + err.message)}
            );
    }

}
