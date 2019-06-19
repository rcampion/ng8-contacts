import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../core/services/error.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.changeMessage('');
  }

}
