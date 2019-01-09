import {Injectable} from '@angular/core';
import {Error} from './error';
import {HttpEvent} from '@angular/common/http';

@Injectable()
export class ErrorObject {


  public status: number;
  public errors: Error[];


  constructor(response: HttpEvent<any>) {
    this.status = response['status'];
    this.errors = response['error'].errors;
  }
}
