export var GLOBAL={
  url:'http://127.0.0.1:5000/',
  header_color: 'blue'
};

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
}
