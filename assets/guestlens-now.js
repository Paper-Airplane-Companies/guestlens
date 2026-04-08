import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "PASTE_YOUR_URL";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ------------------
// GET URL PARAM
// ------------------
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ------------------
// LOAD EVENT
// ------------------
async function loadEvent() {
  const slug = getParam("slug");

  if (!slug) {
    alert("Missing event link.");
    return;
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Supabase error:", error);
    alert("Event not found.");
    return;
  }

  populateEvent(data);
}

// ------------------
// POPULATE PAGE
// ------------------
function populateEvent(event) {
  const titleEl = document.getElementById("event-title");
  const linkEl = document.getElementById("host-link");
  const previewEl = document.getElementById("share-message-preview");
  const hostSection = document.getElementById("host-share-section");

  // Set title
  if (titleEl) titleEl.textContent = event.event_name;

  // Build share link (THIS is the fix for wrong link)
  const shareLink = `${window.location.origin}/guestlens/events/instant-event.html?slug=${event.slug}`;

  if (linkEl) linkEl.textContent = shareLink;

  // Show host UI
  const isHost = getParam("host") === "1";
  if (isHost && hostSection) {
    hostSection.classList.remove("hidden");
  }

  // SMS preview
  const message = `We’re using GuestLens to capture tonight 📸

Upload your pics + follow the challenge:
${shareLink}`;

  if (previewEl) previewEl.textContent = message;

  setupButtons(shareLink, message);
}

// ------------------
// BUTTONS
// ------------------
function setupButtons(link, message) {
  const copyBtn = document.getElementById("copy-link-btn");
  const textBtn = document.getElementById("text-guests-btn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(link);
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy Link";
      }, 2000);
    });
  }

  if (textBtn) {
    textBtn.addEventListener("click", () => {
      window.location.href = `sms:?body=${encodeURIComponent(message)}`;
    });
  }
}

// ------------------
// INIT
// ------------------
loadEvent();
