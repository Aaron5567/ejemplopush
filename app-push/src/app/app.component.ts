import { RestService } from './rest.service';
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  respuesta: any;
  apiData: any;

  readonly VAPID_PUBLIC_KEY = "BBLQU-QqChVfWAo9oqd9xvtxh8yST-lNxCObFvi_1cAU2iXbhzzQ3U6-2TspkmmDLrSPHtKXEedy5ltOOSpbah4";
  // readonly VAPID_PUBLIC_KEY = "BJP6ojueeNY9Dmt7lgohpWC9FOneTXKysd7GCL_GlmZCyaEVoEBt0JthmzA1qbVhKZ2ff_SXIKsMpb7apjbaPNU";
  private baseUrl = '192.168.77.84:3003/api/enviar';

  constructor(
    private swPush: SwPush,private http: HttpClient,) {
  }


  ngOnInit() {
    this.subscribeToNotifications();

    this.swPush.messages.subscribe((message) => console.log(message));
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });

    // this.http.get('http://dummy.restapiexample.com/api/v1/employees').subscribe(
    //   (res: any) => {
    //     this.apiData = res.data;
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
  }

  // this.swPush.notificationClicks.subscribe(
  //   ({action, notification}) => {
  //       // TODO: Do something in response to notification click.
  //   });


  subscribeToNotifications() {

    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush.requestSubscription(
      {
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }
    ).then(respuesta => {
      this.respuesta = respuesta
      // this.sendToServer(respuesta)
    })
      .catch(err => {
        this.respuesta = err
      }
      
      );
     
  }

  // sendToServer(params: any){
  //   this.http.post(this.baseUrl, { notification : params }).subscribe();
  // }
}
