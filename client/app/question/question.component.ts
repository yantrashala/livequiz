/// <reference path="../common/EventSource.d.ts"/>
import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Observable}  from 'rxjs/Rx';
import {QuestionService} from '../common/question.service';
import {UserService} from '../common/user.service';
import {ConfigService} from '../common/config.service';
import {Question} from '../common/question';
import {Answer} from '../common/answer';
import {User} from '../common/user';
import {Stage} from '../common/stage';
import {Router} from '@angular/router';
import {TimerComponent} from '../timer/timer';


@Component({
    selector: 'question',
    template: require('./question.component.html'),
    directives: [TimerComponent] 
})
export class QuestionComponent implements OnInit {
    title: string = '';
    zone: NgZone;
    stage:Stage;

    @ViewChild(TimerComponent) timer: TimerComponent;

    constructor(private _router:Router, private _questionService: QuestionService, private _userService:UserService, private _configServie:ConfigService ) {
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    ngOnInit() {

        if(this._configServie.loggedInUserId && this._configServie.loggedInUserId !=0 ){
            this.subscribeToStageSSE();
        }
        else{
            this._router.navigate(['login']);
        }
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

                   if(this.stage && this.stage.type =="question"){
                       debugger;
                        this.timer.timeInSeconds = this.stage.questionDuration/1000;
                        this.timer.initTimer();
                        this.timer.startTimer();
                   }
                }
            },
            error: err => {
                console.error('something wrong occurred: ' + err);
            }
        });
    }

    postAnswer(questionId,answer){
        if(this._configServie.loggedInUserId && this._configServie.loggedInUserId !=0 ){
            let userSelection = {"participantId": this._configServie.loggedInUserId,  "questionId": questionId,  "answer": answer};
                    this._userService.upsertUserSelection(userSelection)
                    .subscribe(
                            res=>{ console.log('answer posted');},
                            err=> { console.log("Error in postAnswer:" + err)}
                        );
        }
        else{
            this._router.navigate(['login']);
        }
          
       
    }
}
