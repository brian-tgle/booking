# Simple Booking web app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

## Feature
- Authentication
- Booking management
- Approve/reject booking
- Event category management

## Built with:
- **NodeJS/MongoDB**: For server side. (Node 10+)
- **ReactJS**: For client side. (React 17.x)
- 💎 **Hooks**: Use react hooks API instead of traditional class API
- 🚀 **State of The Art Development**: Newest development stack of NodeJS/React/Hooks/React Sweet State
- **react-sweet-state** for state management
- **husky/lint-staged** for checking before commiting and pushing (check it out in ```husky``` and ```lint-staged``` section in ```package.json```)
- **stylelint** for checking style convention
- **jest** framework and runner, **react-test-renderer**, **enzyme** are test utilities
- **localForage** for improving the offline experience by using asynchronous storage

## 📦 Install

```bash
$ git clone https://github.com/brian-tgle/booking.git
$ cd tinder-clone
```
### Start server
```bash
$ cd server
$ npm install
$ node server
```
Server live on: http://localhost:5000/
Exposed API:
```bash
POST: /auth/login            Login
```
```bash
GET: /auth/register          Register a new account
```
```bash
GET: /booking                List of booking
```
```bash
POST: /booking               Create a new booking
```
```bash
PUT: /booking/:bookingId     Update booking, using for approve or reject a booking
```
```bash
DELETE: /booking/:bookingId  Delete a booking in pending review
```
### Start client
```bash
$ npm install
$ npm start
```
Client live on: http://localhost:3000/

## 🔨 Build

```bash
npm install
npm run build
```

## 🖥 Browsers support

Modern browsers and Internet Explorer 10+.

## IDE Settings
Current setting available: auto fixing and linting code on save.
Check it out in ```.vscode/settings.json```.
