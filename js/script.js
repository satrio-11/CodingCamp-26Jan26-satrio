// JavaScript to display a welcome message to the user
welcomeMessage();

// Function to display a welcome message to the user
function welcomeMessage() {
  // Prompt the user for their name
  let userResponse = prompt("Welcome to My Company! What is your name?");

  // Handle case where user cancels or enters an empty name
  if (userResponse === null || userResponse.trim() === "") {
    userResponse = "Guest";
  }

  // Display the welcome message
  document.getElementById("welcome-speech").innerText =
    `Hello, ${userResponse}! Welcome to PT Nusa Bangun Sejahtera Company.`;
}

function submitMessage(event) {
  event.preventDefault();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  // reset UI
  [nameError, emailError, messageError].forEach((el) => {
    el.textContent = "";
    el.classList.add("hidden");
  });
  formSuccess.textContent = "";
  formSuccess.classList.add("hidden");

  // helper tampilkan error
  const setError = (el, msg, inputEl) => {
    el.textContent = msg;
    el.classList.remove("hidden");
    inputEl.classList.add("border-red-500");
  };

  // reset border merah dulu
  [nameEl, emailEl, messageEl].forEach((el) =>
    el.classList.remove("border-red-500"),
  );

  let valid = true;

  // 1) Nama wajib
  if (!name) {
    setError(nameError, "Nama wajib diisi.", nameEl);
    valid = false;
  } else if (name.length < 5) {
    setError(nameError, "Nama terlalu pendek. Minimal 5 karakter.", nameEl);
    valid = false;
  }

  // 2) Email wajib + format dasar + harus @gmail.com
  if (!email) {
    setError(emailError, "Email wajib diisi.", emailEl);
    valid = false;
  } else {
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email)) {
      setError(emailError, "Format email tidak valid.", emailEl);
      valid = false;
    } else if (!email.toLowerCase().endsWith("@gmail.com")) {
      setError(
        emailError,
        "Email harus menggunakan domain @gmail.com.",
        emailEl,
      );
      valid = false;
    }
  }

  // 3) Message wajib
  if (!message) {
    setError(messageError, "Pesan tidak boleh kosong.", messageEl);
    valid = false;
  } else if (message.length < 10) {
    setError(
      messageError,
      "Pesan terlalu singkat. Minimal 10 karakter.",
      messageEl,
    );
    valid = false;
  }

  if (!valid) return false;

  // kalau valid: lanjut kirim
  formSuccess.textContent = "Pesan berhasil dikirim. Terima kasih!";
  formSuccess.classList.remove("hidden");

  // reset form
  document.getElementById("contactForm").reset();

  return true;
}
