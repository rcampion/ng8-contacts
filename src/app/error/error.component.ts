import { Component, OnInit } from '@angular/core';

import { ErrorService } from '../core/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message: string;
  constructor(private data: ErrorService) {}
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }
}
