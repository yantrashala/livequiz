import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class ContactService {
	private _message = 'message from contact service';

  getMessage(): string {
    return this._message;
  };

  setMessage(newMessage: string): void {
    this._message = newMessage;
  };



    private _webApiUrl = 'https://itunes.apple.com/search?term=jack'; 
     constructor(private _http:Http) { 

        };

    //getArtists(): Observable<{}> {
      getArtists() {

        // return this._http.get(this._webApiUrl)
        //     .map((response: Response) => <any[]> response.json())
        //      .do(data => console.log('All: ' +  JSON.stringify(data)))
        //      .catch(this.handleError);
        

          // return this._http.get(this._webApiUrl)
          //   .map((response: Response) =>  response.json())
            
          //    .catch(this.handleError);
            
             
            let options = new RequestOptions({ headers: this.getHeaders() });


            //  this._http.get('https://itunes.apple.com/search?term=john', options)
            // .map(result => JSON.parse(result.json()))
            // .do(result => console.log("RESULT: ", JSON.stringify(result)))
            // .subscribe(result => {
            //     console.log(result);
            // }, error => {
            //     console.log("ERROR: ", error);
            // });

            /*
             this._http.get('http://localhost:3000/api/albums/getAlbumByArtistId?artistId=1008915738')
            .map(result => result.json())
            .do(result => console.log("RESULT: ", JSON.stringify(result)))
            .subscribe(result => {
                console.log(result);
            }, error => {
                console.log("ERROR: ", error);
            });
*/

            return this._http.get('http://localhost:3000/api/albums/getAlbumByArtistId?artistId=1008915738')
                        .map(result => result.json());
            


            //    return this._http.get('http://localhost:3000/api/albums/getAlbumByArtistId?artistId=1008915738')
            // .map((response: Response) =>  response.json())
            
            //  .catch(this.handleError);
            
    }

      private handleError(error: Response) {
       console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
	headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Methods" , "GET");
      return headers;
  }
      
            
    }



