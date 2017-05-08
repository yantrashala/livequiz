import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminService {
           constructor(private _http:Http,private _configService:ConfigService) { 

        };

    getQuestions()
    {
        return this._http.get(this._configService.questionApiUrl)
                        .map(result => result.json());
    }

    updateQuestions(question)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this._configService.questionApiUrl , JSON.stringify(question),{headers:headers})
                         .map((res: Response) =>{
                              res.json()});
    }
}
