import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PruebasComponent {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  isotopeColumnsToDisplay = ['name', 'weight'];
  expandedElement!: PeriodicElement | null;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isotopes: Isotope[];
}

export interface Isotope {
  name: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    isotopes: [
      {
        name: 'Deuterium',
        weight: 2.014
      },
      {
        name: 'Tritium',
        weight: 3.016
      }
    ]
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    isotopes: [
      {
        name: 'Helium-3',
        weight: 3.016
      },
      {
        name: 'Helium-4',
        weight: 4.002
      }
    ]
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    isotopes: [
      {
        name: 'Lithium-12',
        weight: 11.04
      }
    ]
  }
];
