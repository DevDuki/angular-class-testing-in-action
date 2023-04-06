import { Component, OnInit } from '@angular/core';
import { GlobalErrorHandlerService } from '../_services/global-error-handler/global-error-handler.service';

@Component({
  selector: 'ld-app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.scss']
})
export class AppNotificationsComponent implements OnInit {
  errorMessages: string[] = [];

  constructor(private globalErrorHandlerService: GlobalErrorHandlerService) {}

  ngOnInit() {
    this.globalErrorHandlerService.getErrors$().subscribe(error => {
      this.errorMessages.push(error.text);
    });
  }

  removeError(fakeErrorMessage: string) {
    const indexOfMessage = this.errorMessages.indexOf(fakeErrorMessage);
    if (indexOfMessage !== -1) {
      this.errorMessages.splice(indexOfMessage, 1);
    }
  }
}
