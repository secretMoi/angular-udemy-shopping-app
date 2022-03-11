import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHosts?: PlaceholderDirective;

  private closeSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnDestroy(): void {
      this.closeSubscription?.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }

    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);

        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerReference = this.alertHosts?.viewContainerRef;
    hostViewContainerReference?.clear()

    const componentReference = hostViewContainerReference?.createComponent(alertComponentFactory);

    if(componentReference) {
      componentReference.instance.message = message;
      this.closeSubscription = componentReference.instance.close.subscribe(() => {
        this.closeSubscription?.unsubscribe();
        hostViewContainerReference?.clear();
      });
    }

  }

  onHandleError() {
    this.errorMessage = null;
  }
}
