import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/Rx';
import {User} from'./user';

@Injectable()
export class UserService {
     constructor(private _http:Http,  private _configService:ConfigService) { 

        };
    
      createUser(user){
        let headers = new Headers({ 'Content-Type': 'application/json' });
         return this._http.put(this._configService.userApiUrl , JSON.stringify(user),{headers:headers})
                      .map(result => result.json());
      }
      
      getUsers() {
           return this._http.get(this._configService.userApiUrl )
                       .map(result => result.json());
      }

      upsertUserSelection(userSelection){
       
       console.log('userSelection in upsert()-',JSON.stringify(userSelection));

        let headers = new Headers({ 'Content-Type': 'application/json' });
         return this._http.post(this._configService.upsertAnswerApiUrl , JSON.stringify(userSelection),{headers:headers})
                         .map((res: Response) =>{
                              res.json()});
      }
 }

