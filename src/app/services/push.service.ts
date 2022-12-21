import { EventEmitter, Injectable } from '@angular/core';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  messages: any[] = [];

  public pushListener: EventEmitter<any> = new EventEmitter();
  public userIdObs: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  receivedNotification(notification: OSNotification) {
    const notificationId = notification.notificationId;
    const alreadyExist = this.messages.find(
      (message) => message.notificationID === notificationId
    );
    if (alreadyExist) {
      return;
    }
    const noti = {} as any;
    noti.title = notification.title;
    noti.body = notification.body;
    noti.additionalData = notification.additionalData;
    this.messages.unshift(noti);
    this.pushListener.emit(noti);
  }
}
