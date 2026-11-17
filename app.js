const levelSection = document.getElementById("level-select");
const app = document.getElementById("app");

// Seviye butonlarına tıklanınca o seviyeyi yükle
document.querySelectorAll("[data-level]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    loadLevel(btn.dataset.level);
  });
});

// Kelime dosyasını internetten (GitHub'dan) çeker
async function loadLevel(level) {
  try {
    const response = await fetch("data/" + level + ".json");
    const words = await response.json();
    showWordList(level, words);
  } catch (error) {
    alert("Bu seviyenin kelimeleri henüz hazır değil.");
  }
}

// Kelimeyi sesli okur
function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// Kelime listesini ekrana çizer
function showWordList(level, words) {
  levelSection.hidden = true;

  const box = document.createElement("section");
  box.id = "word-list";

  const back = document.createElement("button");
  back.textContent = "← Back";
  back.addEventListener("click", function () {
    box.remove();
    levelSection.hidden = false;
  });
  box.appendChild(back);

  const title = document.createElement("h2");
  title.textContent = level.toUpperCase() + " · " + words.length + " words";
  box.appendChild(title);

  words.forEach(function (item) {
    const row = document.createElement("div");
    row.className = "word-row";

    const english = document.createElement("span");
    english.className = "word-en";
    english.textContent = item.word;

    const turkish = document.createElement("span");
    turkish.className = "word-tr";
    turkish.textContent = item.tr;

    const listen = document.createElement("button");
    listen.textContent = "Listen";
    listen.addEventListener("click", function () {
      speak(item.word);
    });

    row.appendChild(english);
    row.appendChild(turkish);
    row.appendChild(listen);
    box.appendChild(row);
  });

  app.appendChild(box);
}
