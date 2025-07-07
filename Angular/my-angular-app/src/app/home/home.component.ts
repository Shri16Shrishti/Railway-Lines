import { Component } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// export class HomeComponent {
//   sourceStation: string = '';
//   destinationStation: string = '';
//   trains: any[] = [];
//   columns: string[] = [];
//   searched = false;

//   constructor(private homeService: HomeServiceService) {}
 
//   searchTrains() {
//     debugger;
//     this.homeService.getTrainsByRoute(this.sourceStation, this.destinationStation)
//       .subscribe({
//         next: (data) => {
//           this.trains = data;
//           this.columns = data.length ? Object.keys(data[0]) : [];
//           this.searched = true;
//         },
//         error: (err: any) => {
//           console.error('API error:', err);
//           this.trains = [];
//           this.columns = [];
//           this.searched = true;
//         }
//       });
//   }
// }
// export class HomeComponent {
//   sourceStation: string = '';
//   destinationStation: string = '';
//   trains: any[] = [];
//   columns: string[] = [];
//   searched = false;

//   constructor(private homeService: HomeServiceService) {}

//   searchTrains() {
//     this.homeService.getTrainsByRoute(this.sourceStation, this.destinationStation)
//       .subscribe({
//         next: (data) => {
//           this.trains = data || [];
//           this.columns = this.trains.length ? Object.keys(this.trains[0]) : [];
//           this.searched = true;
//         },
//         error: (err) => {
//           console.error('API error:', err);
//           this.trains = [];
//           this.columns = [];
//           this.searched = true;
//         }
//       });
//   }
// }
export class HomeComponent {
  sourceStation = '';
  destinationStation = '';

  constructor(private service:HomeServiceService,private router: Router) {}

  // searchTrains() {
  //   if (this.sourceStation && this.destinationStation) {
  //     this.router.navigate(['/search-result']); 
        
  //     //   {
  //     //   queryParams: {
  //     //     source: this.sourceStation,
  //     //     destination: this.destinationStation
  //     //   }
  //     // };
  //   }
  // }
  searchTrains() {
    this.service.getTrainsByRoute(this.sourceStation, this.destinationStation)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/search-result'], {
            state: {
              trains: data
            }
          });
        },
        error: (err) => {
          console.error('API error:', err);
          this.router.navigate(['/search-result'], {
            state: {
              trains: []
            }
          });
        }
      });
  }
  
}
