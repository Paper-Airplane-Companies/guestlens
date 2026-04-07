(function () {
  const STORAGE_KEY = "guestlens_now_events";

  const defaultChallenges = [
    { id: "cheers", title: "Cheers Shot", prompt: "Capture a celebratory cheers moment." },
    { id: "selfie", title: "Group Selfie", prompt: "Get at least 3 people in one frame." },
    { id: "dance", title: "Dance Floor Moment", prompt: "Catch the energy when the music hits." },
    { id: "style", title: "Best Dressed", prompt: "Photograph a standout style moment." },
    { id: "laugh", title: "Laugh Out Loud", prompt: "Snap a candid laugh reaction." },
    { id: "detail", title: "Signature Detail", prompt: "Capture a detail that defines the event." },
    { id: "host", title: "Host Highlight", prompt: "Get a great moment featuring the host." },
    { id: "night", title: "End of Night", prompt: "Capture the vibe as the night peaks." },
  ];

  function readEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function slugify(input) {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function createSlug(eventName) {
    return `${slugify(eventName || "event")}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function initStartPage() {
    const form = document.getElementById("start-now-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const eventName = String(fd.get("event-name") || "").trim();
      const hostName = String(fd.get("host-name") || "").trim();
      const eventType = String(fd.get("event-type") || "").trim();
      const welcomeMessage = String(fd.get("welcome-message") || "").trim();
      const promptPack = String(fd.get("prompt-pack") || "").trim();

      if (!eventName || !hostName || !eventType) return;

      const slug = createSlug(eventName);
      const eventData = {
        slug,
        eventName,
        hostName,
        eventType,
        welcomeMessage,
        promptPack,
        challenges: defaultChallenges,
        completed: [],
        uploadCount: 0,
        unlocked: false,
        createdAt: new Date().toISOString(),
      };

      const events = readEvents();
      events[slug] = eventData;
      writeEvents(events);

      window.location.href = `events/instant-event.html?slug=${encodeURIComponent(slug)}&host=1`;
    });
  }

  function initInstantEventPage() {
    const titleEl = document.getElementById("event-title");
    if (!titleEl) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    const isHostView = params.get("host") === "1";
    const events = readEvents();
    const data = (slug && events[slug]) || {
      slug: "tonight",
      eventName: "Tonight’s Event",
      hostName: "Host",
      eventType: "Celebration",
      welcomeMessage: "",
      challenges: defaultChallenges,
      completed: [],
      uploadCount: 0,
      unlocked: false,
    };

    let selectedId = data.challenges[0].id;

    const challengeList = document.getElementById("challenge-list");
    const progressEl = document.getElementById("challenge-progress");
    const selectedTitle = document.getElementById("selected-title");
    const selectedPrompt = document.getElementById("selected-prompt");
    const unlockSection = document.getElementById("unlock-section");
    const unlockProgress = document.getElementById("unlock-progress");
    const gallerySection = document.getElementById("gallery-section");
    const galleryGrid = document.getElementById("gallery-grid");

    const quickUploadBtn = document.getElementById("quick-upload-btn");
    const quickUploadInput = document.getElementById("quick-upload-input");
    const promptUploadBtn = document.getElementById("prompt-upload-btn");
    const promptUploadInput = document.getElementById("prompt-upload-input");

    const hostShareSection = document.getElementById("host-share-section");
    const hostLinkEl = document.getElementById("host-link");
    const sharePreviewEl = document.getElementById("share-message-preview");

    titleEl.textContent = data.eventName;
    const subtext = document.getElementById("event-subtext");
    if (subtext && data.welcomeMessage) {
      subtext.textContent = data.welcomeMessage;
    }

    if (isHostView && hostShareSection) {
      hostShareSection.classList.remove("hidden");
      const link = `${window.location.origin}${window.location.pathname}?slug=${encodeURIComponent(data.slug)}`;
      const shareMessage = `We’re using GuestLens tonight to capture the party from every angle. Tap here to upload your pics, follow the photo challenge, and help build our shared album: ${link}`;
      hostLinkEl.textContent = link;
      sharePreviewEl.textContent = shareMessage;

      const copyBtn = document.getElementById("copy-link-btn");
      const textBtn = document.getElementById("text-guests-btn");
      copyBtn?.addEventListener("click", async () => {
        await navigator.clipboard.writeText(link);
        copyBtn.textContent = "Copied";
      });
      textBtn?.addEventListener("click", async () => {
        if (navigator.share) {
          await navigator.share({ title: "GuestLens Event", text: shareMessage, url: link });
        } else {
          await navigator.clipboard.writeText(shareMessage);
          textBtn.textContent = "Message Copied";
        }
      });
    }

    function save() {
      if (!data.slug || !events[data.slug]) return;
      events[data.slug] = data;
      writeEvents(events);
    }

    function renderGallery() {
      galleryGrid.innerHTML = "";
      for (let i = 1; i <= 6; i += 1) {
        const card = document.createElement("article");
        card.className = "gallery-card";
        card.innerHTML = `<h3>Moment ${i}</h3><p>Shared by guests</p><a class="btn btn-secondary btn-full" href="#" download>Download</a>`;
        galleryGrid.appendChild(card);
      }
    }

    function renderSelected() {
      const selected = data.challenges.find((item) => item.id === selectedId) || data.challenges[0];
      selectedTitle.textContent = selected.title;
      selectedPrompt.textContent = selected.prompt;
    }

    function renderProgress() {
      const done = data.completed.length;
      const total = data.challenges.length;
      progressEl.textContent = `${done} of ${total} completed`;
      unlockProgress.textContent = String(done);

      if (data.unlocked) {
        unlockSection.classList.add("hidden");
        gallerySection.classList.remove("hidden");
      } else if (data.uploadCount >= 3) {
        unlockSection.classList.remove("hidden");
      }
    }

    function renderChallenges() {
      challengeList.innerHTML = "";
      data.challenges.forEach((item) => {
        const done = data.completed.includes(item.id);
        const card = document.createElement("button");
        card.type = "button";
        card.className = `challenge-item${done ? " completed" : ""}${selectedId === item.id ? " active" : ""}`;
        card.innerHTML = `<span>${item.title}</span><small>${done ? "Completed" : "Tap to complete"}</small>`;
        card.addEventListener("click", () => {
          selectedId = item.id;
          renderSelected();
          renderChallenges();
        });
        challengeList.appendChild(card);
      });
    }

    function handleUpload() {
      const selected = data.challenges.find((item) => item.id === selectedId);
      if (!selected) return;

      if (!data.completed.includes(selected.id)) {
        data.completed.push(selected.id);
      }
      data.uploadCount += 1;
      save();
      renderChallenges();
      renderProgress();
    }

    quickUploadBtn?.addEventListener("click", () => quickUploadInput?.click());
    promptUploadBtn?.addEventListener("click", () => promptUploadInput?.click());
    quickUploadInput?.addEventListener("change", handleUpload);
    promptUploadInput?.addEventListener("change", handleUpload);

    const unlockBtn = document.getElementById("unlock-btn");
    const unlockEmail = document.getElementById("unlock-email");
    unlockBtn?.addEventListener("click", () => {
      if (!String(unlockEmail?.value || "").includes("@")) return;
      data.unlocked = true;
      save();
      renderProgress();
      renderGallery();
    });

    renderSelected();
    renderChallenges();
    renderProgress();
    if (data.unlocked) renderGallery();
  }

  const page = document.body.getAttribute("data-page");
  if (page === "start-now") initStartPage();
  if (page === "instant-event") initInstantEventPage();
})();
