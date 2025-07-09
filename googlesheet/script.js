let clickCount = 0;
const maxClicks = 5;
const clickText = document.getElementById("clickCount");
const whatsappBtn = document.getElementById("whatsappBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const messageBox = document.getElementById("message");

// Prevent multiple submissions
if (localStorage.getItem("submitted") === "true") {
  form.innerHTML = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

// WhatsApp Sharing
whatsappBtn.addEventListener("click", () => {
  if (clickCount < maxClicks) {
    const url = `https://wa.me/?text=${encodeURIComponent("Hey Buddy, Join Tech For Girls Community!")}`;
    window.open(url, "_blank");
    clickCount++;
    if (clickCount >= maxClicks) {
      clickText.innerText = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    } else {
      clickText.innerText = `Click count: ${clickCount}/${maxClicks}`;
    }
  }
});

// Form Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const fileInput = document.getElementById("screenshot").files[0];

  const reader = new FileReader();
  reader.onload = async function () {
    const base64File = reader.result.split(",")[1];

    const data = {
      name: name,
      phone: phone,
      email: email,
      college: college,
      file: base64File,
      filename: fileInput.name,
      mimeType: fileInput.type,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx5idmHPmcwdd_0fqJ4Ppc1_y48ggK4xcf5txIAUTAQvMpcEofVwVhzBrZygS7Ic_VTrw/exec",
        {
          method: "POST",
          body: new URLSearchParams(data),
        }
      );

      if (response.ok) {
        localStorage.setItem("submitted", "true");
        form.innerHTML =
          "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      } else {
        messageBox.innerText = "⚠️ Something went wrong. Please try again.";
      }
    } catch (error) {
      messageBox.innerText =
        "🚫 Failed to connect. Please check your internet or script URL.";
      console.error(error);
    }
  };

  reader.readAsDataURL(fileInput);
});
