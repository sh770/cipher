const ta = document.getElementById("mainText");       // לוקח את שדה הטקסט
const btn = document.getElementById("actionBtn");      // לוקח את כפתור ההצפנה
const clearBtn = document.getElementById("clearBtn");  // לוקח את כפתור הניקוי
const copyBtn = document.getElementById("copyBtn");    // לוקח את כפתור ההעתקה
const pasteBtn = document.getElementById("pasteBtn");  // לוקח את כפתור ההדבקה החדש

function cipherEtbash(text) {                          // פונקציה שמצפינה בשיטת אתבש
  const alefbet = "אבגדהוזחטיכלמנסעפצקרשת";           // האלפבית העברי
  const reversed = alefbet.split("").reverse().join(""); // יוצר את האלפבית ההפוך
  return text
    .split("")                                          // מפצל את הטקסט לאותיות
    .map((c) => {                                       // עובר על כל אות
      const idx = alefbet.indexOf(c);                  // בודק אם האות קיימת באלף־בית
      return idx !== -1 ? reversed[idx] : c;           // אם כן מחליף, אם לא משאיר כמו שהוא
    })
    .join("");                                         // מחזיר מחרוזת חדשה
}

btn.addEventListener("click", () => {                   // מאזין לכפתור הצפנה
  const text = ta.value.trim();                         // לוקח טקסט מהתיבה
  if (text) ta.value = cipherEtbash(text);              // מצפין אם לא ריק
});

clearBtn.addEventListener("click", () => {              // מאזין לכפתור ניקוי
  ta.value = "";                                        // מנקה את הטקסט
  ta.focus();                                           // מחזיר פוקוס לשדה
});

copyBtn.addEventListener("click", async () => {         // מאזין לכפתור העתקה
  if (ta.value.trim()) {                                // אם יש טקסט
    try {
      await navigator.clipboard.writeText(ta.value);    // מעתיק את הטקסט *ללוח*
      copyBtn.textContent = "הועתק!";                   // משנה טקסט זמנית
      setTimeout(() => {
        copyBtn.textContent = "העתק";                  // מחזיר טקסט לכפתור
      }, 1200);
    } catch (e) {
      alert("לא ניתן להעתיק את הטקסט");               // שגיאה אם ההעתקה נחסמת
    }
  }
});

pasteBtn.addEventListener("click", async () => {        // מאזין לכפתור הדבקה החדש
  try {
    const text = await navigator.clipboard.readText();  // קורא טקסט מהלוח
    ta.value = text;                                    // מדביק לתוך התיבה
    ta.focus();                                         // נותן פוקוס לתיבה
  } catch (e) {
    alert("לא ניתן להדביק טקסט מהלוח");               // שגיאה אם חסום בדפדפן
  }
});