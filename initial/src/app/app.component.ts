import { Component } from '@angular/core';

@Component({
  selector: 'ld-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greeting: string = 'Hello';

  getWelcomingMessage(userName: string): string {
    return `${this.greeting} ${userName}`;
  }
}
