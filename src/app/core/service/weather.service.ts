import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IWeather } from '../model/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly API_KEY = 'Xq0yznG6iDbTDZi5EjDljQMXcjvAaoGU';

  getCountryWeather(cityName: string): Observable<IWeather> {
    let params = new HttpParams();
    params = params.append('location', cityName);
    params = params.append('apikey', this.API_KEY);

    return this.http
      .get(`https://api.tomorrow.io/v4/weather/realtime`, { params })
      .pipe(
        map((resp: any) => {
          const { data, location } = resp;

          return {
            cityName: location.name,
            temperature: data.values.temperature,
            weatherCondition: data.values.weatherCode,
          };
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            const errorMessage = err.error.message;
            alert(errorMessage);
          }

          throw err;
        })
      );
  }
}
