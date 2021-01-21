import { Component, OnInit } from "@angular/core";
import { PickerOptions } from "@ionic/core";
import { PickerController } from "@ionic/angular";

@Component({
  selector: "app-start",
  templateUrl: "./start.page.html",
  styleUrls: ["./start.page.scss"],
})
export class StartPage implements OnInit {
  pickerColumnOptions;
  framework = "";
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  divisa: string = "&#36;";
  selectedDivisa: Boolean = false;
  valor: number;

  constructor(private pickerCtrl: PickerController) {
    this.pickerColumnOptions = [
      { text: "Colon", value: "&#162;" },
      { text: "Dolar", value: "&#36;" },
      { text: "Euro", value: "&#128;" },
      { text: "Libra", value: "&#8356;" },
    ];
  }

  ngOnInit() {}
  async showBasicPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Elegir",
          role: "done",
        },
      ],
      columns: [
        {
          name: "Divisas",
          options: this.pickerColumnOptions,
        },
      ],
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async (data) => {
      if (data.data == undefined) {
      } else {
        let col = await picker.getColumn("Divisas");
        this.framework = col.options[col.selectedIndex].text;
        this.selectedDivisa = true;
        this.divisa = data.data.Divisas.value;
      }
    });
  }
}
