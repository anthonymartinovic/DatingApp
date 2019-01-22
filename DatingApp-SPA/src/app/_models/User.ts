import { Validators } from '@angular/forms';

export { IUser, userLoginFormModel };

interface IUser {
  username: string;
  password: string;
}

interface IUserLoginFormModel {
  username: [string, Validators[]];
  password: [string, Validators[]];
}

const userLoginFormModel: IUserLoginFormModel = {
  username: ['', [Validators.required]],
  password: ['', [Validators.required]]
};

