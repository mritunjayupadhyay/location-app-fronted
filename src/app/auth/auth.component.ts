import { AuthService } from './auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  activeInput = "input_form_sign d_block active_inp";
  inActiveInput = "input_form_sign";
  sign_in_class = "active";
  sign_up_class = "inActive"
  inputClass = "input_form_sign";
  isSignIn = true;

  completeLogin: Subscription;
  completeRegister: Subscription;


  name_us = '';
  email_us = '';
  pass_us = '';
  conf_pass_us = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.completeLogin = this.authService.completeLogin
    .subscribe(
      (data) => {
        alert(data);
      },
      (error) => {
        alert(error);
      }
    );
    this.completeRegister = this.authService.completeRegister
    .subscribe(
      (data) => {
        alert(data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  ngOnDestroy() {
    this.completeLogin.unsubscribe();
    this.completeRegister.unsubscribe();
  }

  sign_in() {
    this.sign_in_class = "active";
    this.sign_up_class = "inActive";
    this.inputClass = this.inActiveInput;
    this.isSignIn = true;
  }

  sign_up() {
    this.sign_in_class = "inActive";
    this.sign_up_class = "active";
    this.inputClass = this.activeInput;
    this.isSignIn = false;
  }

  onChangeText(event) {
    if (!event) { return; }
    const { name, value  } = event.target;
    this[name] = value;
  }

  submit_sign_in(event) {
    const { email_us, pass_us } = this;
    if (!(email_us && pass_us)) {
      alert('Email and password are not valid');
      return;
    }
    this.authService.login({email: email_us, password: pass_us });
  }

  submit_sign_up(event) {
    const { email_us, name_us,  pass_us, conf_pass_us } = this;
    if (!(email_us && name_us && pass_us)) {
      alert('Email, Password and name are required');
      return;
    }
    if (pass_us !== conf_pass_us) {
      alert('Password and confirm password are not same');
      return;
    }
    this.authService.register({email: email_us, password: pass_us, name: name_us });
  }

}
