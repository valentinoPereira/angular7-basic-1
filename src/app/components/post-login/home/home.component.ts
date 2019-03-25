import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiProviderService } from 'src/app/services/api-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  public loginID: string;
  public ipAddress: string;
  public logoutWarn: boolean;
  public logoutWarnCount: number;

  movies: Array<string>;
  filteredMovies: Array<string>;

  constructor(
    private storage: StorageService,
    private router: Router,
    private userIdle: UserIdleService,
    private service: ApiProviderService
  ) {
    this.logoutWarn = false;
    this.logoutWarnCount = 0;
    this.loginID = this.storage.getLoginId();
    this.movies = ['Om Shanti Om', 'Tere naam', 'Jai Ho', 'Kal ho na ho'];
  }

  ngOnInit() {
    
    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle
      .onTimerStart()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(count => {
        console.log(count);
        if (count) {
          this.logoutWarnCount = 30 - count;
          this.logoutWarn = true;
        }
      });

    // Start watch when time is up.
    this.userIdle
      .onTimeout()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        console.log('Time is up!');
        this.userIdle.stopWatching();
        this.logout();
      });
  }

  searchMovie(value) {
    this.filteredMovies = this.movies.filter(item => {
      return item.toLowerCase().includes(value.toLowerCase().trim());
    });
  }

  confirmLogout() {
    if (confirm('Do you really want to logout?')) {
      this.logout();
    }
  }

  logout() {
    this.storage.destroyLoginId();
    this.router.navigate(['login']);
  }

  stopTimer() {
    this.userIdle.stopTimer();
    this.logoutWarn = false;
  }

  getIP() {
    this.service
      .getIpAddress()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res && res['ip']) {
          this.ipAddress = res['ip'];
        }
      });
  }

  ngOnDestroy() {
    console.log('Destroyed');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
