import { Component, OnInit,inject } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keyboard from "simple-keyboard";
import { VeteransService } from '../../services/veterans.service';
import { Veteran } from '../../models/veteran';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-veterans',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    
  ],
  providers: [VeteransService],
  templateUrl: './veterans.component.html',
  styleUrl: './veterans.component.scss'
})


export class VeteransComponent  implements OnInit {
    constructor(){}
    public veteransService:VeteransService = inject(VeteransService);
    public veteranArray:Veteran[] = [];
    public letterArray: string[] = 'А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Э Ю Я'.split(' ');
    public keyboard: any;
    public value = "";
    public greekLayout:any = {
      'default': [
        'й ц у к е н г ш щ з х ъ {bksp}',
        'ф ы в а п р о л д ж э',
        'я ч с м и т ь б ю',
        '{space}'
      ],
      'shift': [
        '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
        '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ /',
        '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
        '{shift} Я Ч С М И Т Ь Б Ю , {shift}',
        '.com @ {space}'
      ],
      buttonTheme: [
        {
          class: "keybord-button",
          buttons: "А Б В Г Д Е Ё Ж "
        }
      ]
    }
    
    ngAfterViewInit() {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      })
      this.keyboard.setOptions({
        layout: this.greekLayout
      })
    }

    onInputChange = (event: any) => {
      this.keyboard.setInput(event.target.value);
    };

    onChange = (input: string) => {
      this.value = input;
  
    };

    onKeyPress = (button: string) => {
    
    };
  
  getVeterans():void{
    this.veteransService.getVeterans(this.value).pipe().subscribe((res:any)=>{
      this.veteranArray = res.heroes;
      console.log(this.veteranArray[0])
    })
  }
  ngOnInit(): void {
    this.getVeterans()
  }

}
