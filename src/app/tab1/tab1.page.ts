import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  stations: any[] = [];
  stationNames: string[] = [];
  selectedStation: string = '';
  message: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.loadData();
    this.dataService.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }

  loadData() {
    this.http.get<any[]>('assets/bikeshare.json').subscribe(
      (data) => {
        this.stations = data;
        this.stationNames = this.stations.map((station) => {
          const stationName = station.stationName;
          this.dataService.setItem(stationName, station);
          return stationName;
        });
        this.toast
          .show('Bike station data loaded successfully', '5000', 'center')
          .subscribe((toast) => {
            console.log('Toast shown');
          });
      },
      (error) => {
        console.error('Error loading data:', error);
        this.toast
          .show('Error loading bike station data', '5000', 'center')
          .subscribe((toast) => {
            console.log('Toast shown');
          });
      }
    );
  }

  onStationSelected() {
    if (this.selectedStation) {
      this.router.navigate(['/tabs/tab2'], {
        queryParams: { station: this.selectedStation },
      });
    }
  }
}
