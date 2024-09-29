import "./ContentStyle.css"
import React, { useState } from 'react';


function Content() {

    const [text, setText] = useState("");  // เก็บข้อความที่ผู้ใช้ป้อน
    const [prediction, setPrediction] = useState("");  // ผลลัพธ์การทำนาย (Spam หรือ Ham)
    const [hamProbability, setHamProbability] = useState(0);  // ความน่าจะเป็นว่าไม่ใช่สแปม
    const [spamProbability, setSpamProbability] = useState(0);  // ความน่าจะเป็นว่าเป็นสแปม
    const [error, setError] = useState(null);  // เก็บข้อผิดพลาด (ถ้ามี)

    // ฟังก์ชันสำหรับตรวจสอบข้อความโดยใช้ API
    const checkSpam = async () => {
        try {
            const response = await fetch('https://50f9-203-150-171-154.ngrok-free.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })  // ส่งข้อความไปที่ API
            });

            if (!response.ok) {
                throw new Error("API response was not ok");  // ตรวจสอบว่า API ตอบกลับถูกต้องหรือไม่
            }

            const data = await response.json();  // ดึงข้อมูล JSON จาก API
            setPrediction(data.prediction[0]);  // เก็บผลลัพธ์การทำนาย (Spam หรือ Ham)
            setHamProbability(data.prediction[1]);  // เก็บความน่าจะเป็นว่าไม่ใช่สแปม
            setSpamProbability(data.prediction[2]);  // เก็บความน่าจะเป็นว่าเป็นสแปม
            setError(null);  // รีเซ็ตข้อผิดพลาด
        } catch (err) {
            console.error("Error checking spam:", err);
            setError("เกิดข้อผิดพลาดในการตรวจสอบข้อความ");
        }
    };

    return (
        <section id='content'>

            <section className="nav">
                <section className="logo">
                    <img src="/src/assets/bot.jpg"></img>
                </section>
                <section className="head">
                    <span className="spam">SPAM</span> CHECKER
                </section>
                <section className="detail">
                    เช็คข้อความสแปมได้เลย
                </section>
            </section>

            <section className="container">
                <textarea
                    className="box"
                    placeholder="วางข้อความ"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button className="button" onClick={checkSpam}>
                    Check
                </button>
                <section className="result">
                    <section className="predic">
                        PREDICTION : {prediction}
                    </section>
                    <section className="probspam">
                        <div className="circlespam"></div>
                        Spam : {spamProbability.toFixed(2)}%
                    </section>
                    <section className="probham">
                        <div className="circleham"></div>
                        Ham : {hamProbability.toFixed(2)}%
                    </section>
                </section>
            </section>

            <section className="line">
                <section className="clound">
                    Ok Thank you
                </section>
                <img
                    src="./src/assets/line.png"
                />
            </section>
        </section>
    )
}

export default Content