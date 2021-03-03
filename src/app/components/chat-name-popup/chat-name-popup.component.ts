import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { decrypt } from "ntru";
import { IConfig } from "../../../assets/interfaces/shared.interface";
import { CONFIG } from "./chat-name-popup.constants";

@Component({
  selector: "chat-name-popup",
  templateUrl: "./chat-name-popup.component.html",
  styleUrls: ["./chat-name-popup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNamePopupComponent {

  f = 83;
  g = 156;
  q = 59536;

  constructor() { }
  @Output() onUserNameChange = new EventEmitter<string>();
  public config: IConfig = CONFIG;

  public handleUserName(name: string) {
    let usr = this.decryptMessage(name);
    this.onUserNameChange.emit(usr);
  }

  decryptMessage(cipher: string, fromChars?: boolean) {
    const numArray = fromChars
      ? cipher.split("").map((char) => char.charCodeAt(0))
      : cipher.split(" ").map((num) => parseInt(num));
    const decryptedArray = numArray.map((num) => decrypt(num, this.q, this.f, this.g));
    return decryptedArray.map((num) => String.fromCharCode(num)).join("");
  };
}
