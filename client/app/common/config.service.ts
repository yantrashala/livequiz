import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
     baseUrl= 'http://10.150.192.133:3000/api/';

     questionApiUrl:string = this.baseUrl + 'Questions'; 
     userApiUrl:string = this.baseUrl + 'Participants';
     questionEventSourceUrl:string = this.baseUrl + 'Questions/change-stream?_format=event-stream';
     userEventSourceUrl:string = this.baseUrl + '/Participants/change-stream?_format=event-stream';

     stageApiUrl:string = this.baseUrl + 'Stages';
     stageEventSourceUrl:string = this.baseUrl + '/Stages/change-stream?_format=event-stream';
     upsertAnswerApiUrl:string = this.baseUrl + 'UserSelections/upsertAnswer';
     adminPassword:string ='sap';

     // TODO: remove this after implementing cookies
     loggedInUserId:number=0;
}
