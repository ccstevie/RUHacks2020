import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nebular',
  templateUrl: './nebular.component.html',
  template: `

  <nb-layout>
    <nb-layout-header fixed>Company Name</nb-layout-header>

    <nb-sidebar>Sidebar Content</nb-sidebar>

    <nb-layout-column>
      Page Content <button nbButton>Hello World</button>
    </nb-layout-column>
  </nb-layout>
`,
  styleUrls: ['./nebular.component.css']
})
export class NebularComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
