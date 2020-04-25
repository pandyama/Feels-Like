import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string;
  key = "0fe37647bf3c4095418a1c5392bb60cc";
  weather: any = [];
  feelslike;
  current;
  description;
  city;
  currentDescription;
  color = [];
  id;
  date: Date = new Date();
  cookieValue;
  saved;
  show: boolean;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void{
    this.saved = this.cookieService.get('Test');
    console.log("current searched city is " + this.cookieService.get('Test'));
    this.getRefresh();

  }

  getWeather(){
    return this.http.get("https://klima123.herokuapp.com/weather",{
      headers: {city: this.value}
    })
      .subscribe(res =>{
          this.weather.push(res[1]);
          this.weather.push(res[2]);
          this.weather.push(res[3]);
          this.weather.push(res[4]);
          this.weather.push(res[5]);
          // for(var i = 1; i < 5; i++){
          //    this.weather.push(res[i]);
          // }
          this.feelslike = res[0][2];
          this.current = res[0][1];
          this.description = res[0][3];
          this.city = this.value.toUpperCase();
          this.currentDescription = res[0][3];
          this.id = res[0][0];
          console.log(res[0]);
          console.log(this.id);
          this.cookieService.set( 'Test', this.city, 2 );
          this.cookieValue = this.cookieService.get('Test');
          this.saved = this.cookieService.get('Test');
          console.log("current searched city is " + this.cookieValue);
      });
  }

  getRefresh(){
    return this.http.get("https://klima123.herokuapp.com/weather",{
      headers: {city: this.cookieService.get('Test')}
    })
      .subscribe(res =>{
          this.weather.push(res[1]);
          this.weather.push(res[2]);
          this.weather.push(res[3]);
          this.weather.push(res[4]);
          this.weather.push(res[5]);
          // for(var i = 1; i < 5; i++){
          //    this.weather.push(res[i]);
          // }
          this.feelslike = res[0][2];
          this.current = res[0][1];
          this.description = res[0][3];
          this.city = this.cookieService.get('Test').toUpperCase();
          this.currentDescription = res[0][3];
          this.id = res[0][0];
          console.log(res[0]);
          console.log(this.id);
          this.cookieService.set( 'Test', this.city, 2 );
          this.cookieValue = this.cookieService.get('Test');
          this.saved = this.cookieService.get('Test');
          console.log("current searched city is " + this.cookieValue);

          this.show = true;
      });
  }

  onSubmit() {
    console.log(this.value);
  }

  onEnter(value: string) {
    let date: Date = new Date();
    console.log(date.getDay());

    this.show = true;

    this.weather = [];
    this.color = [];
    // this.highWeather = [];
    // this.lowWeather = [];
    console.log(this.value);
    console.log(this.getWeather());

  }

}
