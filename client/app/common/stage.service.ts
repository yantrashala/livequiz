import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StageService {
     
     constructor(private _http:Http,  private _configService:ConfigService) { 

        };
    
   getStage() {
           return this._http.get(this._configService.stageApiUrl )
                       .map(result => result.json());
      }
 }

