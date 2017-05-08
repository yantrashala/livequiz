import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class QuestionService {
     //private _webApiUrl = 'http://localhost:3000/api/Questions'; 
     constructor(private _http:Http, private _configService:ConfigService) { 

        };
    
      getAnswerByQuestionId(questionId) {
           return this._http.get(this._configService.questionApiUrl +'/'+questionId+'/answers')
                        .map(result => result.json());
 
    }
 }

