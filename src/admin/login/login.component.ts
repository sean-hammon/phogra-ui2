import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit({value, valid}: {value: User, valid: boolean}) {
        console.log(value, valid );
    }

}
