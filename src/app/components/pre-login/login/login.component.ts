import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BetaRequest } from 'src/app/interfaces/beta-request';
import { usernameValidator } from '../../shared/username-validator';
import { ApiProviderService } from 'src/app/services/api-provider.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { passwordValidator } from '../../shared/password-validator';

enum PasswordType {
  T = 'text',
  P = 'password'
};

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
        Validators.minLength(8),
        Validators.maxLength(20),
        passwordValidator()
      ])
    ]
  });
  private ngUnsubscribe: Subject<any> = new Subject();
  passwordType: PasswordType;
  passwordTypeToggleText: string;
  constructor(
    private fb: FormBuilder,
    private service: ApiProviderService,
    private router: Router,
    private storage: StorageService
  ) {
    this.togglePasswordDisplay();
  }

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

  togglePasswordDisplay() {
    if (this.passwordType === PasswordType.P) {
      this.passwordType = PasswordType.T;
      this.passwordTypeToggleText = 'Hide';
    } else {
      this.passwordType = PasswordType.P;
      this.passwordTypeToggleText = 'Show';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
