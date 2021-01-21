import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "../services/user.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  public user = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  constructor(
    public _userService: UserService,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  createUser(form) {
    if (this.user.password != this.user.confirmPassword) {
      console.log("contraseñas no coinciden");
      this.presentToastWithOptions();
    } else {
      this._userService.addUser(this.user).subscribe(
        (res) => {
          if (res.token) {
            sessionStorage.setItem("token", res.token);
            this.presentToast();
            setTimeout(() => {
              this.router.navigate(["/start"]);
            }, 2000);
          } else {
            this.registerError();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Todo salió bien.",
      duration: 2000,
      color: "success",
    });
    toast.present();
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: "Las contraseñas no coinciden.",
      position: "bottom",
      duration: 3000,
      buttons: [
        {
          side: "start",
          icon: "lock-open-outline",
        },
      ],
      color: "danger",
      mode: "ios",
    });
    toast.present();
  }
  async registerError() {
    const toast = await this.toastController.create({
      message: "Ha ocurrido un error. Intenta de nuevo.",
      position: "bottom",
      duration: 3000,
      buttons: [
        {
          side: "start",
          icon: "bug-outline",
        },
      ],
      color: "danger",
      mode: "ios",
    });
    toast.present();
  }
}
