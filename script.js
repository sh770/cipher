const ta = document.getElementById("mainText");
const btn = document.getElementById("actionBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

function cipherEtbash(text) {
  const alefbet = "אבגדהוזחטיכלמנסעפצקרשת";
  const reversed = alefbet.split("").reverse().join("");
  return text
    .split("")
    .map((c) => {
      const idx = alefbet.indexOf(c);
      return idx !== -1 ? reversed[idx] : c;
    })
    .join("");
}

btn.addEventListener("click", () => {
  const text = ta.value.trim();
  if (text) ta.value = cipherEtbash(text);
});

clearBtn.addEventListener("click", () => {
  ta.value = "";
  ta.focus();
});

copyBtn.addEventListener("click", async () => {
  if (ta.value.trim()) {
    try {
      await navigator.clipboard.writeText(ta.value);
      copyBtn.textContent = "הועתק!";
      setTimeout(() => {
        copyBtn.textContent = "העתק";
      }, 1200);
    } catch (e) {
      alert("לא ניתן להעתיק את הטקסט");
    }
  }
});
