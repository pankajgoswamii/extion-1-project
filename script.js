// Toast notification helper
function showToast(message, type = "info") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `show ${type}`;
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2200);
}

// Spinner helper
function showSpinner(btn) {
  btn.disabled = true;
  btn.dataset.original = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Posting...';
}
function hideSpinner(btn) {
  btn.disabled = false;
  btn.innerHTML = btn.dataset.original;
}

// Update profile privacy display with confirmation
const profilePrivacy = document.getElementById("profilePrivacy");
const profileStatus = document.getElementById("profileStatus");

profilePrivacy.addEventListener("change", () => {
  const value = profilePrivacy.options[profilePrivacy.selectedIndex].text;
  profileStatus.textContent = value;
  profileStatus.classList.add("highlight");
  setTimeout(() => profileStatus.classList.remove("highlight"), 700);
  showToast(`Profile privacy set to ${value}`, "success");
});

// Handle post creation
function postMessage() {
  const postContentEl = document.getElementById("postContent");
  const postContent = postContentEl.value.trim();
  const privacy = document.getElementById("postPrivacy").value;
  const feed = document.getElementById("posts");
  const postBtn = document.querySelector("button[onclick='postMessage()']");

  if (!postContent) {
    showToast("Post content cannot be empty!", "error");
    postContentEl.focus();
    return;
  }

  showSpinner(postBtn);
  setTimeout(() => {
    const postDiv = document.createElement("div");
    postDiv.className = "post animate-in";
    postDiv.innerHTML = `<strong>${privacy.toUpperCase()}</strong>: ${postContent}`;
    feed.prepend(postDiv); // newest post on top

    // Remove animation class after animation
    setTimeout(() => postDiv.classList.remove("animate-in"), 800);

    // Clear the input field
    postContentEl.value = "";
    hideSpinner(postBtn);
    showToast("Post created!", "success");
  }, 900); // Simulate loading
}