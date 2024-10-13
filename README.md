# SPAM CHECKER Front-end Source Code

## Overview
This repository is the JavaScript-based front-end for the Spam Checker web app, which connects to a LINE bot for spam message detection.


## CLI Commands
```
npm install 
npm run dev
```
## API 
This project uses the API from https://github.com/inwchamp1337/flaskspamhambackend.git


## debug
- สลับตำแหน่งค่า Probability ให้ตรงตาม api 
```javascript
const data = await response.json();  // ดึงข้อมูล JSON จาก API
setPrediction(data.prediction[0]);  // เก็บผลลัพธ์การทำนาย (Spam หรือ Ham)
setHamProbability(data.prediction[2]);  // เก็บความน่าจะเป็นว่าไม่ใช่สแปม
setSpamProbability(data.prediction[1]);  // เก็บความน่าจะเป็นว่าเป็นสแปม
```
