import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'klima';
  value: string;
  key = "0fe37647bf3c4095418a1c5392bb60cc";
  data;
  day1 = 0;
  high = 0;
  low = 0;
  weather = [];
  highWeather = [];
  lowWeather = [];
  color = [];
  date: Date = new Date();

  dayOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  dayCounter = this.date.getDay();
  passWeek = [];

  constructor(private http: HttpClient) {}


  getWeather(){
    return this.http.get("http://localhost:3100/weather",{
      headers: {city: this.value}
    })
      .subscribe(res =>{
          console.log(res);
      });
  }

  // getWeather() {

  //   return this.http.get
  //     ("http://api.openweathermap.org/data/2.5/forecast?q=" + this.value + "&APPID=" + this.key + "&units=metric&cnt=7")
  //     .subscribe(response => {
  //       //console.log(response);
  //       this.data = response;
  //       console.log(this.data["list"]);
  //       console.log(this.data["list"][0]["main"]["temp"]);


  //       var size = this.data["list"].length;

  //       var counter = 0;
  //       for (counter; counter < size; counter++){
  //           //if(counter == 0){
  //             this.day1 = Math.round(this.data["list"][counter]["main"]["temp"]);
  //             this.high = Math.round(this.data["list"][counter]["main"]["temp_max"]);
  //             this.low = Math.round(this.data["list"][counter]["main"]["temp_min"]);
  //             if(this.day1 < -30){
  //               this.color.push("#3103fc");
  //             }
  //             else if(this.day1 < -20 && this.day1 >= -30){
  //               this.color.push("#0324fc");
  //             }
  //             else if(this.day1 < -10 && this.day1 >= -20){
  //               this.color.push("#0362fc");
  //             }
  //             else if(this.day1 <= 0 && this.day1 >= -10){
  //               this.color.push("#03cafc");
  //             }
  //             else if(this.day1 < 10 && this.day1 > 0){
  //               this.color.push("#03fcbe");
  //             }
  //             else if(this.day1 < 15 && this.day1 >= 10){
  //               this.color.push("#fcdb03");
  //             }
  //             else if(this.day1 < 20 && this.day1 >=15){
  //               this.color.push("#fcba03");
  //             }
  //             else if(this.day1 < 25 && this.day1 >= 20){
  //               this.color.push("#fc8c03");
  //             }
  //             else if(this.day1 < 30 && this.day1 >= 25){
  //               this.color.push("#fc6703");
  //             }
  //             else if(this.day1 >= 30){
  //               this.color.push("#fc4e03");
  //             }
  //             this.weather.push(this.day1);
  //             this.highWeather.push(this.high);
  //             this.lowWeather.push(this.low);
  //           //}
  //           if(this.dayCounter == 7){
  //             this.dayCounter = 0;
  //           }
  //           this.passWeek.push(this.dayCounter);
  //           this.dayCounter++;

  //       }

  //       console.log(this.dayOfWeek[0]); 
  //     }
  //     )
  // }

  onSubmit() {
    console.log(this.value);
  }

  onEnter(value: string) {
    let date: Date = new Date();
    console.log(date.getDay());

    this.weather = [];
    this.color = [];
    this.highWeather = [];
    this.lowWeather = [];
    console.log(this.value);
    console.log(this.getWeather());

  }

}
