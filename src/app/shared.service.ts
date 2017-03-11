import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class SharedService {
    weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    weatherURL2 = "%2C%20";
    weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    findMovieURL1 = "http://www.omdbapi.com/?t=";
    findMovieURL2 = "&y=&plot=short&r=json";
    currencyURL = "http://api.fixer.io/latest?symbols=";
    totReqsMade: number = 0;
    f1SeasonsURL: string = "http://ergast.com/api/f1/seasons.json";
    constructor(private _http: Http) { }

    findWeather(city, state) //GET
    {
        this.totReqsMade = this.totReqsMade + 1;
        return this.getRequest(this.weatherURL1 + city + this.weatherURL2+ state + this.weatherURL3);
    }

    findMovie(movie) //GET
    {
        this.totReqsMade = this.totReqsMade + 1;
        return this.getRequest(this.findMovieURL1 + movie + this.findMovieURL2);
    }

    getCurrencyExchRate(currency) //GET
    {
        this.totReqsMade = this.totReqsMade + 1;
        return this.getRequest(this.currencyURL + currency);
    }

    findF1SeasonsList() //GET
    {
      this.totReqsMade = this.totReqsMade + 1;
      return this.getRequest(this.f1SeasonsURL);
    }

    //Function to make GET Requests
    getRequest(url)
    {
      console.log(url);
      return this._http.get(url)
          .map(response => {
              { return response.json() };
          })
          .catch(error => Observable.throw(error.json()));
    }

    //Function to make POST Requests

}
