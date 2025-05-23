import { Component, input, output } from '@angular/core';
import { IWeather } from '../../core/model/weather.model';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  showRemoveIcon = input<boolean>(true);
  
  forecast = input<IWeather>();
  removeEvent = output<string>()

  removeCard() {
    this.removeEvent.emit(this.forecast()?.cityName!)
  }
}
