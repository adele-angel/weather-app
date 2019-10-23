import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = true;
  isDarkTheme: boolean = false;
  currentDate: string = "";

  constructor() {}

  ngOnInit() {
    this.isLoading = false;
    this.currentDate = new Date(Date.now()).toUTCString();
  }

  changeTheme() {
    if (this.isDarkTheme) {
      document.documentElement.style.setProperty("--color-primary", "#0e87d8");
    } else {
      document.documentElement.style.setProperty("--color-primary", "#000000");
    }
    this.isDarkTheme = !this.isDarkTheme;
  }
}
