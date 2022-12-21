import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  messages: any[] = [];
  userID: string = '';
  constructor(
    public pushService: PushService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.pushService.userIdObs.subscribe((val) => {
      this.userID = val;
      console.log(val);
    });
    this.pushService.pushListener.subscribe((data) => {
      this.messages.unshift(data);
      setTimeout(() => {
        this.ref.detectChanges();
      }, 200);
      console.log(this.messages);
    });
  }
  async ionViewWillEnter() {
    console.log(this.messages, 'enter');
  }

  execute() {
    this.pushService.pushListener.emit({
      title: 'Fake push',
      body: 'this is the body of push',
      date: new Date(),
      additionalData: { userID: '1231313' },
    });
    console.log('action executed');
  }
}
