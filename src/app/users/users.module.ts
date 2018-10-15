import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule, usersRouterComponents } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';
import { UserComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    UsersServicesModule,
    FormsModule
  ],
  declarations: [...usersRouterComponents, UserComponent]
})
export class UsersModule { }
