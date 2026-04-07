# Online Examination System
### Spring Boot Backend + Vanilla JS Frontend

---

## 📦 What You Need to Download & Install

### 1. Java 17 or higher
- **Download**: https://adoptium.net/temurin/releases/
- Choose: **Temurin 17 (LTS)** → your OS → `.msi` (Windows) or `.pkg` (Mac)
- Verify install: `java -version` in terminal

### 2. Apache Maven (build tool)
- **Download**: https://maven.apache.org/download.cgi
- Download: `apache-maven-3.x.x-bin.zip`
- Extract and add `/bin` to your system PATH
- Verify: `mvn -version` in terminal

### 3. IntelliJ IDEA (recommended IDE)
- **Download**: https://www.jetbrains.com/idea/download/
- Choose: **Community Edition** (free)
- Includes Maven support built-in

### 4. VS Code (for frontend editing)
- **Download**: https://code.visualstudio.com/
- Install extension: **Live Server** (by Ritwick Dey)
  - Serves frontend files with one click

### 5. Git (optional, for version control)
- **Download**: https://git-scm.com/downloads

---

## 🗂 Project Structure

```
OnlineExam/
├── backend/                        ← Spring Boot project
│   ├── pom.xml                     ← Maven dependencies
│   └── src/main/java/com/exam/
│       ├── OnlineExamApplication.java
│       ├── controller/
│       │   └── ExamController.java ← REST endpoints
│       ├── model/
│       │   ├── Question.java
│       │   ├── QuestionDTO.java
│       │   ├── SubmitRequest.java
│       │   └── ExamResult.java
│       └── service/
│           └── QuestionService.java ← 20 MCQ questions
│
└── frontend/                       ← HTML/CSS/JS
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 How to Run

### Step 1 — Run the Backend

**Option A: Using IntelliJ IDEA**
1. Open IntelliJ → `File → Open` → select the `backend/` folder
2. IntelliJ auto-detects Maven and downloads dependencies
3. Open `OnlineExamApplication.java`
4. Click the green ▶ Run button

**Option B: Using Terminal**
```bash
cd OnlineExam/backend
mvn spring-boot:run
```

You should see:
```
Started OnlineExamApplication on port 8080
```

### Step 2 — Run the Frontend

**Option A: VS Code Live Server**
1. Open `frontend/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Browser opens at `http://127.0.0.1:5500`

**Option B: Direct file**
- Just double-click `index.html` in your file explorer
- Note: The browser must allow `localhost` fetch requests

---

## 🌐 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `http://localhost:8080/OnlineExam/questions` | Returns all 20 questions (no answers) |
| POST | `http://localhost:8080/OnlineExam/submit` | Submit answers, returns score + review |

### POST /submit — Request Body
```json
{
  "answers": ["Delhi", "Java", "Not Answered", ...]
}
```

### POST /submit — Response
```json
{
  "score": 15,
  "total": 20,
  "review": [
    { "user": "Delhi", "correct": "Delhi" },
    { "user": "Python", "correct": "Java" }
  ]
}
```

---

## ⚙️ Features

- ✅ 20 MCQ questions served from backend
- ⏱ 10-second countdown timer per question (animated ring)
- ⏭ Auto-advance when timer expires
- ⏩ Skip button available
- 📊 Animated score ring on results screen
- 📋 Full answer review with correct/wrong/skipped status
- 🔁 Restart exam without page refresh
- 🛡 Answers never exposed to the frontend (server-side evaluation)

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| `java: command not found` | Install Java 17 and add to PATH |
| `mvn: command not found` | Install Maven and add `/bin` to PATH |
| CORS error in browser | Already handled via `@CrossOrigin` in controller |
| Backend not starting | Check port 8080 is free: `netstat -ano \| findstr :8080` (Windows) |
| Frontend can't reach API | Make sure backend is running first |
