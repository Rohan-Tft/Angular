import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-list',
  templateUrl: './viewList.component.html',
  styleUrls: ['./viewList.component.scss']
})

export class ViewlistComponent implements OnInit{


  //receiving the data from the Parent component(app)
  @Input() listArray : Array<any>= [] ;

  constructor(){}

  ngOnInit() {}


}

