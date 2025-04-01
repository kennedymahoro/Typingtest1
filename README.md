# 📝 Next.js Typing Test

A **typing speed test** built with **Next.js** and **Tailwind CSS**, featuring:  
✅ **Random quotes from real-world people** (via ZenQuotes API)  
✅ **Live WPM (Words Per Minute) & Accuracy tracking**  
✅ **Custom inline cursor that moves with typing**  
✅ **Real-time character highlighting (correct: 🟩 green, incorrect: 🟥 red, incorrect spaces: 🔴 red background)**  
✅ **No visible input field** (seamless typing experience)  
✅ **Ability to fetch a new quote and retry**  

---

## 📂 Project Structure

📦 typing-test ├── 📁 components │ ├── TypingTest.tsx # Main typing test UI & logic ├── 📁 utils │ ├── api.ts # Fetches random quotes ├── 📁 pages │ ├── index.tsx # Main page rendering TypingTest.tsx ├── tailwind.config.js # Tailwind CSS setup ├── next.config.js # Next.js config ├── package.json # Dependencies & scripts └── README.md # Project documentation

🎨 Styling
Dark theme with Tailwind CSS

Fixed word wrapping (words don’t break across lines)

Spacing between characters for readability

