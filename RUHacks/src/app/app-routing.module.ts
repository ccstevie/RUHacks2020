import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NebularComponent } from './nebular/nebular.component';

const routes: Routes = [
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'nebular', component: NebularComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
