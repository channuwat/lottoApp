import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonItem, IonButton, IonText, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItemDivider, IonLabel, IonText, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonList, IonItemGroup, IonItem, IonButton, FormsModule],
})
export class HomePage {
  inputCount: any[] = [{ value: null }]

  constructor() { }

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
    this.inputCount.forEach(item => {
      let numStr: string = '';
      if (item.value > 0 && item.value < 100) {
        numStr += item.value
        let resultArray = numStr.split('').map(Number);
        let result = resultArray[0] + resultArray[1];
        this.calculatedResult.push({ key: item.value, result: result,value: this.findPairs(myNumber, result) })
        console.log(this.calculatedResult);

      } else {
        console.log('เลขไม่ถูกต้อง');
      }
    });
  }

  findPairs(numbers: number[], target: number) {
    let pairs = [];

    // Loop ตัวแรก (i)
    for (let i = 0; i < numbers.length; i++) {
      // Loop ตัวที่สอง (j) เริ่มจากตัวถัดจาก i เพื่อไม่ให้ซ้ำคู่เดิม
      for (let j = i + 1; j < numbers.length; j++) {

        // IF: ตรวจสอบว่าบวกกันได้ Target ไหม
        if (numbers[i] + numbers[j] === target) {
          pairs.push(numbers[i].toString() + numbers[j].toString());
        }
      }
    }
    return pairs;
  }
}
