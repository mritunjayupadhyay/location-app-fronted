import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  activeInput = "input_form_sign d_block active_inp";
  inActiveInput = "input_form_sign";
  sign_in_class = "active";
  sign_up_class = "inActive"
  inputClass = "input_form_sign";
  isSignIn = true;

  name_us = '';
  email_us = '';
  pass_us = '';
  conf_pass_us = '';
  constructor() { }

  ngOnInit(): void {
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

}
