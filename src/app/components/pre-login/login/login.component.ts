import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BetaRequest } from 'src/app/interfaces/beta-request';
import { usernameValidator } from '../../shared/username-validator';
import { ApiProviderService } from 'src/app/services/api-provider.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { passwordValidator } from '../../shared/password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  requestForm = this.fb.group({
    loginId: [
      '',
      Validators.compose([
        Validators.required,
        usernameValidator(),
        Validators.maxLength(100)
      ])
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        passwordValidator()
      ])
    ]
  });
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private fb: FormBuilder,
    private service: ApiProviderService,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  signUp(formData: BetaRequest) {
    if (this.requestForm.invalid) {
      return false;
    }

    this.service
      .login(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          console.log(res);
          this.storage.setLoginId(formData.loginId);
          this.router.navigate(['home']);
        },
        err => console.error(err)
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
