import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES } from 'app/shared/enums/routes'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    showLoginProfile: boolean = true;
    login: boolean = false;

    constructor(public location: Location, private element : ElementRef, private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.checkLoginPage()
    }

    ngAfterViewChecked() {
        
    }

    checkLoginPage() {
        if(this.router.url == ROUTES.login){
            this.showLoginProfile = false
        } else {
            this.showLoginProfile = true
        }
    } 

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    indexPressed() {
        this.showLoginProfile = true;
        this.router.navigate([ROUTES.index]);
    }

    loginProfileButtonPressed() {
        this.showLoginProfile = false;
        if (this.login) {

        } else {
            this.router.navigate([ROUTES.login]);
        }
    }
}
