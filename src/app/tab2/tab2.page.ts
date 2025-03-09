import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  stationName: string = '';
  stationDetails: any = null;
  newMessage: string = '';
  receivedMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['station']) {
        this.stationName = params['station'];
        this.loadStationDetails();
      }
    });

    this.dataService.currentMessage.subscribe((message) => {
      this.receivedMessage = message;
    });
  }

  loadStationDetails() {
    if (this.stationName) {
      this.stationDetails = this.dataService.getItem(this.stationName);
      if (!this.stationDetails) {
        this.toast
          .show('Station details not found', '5000', 'center')
          .subscribe((toast) => {
            console.log('Toast shown');
          });
      }
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.dataService.changeMessage(this.newMessage);
      this.toast.show('Message sent', '5000', 'center').subscribe((toast) => {
        console.log('Toast shown');
      });
      this.newMessage = '';
    } else {
      this.toast
        .show('Please enter a message', '5000', 'center')
        .subscribe((toast) => {
          console.log('Toast shown');
        });
    }
  }
}
