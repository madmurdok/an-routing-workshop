import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DialogService, CanComponentDeactivate } from './../../../core';


import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit,  CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }


  ngOnInit(): void {
    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });



    // this.user = new UserModel(null, '', '');

    // // we should recreate component because this code runs only once
    // const id = +this.route.snapshot.paramMap.get('userID');
    // this.sub = this.userArrayService.getUser(id)
    //   .subscribe(
    //     user => {
    //       this.user = {...user};
    //       this.originalUser = {...user};
    //     },
    //     err => console.log(err)
    //   );
  }

  

  onSaveUser() {
    const user = {...this.user};

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', {editedUserID: user.id}]);
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
    // this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }
}
