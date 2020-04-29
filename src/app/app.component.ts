import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string;
  key = "GET YOUR OWN KEY";
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
  progress: boolean;

  constructor(private http: HttpClient, 
    private cookieService: CookieService,
    private snackBar: MatSnackBar) {}

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
          this.progress = false;
          this.show = true;
          this.snackBar.dismiss();
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
          this.progress = false;
          this.show = true;
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

    if(value == ""){
      this.snackBar.open("Please enter a valid city");
    }
    else{
      console.log(this.cookieService.get('Test'));
      this.progress = true;
      this.snackBar.open("Request is taking longer than usual, thanks for patience!!");
      this.weather = [];
      this.color = [];
      console.log(this.getWeather());
    }

   
    // this.highWeather = [];
    // this.lowWeather = [];
    console.log(this.value);

  }

}
