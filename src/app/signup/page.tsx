'use client';
import styles from '../page.module.css'
import { FormEvent, useState } from 'react';
import {FormValidError, emailValidation, passwordValidation, passwordConfirmValidation, nameValidation} from '../../utils/form_validation'
import { User, createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING } from '@/context/firebase.context';
import Utils from '@/utils/utils';

export default function Signup() {
  const { state, dispatch } = useFirebaseContext()
  const defaulyFormError:FormValidError = {
    isValid: true,
    message: ''
  } 
  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(defaulyFormError);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(defaulyFormError);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(defaulyFormError);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(defaulyFormError);

  const [user, setUser] = useState<User>();
 

  const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setvalidEmail(emailValidation(e.target.value));
  }
  const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setValidPassword(passwordValidation(e.target.value));
  }
  const handleChangePasswordConfirm = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
    setValidPasswordConfirm(passwordConfirmValidation(password, e.target.value));
  }
  const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setValidName(nameValidation(e.target.value));
  }

  /**
   * 新規登録
   */
  const submit = async (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const firebase = state.firebase || initializeFirebaseApp();
      dispatch({type: SET_FIREBASE_APP, value: firebase})
      const auth = state.firebaseAuth || getAuth(firebase);
      dispatch({type: SET_FIREBASE_AUTH, value: auth})
      dispatch({type: SET_LOADING, value: true})

      await createUserWithEmailAndPassword(auth, email, password).then((res) => {
        if(res.user){
          setUser(res.user);
          dispatch({type: SET_USER, value: res.user})
          if(name){

            const profileParam = {
              displayName: name //, photoURL: "https://example.com/jane-q-user/profile.jpg" // 画像もあるならここを使う
            }

            updateProfile(auth.currentUser, profileParam).then((res2) => {
              dispatch({type: SET_LOADING, value: false})
              Utils.popup("登録完了")
            }).catch((error) => {
              dispatch({type: SET_LOADING, value: false})
              Utils.errorMessage('新規登録は完了しましたが、名前の登録に失敗しました。')
            });
          } else {
            dispatch({type: SET_LOADING, value: false})
            Utils.popup("登録完了")
            dispatch({type: SET_USER, value: res.user})
          }
        } else {
          dispatch({type: SET_LOADING, value: false})
          Utils.errorMessage('新規登録中にエラーが発生しました。')
        }
      }).catch((error) => {
        dispatch({type: SET_LOADING, value: false})
        Utils.errorMessage(`${error}`)
      })
  }

  return (
    <main className={`${styles.main} row`}>
      <div className="col">
      <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">メールアドレス</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={email} onChange={handleChangeEmail}/>
            {!validEmail.isValid && (
              <div id="emailFeedback" className="text-danger">{validEmail.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">パスワード</label>
            <input type="password" className="form-control" id="password" defaultValue={password} onChange={handleChangePassword} />
            {!validPassword.isValid && (
              <div id="passwordFeedback" className="text-danger">{validPassword.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">確認用パスワード</label>
            <input type="password" className="form-control" id="passwordConfirm" defaultValue={passwordConfirm} onChange={handleChangePasswordConfirm} />
            {!validPasswordConfirm.isValid && (
              <div id="passwordConfirmFeedback" className="text-danger">{validPasswordConfirm.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">名前</label>
            <input type="text" className="form-control" id="name" defaultValue={name} onChange={handleChangeName} />
            {!validName.isValid && (
              <div id="passwordConfirmFeedback" className="text-danger">{validName.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" >登録</button>
        </form>

        <div className="mt-5 row">
            <div className="col-2 p-1">
              <Link href="/">トップに戻る</Link>
            </div>
            <div className="col-2 p-1">
              <Link href="/signin">ログインはこちら</Link>
            </div>
        </div>
      </div>
    </main>
  )
}
