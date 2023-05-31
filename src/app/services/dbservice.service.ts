import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, 
  increment, addDoc,
getDoc, docData } from '@angular/fire/firestore';
import { Observable, catchError, from, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private firestore: Firestore,
    private auth: AngularFireAuth) 
  {

  }
  getData(parameter: any)
  {
    let $getDataQuery = collection(this.firestore,`${parameter}`);
    return collectionData($getDataQuery, {idField: 'id'}) as Observable<any[]>;
  }
  getDataById(parameter: any, specificId: any)
  {
    let $getDataByIdQuery = doc(this.firestore, `${parameter}/${specificId}`);
    return docData($getDataByIdQuery)as Observable<any>;
  }
  postData(parameter: any, specificData: any)
  {
    let $postDataQuery = collection(this.firestore,`${parameter}`);
    return addDoc($postDataQuery, specificData)
  }
  updateData(id:string, specificData:any, parameter: any)
  {
    let $updateDataQuery = doc(this.firestore,`${parameter}/${id}`);
    return updateDoc($updateDataQuery, specificData);    
  }
  signIn(params: any): Observable<any>
  {
    return from
    (
      this.auth.signInWithEmailAndPassword
      (
        params.email,
        params.password
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }
  translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    if (code === "auth/missing-email")
    {
      return "Missing email"
    }
    if (code === "auth/missing-password")
    {
      return "Missing password"
    }
    return message;
  }
}
type SignIn = {
  email: string;
  password: string;
}
type FirebaseError = {
  code: string;
  message: string
};
