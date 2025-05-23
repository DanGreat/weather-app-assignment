import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize } from 'rxjs';
import { fadeIn, listAnimation } from './core/animations/animation';
import { IWeather } from './core/model/weather.model';
import { WeatherService } from './core/service/weather.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { WeatherCardComponent } from './shared/weather-card/weather-card.component';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, LoaderComponent, WeatherCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeIn, listAnimation],
})
export class AppComponent implements OnInit {
  title = 'weather-app-homework';

  private readonly weatherService = inject(WeatherService);
  private readonly destroyRef = inject(DestroyRef);

  cityCtrl: FormControl = new FormControl('');

  forecasts = signal<IWeather[]>([]);
  generatedForecast = signal<IWeather | null>(null);

  private readonly forecaseKey = 'forecast';
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadWeatherForcastFromStorage();

    this.cityCtrl.valueChanges
      .pipe(
        filter((val) => !!val),
        distinctUntilChanged(),
        debounceTime(800)
      )
      .subscribe({
        next: (cityName: string) => {
          this.getCountryWeather(cityName);
        },
      });
  }

  loadWeatherForcastFromStorage() {
    const stringifiedForecast = localStorage.getItem(this.forecaseKey);

    if (stringifiedForecast) {
      const forecasts = JSON.parse(stringifiedForecast);
      this.forecasts.set(forecasts);
    }
  }

  getCountryWeather(cityName: string) {
    this.isLoading.update((current) => !current);

    this.weatherService
      .getCountryWeather(cityName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.update((current) => !current))
      )
      .subscribe({
        next: (forecast: IWeather) => {
          this.generatedForecast.set(forecast);
        },
      });
  }

  addCityForecast() {
    if (!this.generatedForecast()) {
      alert('Please enter a city name!');
      return;
    }

    const { cityName } = this.generatedForecast()!;
    this.forecasts.update((current: IWeather[]) => {
      const index = current.findIndex(
        (weather) => weather.cityName === cityName
      );

      if (index == -1 && this.generatedForecast()) {
        return [this.generatedForecast() as IWeather, ...current];
      }

      return current;
    });

    localStorage.setItem(this.forecaseKey, JSON.stringify(this.forecasts()));
    this.generatedForecast.set(null);
    this.cityCtrl.reset('');
  }

  removeCityForecast(cityName: string) {
    this.forecasts.update((current) =>
      current.filter((weather: IWeather) => weather.cityName !== cityName)
    );

    localStorage.setItem(this.forecaseKey, JSON.stringify(this.forecasts()));
  }
}
