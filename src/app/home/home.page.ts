import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonContent, IonList, IonItem, IonButton, IonInput, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/angular/standalone';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardContent, IonItemDivider, IonLabel, IonContent, IonInput, CommonModule, IonList, IonItemGroup, IonItem, IonButton, FormsModule],
})
export class HomePage {
  inputCount: any[] = [{ value: null }]

  public clipboard: Clipboard = new Clipboard();
  constructor(private alertController: AlertController) {
  }

  addInput() {
    this.inputCount.push({ value: null })
  }

  removeInput(index: number) {
    let newInputCount: any[] = []
    this.inputCount.forEach((item, i) => {
      if (i != index) newInputCount.push(item)
    });
    this.inputCount = newInputCount
  }

  calculatedResult: any[] = []
  calculate() {
    this.calculatedResult = [] // reset ค่าก่อนคำนวณใหม่
    let myNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.inputCount.forEach((item, index) => {
      let numStr: string = '';
      if (item.value > -1 && item.value < 100 && item.value != null) {
        numStr += item.value
        let resultArray = numStr.split('').map(Number);
        let result = resultArray[0] + resultArray[1];
        this.calculatedResult.push({ key: item.value, result: result, value: this.findPairs(myNumber, result) })
      } else {
        numStr += item.value
        this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'กรุณาระบุเลขที่ถูกต้อง (0-99) ในเลขตัวที่ : ' + (index + 1),
          buttons: ['ตกลง'],
          mode: 'ios'
        }).then(alert => alert.present());
      }
    });
  }

  findPairs(numbers: number[], target: number) {
    let pairs = [];

    // Loop ตัวแรก (i)
    for (let i = 0; i < numbers.length; i++) {
      // Loop ตัวที่สอง (j) เริ่มจากตัวถัดจาก i เพื่อไม่ให้ซ้ำคู่เดิม
      for (let j = 0; j < numbers.length; j++) {

        // IF: ตรวจสอบว่าบวกกันได้ Target ไหม
        if (numbers[i] + numbers[j] === target) {
          pairs.push(numbers[i].toString() + numbers[j].toString());
        }
      }
    }
    return pairs;
  }

  copyToClipboard(text: any[]) {
    let textToCopy: string = ''
    text.forEach(number => {
      textToCopy += number + ' '
    })
    this.clipboard.copy(textToCopy);
  }

  copyToClipboardAll(textArray: any[]) {
    let textToCopy: string = ''
    textArray.forEach(itemGroup => {
      itemGroup.value.forEach((number: any[]) => {
        textToCopy += number + ' '
      })
      textToCopy += '\n'
    })
    this.clipboard.copy(textToCopy);
    console.log(textToCopy);

  }
}
