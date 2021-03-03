import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { IMessage, IUser } from "../../../assets/interfaces/shared.interface";
import { decrypt } from "ntru";

@Component({
  selector: "chat-window",
  templateUrl: "./chat-window.component.html",
  styleUrls: ["./chat-window.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent {

  f = 83;
  g = 156;
  q = 59536;

  constructor() { }
  @Input() messages: IMessage[];
  @Input() selectedUser: IUser;
  @Output() onMessage = new EventEmitter<string>();

  public handleMessage(message: string) {
    console.log(message);
    var mes = this.decryptMessage(message);
    console.log(message);
    this.onMessage.emit(mes);
  }

  decryptMessage(cipher: string) {
    const numArray = cipher.split(" ").map((num) => parseInt(num));
    const decryptedArray = numArray.map((num) => decrypt(num, this.q, this.f, this.g));
    return decryptedArray.map((num) => String.fromCharCode(num)).join("");
  };
}
