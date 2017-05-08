import {Component, OnInit, NgZone} from '@angular/core';
import {Observable}  from 'rxjs/Rx';
import {Stage} from '../common/stage';
import {StageService} from '../common/stage.service';
import {ConfigService} from '../common/config.service';
import {UserService} from '../common/user.service';
import {User} from '../common/user';
import {SortPipe} from '../pipe/sort.pipe';

@Component({
    selector: 'admin',
    template: require('./admin.component.html'),
    pipes:[SortPipe]
})
export class AdminComponent implements OnInit {
    title: string = 'Admin Page';
    zone: NgZone;
    name:string;
    isAdminLoggedIn:boolean;
    stage:Stage;
    users:Array<User>;

    constructor(private _stageService:StageService,private _userService:UserService, private _configServie: ConfigService ) {
        this.isAdminLoggedIn = false;
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    ngOnInit() {
      
    }

    login(){
       if(this.name == this._configServie.adminPassword){
             this.isAdminLoggedIn = true;
             this.getStage();
             this.subscribeToStageSSE();

             this.getUsers();
             this.subscribeToUsersSSE();
       }
    }

    private getStage(){
             this._stageService.getStage()
                             .subscribe( res => {
                if(res && res.length > 0){
                    this.stage = res[0];
                    console.log('in getStage()');
                    console.log(JSON.stringify(this.stage));
                }
            },
            err => console.log("Error in subscribe:" + err.message)
            );
    }


     private  subscribeToStageSSE(){
         let observable = Observable.create(observer => {
            const eventSource = new EventSource(this._configServie.stageEventSourceUrl);
            eventSource.onopen = x => observer.next(console.log('Connection open'));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));

            eventSource.addEventListener("data", x => {
                observer.next(x);
            });

            return () => {
                eventSource.close();
            };
        });

        observable.subscribe({
            next: messageEvent => {
                if (messageEvent) {
                    console.log(messageEvent);
                    this.stage = JSON.parse(messageEvent.data).data;
                   console.log('in subscribe->' + JSON.stringify(this.stage) );
                }
            },
            error: err => {
                console.error('something wrong occurred: ' + err);
            }
        });
    }

     private getUsers(){
        this._userService.getUsers()
             .subscribe( res => {
                this.users = res;
        },
        err => console.log("Error in subscribe:" + err.message)
        );
    }

     private subscribeToUsersSSE(){
            let observable = Observable.create(observer => {
            const eventSource = new EventSource(this._configServie.userEventSourceUrl);
            eventSource.onopen = x => observer.next(console.log('User Connection open'));
            eventSource.onerror = x => observer.error(console.log('EventSource failed'));

            eventSource.addEventListener("data", x => {
                observer.next(x);
            });

            return () => {
                eventSource.close();
            };
        });

        observable.subscribe({
            next: messageEvent => {
                if (messageEvent) {
                    console.log(messageEvent);

                    let user: User = JSON.parse(messageEvent.data).data;
                    if(user){
                        let existingUser = this.users.find(x=> x.id == user.id);
                        
                        if(existingUser){
                            existingUser.score=user.score;
                        }
                        else{
                        this.users.push(user);
                        }
                    }
                }
            },
            error: err => {
                console.error('something wrong occurred: ' + err);
            }
        }); 
    }
}
