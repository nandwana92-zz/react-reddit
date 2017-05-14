import snoowrap from 'snoowrap';

export function a() {
  console.log('this is A');
}

let r = false;

export function initializeSnooWrap(data) {
  // {
  //   userAgent: 'put your user-agent string here',
  //   clientId: 'put your client id here',
  //   clientSecret: 'put your client secret here',
  //   refreshToken: 'put your refresh token here'
  // }

  r = new snoowrap(data);
}

export function getSnooWrapInstance() {
  return r;
}

let obj = ['abhishek', 'vijay', 'ratan'];

export function add(value) {
  obj.push(value);
}

export function get(value) {
  return obj;
}

export default function something() {
  console.log('this is something and it is default');
}
