import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas-imp.component.html',
  styleUrls: ['./pruebas-imp.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PruebasImpComponent {
  dataSource: Level1Element[] = [
    {
      name: 'Level 1 - Row 1',
      children: [
        {
          name: 'Level 2 - Row 1',
          children: [
            {
              name: 'Level 3 - Row 1',
              children: [
                { name: 'Level 4 - Row 1' },
                { name: 'Level 4 - Row 2' }
              ]
            },
            { name: 'Level 3 - Row 2' }
          ]
        },
        { name: 'Level 2 - Row 2' }
      ]
    },
    {
      name: 'Level 1 - Row 2',
      children: [
        { name: 'Level 2 - Row 3' },
        {
          name: 'Level 2 - Row 4',
          children: [
            { name: 'Level 3 - Row 3' },
            { name: 'Level 3 - Row 4' }
          ]
        }
      ]
    }
  ];

  columnsToDisplay = ['name'];
  expandedElement: Level1Element | Level2Element | Level3Element | Level4Element | null = null;
}

interface Level1Element {
  name: string;
  children?: Level2Element[];
}

interface Level2Element {
  name: string;
  children?: Level3Element[];
}

interface Level3Element {
  name: string;
  children?: Level4Element[];
}

interface Level4Element {
  name: string;
}