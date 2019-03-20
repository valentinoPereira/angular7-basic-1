import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  templateUrl: './angular-logo.component.html',
  styleUrls: ['./angular-logo.component.scss']
})
export class AngularLogoComponent implements OnInit {
  @Input() width: number;
  constructor() { }

  ngOnInit() {
  }

}
