import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit{
  public chart!: Chart
  
  ngOnInit(): void {
    const data = {
      labels: ['Enero','Febrero','Marzos','Abril','Mayo','Junio','Julio'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    this.chart=new Chart('chart',{
      type:'line',
      data
    })
  }


}
