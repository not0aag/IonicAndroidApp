import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {
  BatteryStatus,
  BatteryStatusResponse,
} from '@awesome-cordova-plugins/battery-status/ngx';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';

@Component({
  selector: 'app-native',
  templateUrl: './native.page.html',
  styleUrls: ['./native.page.scss'],
  standalone: false,
})
export class NativePage implements OnInit {
  message: string = '';
  deviceInfo: any = {};
  networkType: string = '';
  batteryLevel: number = 0;
  batteryPlugged: boolean = false;

  constructor(
    private dataService: DataService,
    private device: Device,
    private network: Network,
    private batteryStatus: BatteryStatus,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.dataService.currentMessage.subscribe((message) => {
      this.message = message;
    });
    this.getDeviceInfo();
    this.getNetworkInfo();
    this.monitorBattery();
  }

  getDeviceInfo() {
    try {
      this.deviceInfo = {
        model: this.device.model || 'Unknown',
        platform: this.device.platform || 'Unknown',
        version: this.device.version || 'Unknown',
        manufacturer: this.device.manufacturer || 'Unknown',
        isVirtual: this.device.isVirtual || false,
        serial: this.device.serial || 'Unknown',
      };
      this.toast
        .show('Device information retrieved', '5000', 'center')
        .subscribe((toast) => {
          console.log('Toast shown');
        });
    } catch (error) {
      console.error('Error getting device info:', error);
      this.toast
        .show('Could not retrieve device information', '5000', 'center')
        .subscribe((toast) => {
          console.log('Toast shown');
        });
    }
  }

  getNetworkInfo() {
    try {
      this.networkType = this.network.type || 'Unknown';
      this.network.onDisconnect().subscribe(() => {
        this.networkType = 'disconnected';
        this.toast
          .show('Network disconnected', '5000', 'center')
          .subscribe((toast) => {
            console.log('Toast shown');
          });
      });
      this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          this.networkType = this.network.type;
          this.toast
            .show('Network connected: ' + this.networkType, '5000', 'center')
            .subscribe((toast) => {
              console.log('Toast shown');
            });
        }, 3000);
      });
    } catch (error) {
      console.error('Error getting network info:', error);
      this.toast
        .show('Could not retrieve network information', '5000', 'center')
        .subscribe((toast) => {
          console.log('Toast shown');
        });
    }
  }

  monitorBattery() {
    try {
      this.batteryStatus
        .onChange()
        .subscribe((status: BatteryStatusResponse) => {
          this.batteryLevel = status.level;
          this.batteryPlugged = status.isPlugged;
          this.toast
            .show('Battery status updated', '5000', 'center')
            .subscribe((toast) => {
              console.log('Toast shown');
            });
        });
    } catch (error) {
      console.error('Error monitoring battery:', error);
      this.toast
        .show('Could not monitor battery status', '5000', 'center')
        .subscribe((toast) => {
          console.log('Toast shown');
        });
    }
  }
}
