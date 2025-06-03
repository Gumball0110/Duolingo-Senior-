document.addEventListener("DOMContentLoaded", function () {
  const optionBoxes = document.querySelectorAll(".option");
  const checkButton = document.getElementById("check-btn");
  const bottomFeedback = document.getElementById("bottom-feedback");
  const bottomArea = document.querySelector(".bottom-area");
  const correctAnswer = "apple";

  let selectedOption = null;

  optionBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      optionBoxes.forEach((b) => b.classList.remove("selected"));
      box.classList.add("selected");
      selectedOption = box.getAttribute("data-answer");

      checkButton.classList.remove("disabled");
      checkButton.classList.add("enabled");
      checkButton.removeAttribute("disabled");
    });
  });

  checkButton.addEventListener("click", function () {
    if (!selectedOption || checkButton.classList.contains("disabled")) return;

    optionBoxes.forEach((box) => {
      box.classList.remove("correct", "incorrect");
    });

    let resultHTML = "";
    bottomArea.style.display = "none"; // 隱藏 SKIP / CHECK

    if (selectedOption === correctAnswer) {
      const correctBox = document.querySelector(`[data-answer="${correctAnswer}"]`);
      correctBox.classList.add("correct");

      resultHTML = `
        <div class="result-panel correct full-width">
          <div class="feedback-content">
            <img src="correct-icon.png" class="icon" />
            <span class="result-text">Nice job!</span>
            <button class="btn-continue green">CONTINUE</button>
          </div>
        </div>
      `;
    } else {
      const wrongBox = document.querySelector(`[data-answer="${selectedOption}"]`);
      wrongBox.classList.add("incorrect");

      resultHTML = `
        <div class="result-panel incorrect full-width">
          <div class="feedback-content">
            <img src="wrong-icon.png" class="icon" />
            <span class="result-text">Correct solution: <strong>${correctAnswer}</strong></span>
            <button class="btn-continue red">CONTINUE</button>
          </div>
        </div>
      `;
    }

    bottomFeedback.innerHTML = resultHTML;
    document.querySelector(".btn-continue").addEventListener("click", resetQuiz);
    document.querySelector(".bottom-area").style.display = "none";
  });

  function resetQuiz() {
    optionBoxes.forEach((box) => {
      box.classList.remove("selected", "correct", "incorrect");
    });

    bottomFeedback.innerHTML = "";
    selectedOption = null;
    bottomArea.style.display = "flex"; // 還原按鈕區塊
    checkButton.classList.remove("enabled");
    checkButton.classList.add("disabled");
    checkButton.setAttribute("disabled", "true");
  }
});

