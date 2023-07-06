# Nextjs13_NEXT_PUBLIC_FIREBASE_Auth
NEXT.js13でFirebase Authを実装しました。

## Demo
https://nextjs13-firebase-auth.vercel.app/

## get start
Create a Firebase account and create a project.
Firebaseのアカウントを作成し、プロジェクトを作成します。
[Firebase Doc](https://firebase.google.com/docs?hl=ja)

## copy and paste your app's Firebase Configuration at .env.local
アプリのFirebase設定を.env.localにコピー＆ペーストします。
```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxx
NEXT_PUBLIC_FIREBASE_AUYH_DOMAIN=xxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxx
NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID=xxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxx
```
`.env.local` is not reflected in github. Note that when using environment variables in vercel or github pages, you must set the environment variable in the given location.
`.env.local` は github には反映されません。vercelやgithubのページで環境変数を使う場合は、指定された場所に環境変数を設定する必要があることに注意してください。

## Design
[tailwindcss](https://tailwindcss.com/)

## In addition
・The process for sign-in and sign-up completion is not implemented. It would be better to handle the transition to the top screen or other screens.

・`/src/utils/form_validation.tsx` checks the contents entered in the form. Please change the regular expressions, etc. according to your specifications.

・Common processing for popups and error handling was created in `/src/utils/utils.tsx`. Each of them uses alert and console.log, but you can change them to your own implementation.

