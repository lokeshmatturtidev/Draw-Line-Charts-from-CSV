import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Line Chart with CSV';
  showChart:boolean = false;
  dataSets : any[] = [];
  view: any[] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  autoScale = true;

  csvJSON(csvText) {
     var lines = csvText.split("\n");

     var result = [];

     for (var i = 0; i < lines.length; i++) {

         var obj = {};
         var currentline = lines[i].split(",");

         obj["name"] = currentline[0];
         obj["series"] = [];

         for (var j = 1; j < currentline.length; j++) {
             var coordinatesArr = currentline[j].split('|');
             obj["series"].push({name: coordinatesArr[0], value:coordinatesArr[1]});
         }

         result.push(obj);
     }

     this.dataSets = result;
     this.showChart = true;
  }

  convertFile(input) {
     const reader = new FileReader();
     reader.readAsText(input.files[0]);
     reader.onload = () => {
       let text = reader.result;
       this.csvJSON(text);
     };
  }
}
