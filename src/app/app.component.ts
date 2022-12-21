import { Component } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Platform } from '@ionic/angular';
import { PushService } from './services/push.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  externalUserId: string = '1b62b436-dbb3-4d38-9153-c4543d785200';
  constructor(private platform: Platform, private pushService: PushService) {
    this.initialConfiguration();
  }

  initialConfiguration() {
    this.platform.ready().then(() => {
      OneSignal.setAppId('2eaa26f9-33c9-4721-b6a0-bebf40923b17');
      OneSignal.setNotificationWillShowInForegroundHandler(
        (notificationReceivedEvent) => {
          const notification = notificationReceivedEvent.getNotification();
          console.log(notification);
          this.pushService.receivedNotification(notification);
          notificationReceivedEvent.complete(notification);
        }
      );
      OneSignal.setNotificationOpenedHandler((not) => {
        console.log('notification opened', not);
      });
      OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log('User accepted notifications: ' + accepted);
      });
      OneSignal.setExternalUserId(this.externalUserId, (results) => {
        console.log('Results of setting external user id', results);
      });
      OneSignal.getDeviceState((state) => {
        this.pushService.userIdObs.next(state.userId);
      });
    });
  }
}
