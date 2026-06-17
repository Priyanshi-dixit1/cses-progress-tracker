let currentMode = "all";
if (window.location.pathname === "/problemset/") {
  init();
}

function init() {
  document.querySelectorAll(".cses-progress-card").forEach((e) => e.remove());
  document
    .querySelectorAll(".cses-section-progress")
    .forEach((e) => e.remove());
  document.querySelectorAll(".cses-star").forEach((e) => e.remove());
  document.querySelectorAll(".cses-filter-bar").forEach((e) => e.remove());

  chrome.storage.local.get(["cses_stars"], ({ cses_stars }) => {
    const stars = cses_stars || {};

    addOverallProgress();
    addFilterBar();
    addSectionProgress();
    addStars(stars);
  });
}

function addFilterBar() {
  const container = document.createElement("div");
  container.className = "cses-filter-bar";
  container.innerHTML = `
    <button id="cses-all-btn" class="cses-filter-btn active">
      All Problems
    </button>
    <button id="cses-starred-btn" class="cses-filter-btn">
      Starred
    </button>
  `;
  const generalHeading = [...document.querySelectorAll("h2")].find((h) =>
    h.textContent.includes("General"),
  );
  if (generalHeading) {
    const generalTaskList = generalHeading.nextElementSibling;

    generalTaskList.parentNode.insertBefore(
      container,
      generalTaskList.nextElementSibling,
    );
  }
  document
    .getElementById("cses-all-btn")
    ?.addEventListener("click", showAllProblems);
  document
    .getElementById("cses-starred-btn")
    ?.addEventListener("click", showStarredProblems);
}

function getProblemRows() {
  return [...document.querySelectorAll(".task-list li")].filter((li) =>
    li.querySelector(".task-score"),
  );
}

function addOverallProgress() {
  const problems = getProblemRows();
  const total = problems.length;
  const solved = problems.filter((li) =>
    li.querySelector(".task-score.icon.full"),
  ).length;
  const pct = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
  const card = document.createElement("div");
  card.className = "cses-progress-card";
  card.innerHTML = `
    <div class="cses-progress-header">
      <div>
        <div class="cses-progress-title">
          Overall Progress
        </div>
        <div class="cses-progress-subtitle">
          ${solved} / ${total} Solved
        </div>
      </div>
      <div class="cses-progress-percent">
        ${pct}%
      </div>
    </div>
    <div class="cses-progress-bar">
      <div
        class="cses-progress-fill"
        style="width:${pct}%">
      </div>
    </div>
  `;
  const heading = document.querySelector("h1");
  if (heading) {
    heading.insertAdjacentElement("afterend", card);
  }
}

function showStarredProblems() {
  currentMode = "starred";
  document.querySelectorAll(".task-list li").forEach((li) => {
    const star = li.querySelector(".cses-star");

    li.style.display = star?.classList.contains("cses-star-on") ? "" : "none";
  });
document.querySelectorAll(".task-list")
  .forEach(list => {
    list.style.display = "none";
  });
document.querySelectorAll(".cses-section-title")
  .forEach(title => {
    title.textContent =
      title.textContent.replace(/^▼/, "▶");
  });
  hideEmptySections();
  document.querySelectorAll(".cses-section-progress").forEach((bar) => {
    bar.style.display = "none";
  });
  document.getElementById("cses-starred-btn")?.classList.add("active");
  document.getElementById("cses-all-btn")?.classList.remove("active");
}

function showAllProblems() {
  currentMode = "all";
  document.querySelectorAll(".task-list li")
    .forEach(li => {
      li.style.display = "";
    });
  document.querySelectorAll("h2")
    .forEach(h => {
      h.style.display = "";
    });
  document.querySelectorAll(".task-list")
    .forEach(list => {
      list.style.display = "none";
    });
  document.querySelectorAll(".cses-section-progress")
    .forEach(bar => {
      bar.style.display = "none";
    });
  document.querySelectorAll(".cses-section-title")
    .forEach(title => {
      title.textContent =
        title.textContent.replace(/^▼/, "▶");
    });
  document
    .getElementById("cses-all-btn")
    ?.classList.add("active");
  document
    .getElementById("cses-starred-btn")
    ?.classList.remove("active");
}

function hideEmptySections() {
  document.querySelectorAll(".task-list")
    .forEach(section => {
      const visibleProblems =
        [...section.querySelectorAll("li")]
          .filter(li =>
            li.style.display !== "none"
          );
      const heading =
        section.previousElementSibling;
      const progress =
        heading?.nextElementSibling;
      if (!heading) return;
      if (visibleProblems.length === 0) {
        heading.style.display = "none";
        section.style.display = "none";
        if (
          progress?.classList.contains(
            "cses-section-progress"
          )
        ) {
          progress.style.display = "none";
        }
      } else {
        heading.style.display = "";
        section.style.display = "";
      }
    });
}

function addSectionProgress() {
  document.querySelectorAll(".task-list").forEach((section) => {
    const heading = section.previousElementSibling;
    if (!heading) return;
    const tasks = [...section.querySelectorAll("li")].filter((li) =>
      li.querySelector(".task-score"),
    );
    if (!tasks.length) return;
    const total = tasks.length;
    const solved = tasks.filter((li) =>
      li.querySelector(".task-score.icon.full"),
    ).length;
    const pct = ((solved / total) * 100).toFixed(0);
    const wrapper = document.createElement("div");
    wrapper.className = "cses-section-progress";
    wrapper.innerHTML = `
        <div class="cses-section-meta">
          <span>${solved} / ${total}</span>
          <span>${pct}%</span>
        </div>

        <div class="cses-section-bar">
          <div
            class="cses-section-fill"
            style="width:${pct}%">
          </div>
        </div>
      `;
    heading.insertAdjacentElement("afterend", wrapper);
    const originalTitle = heading.textContent.trim();
    section.style.display = "none";
    wrapper.style.display = "none";
    heading.innerHTML = `
        <span class="cses-section-title">
          ▶ ${originalTitle}
        </span>
        <span class="cses-section-circle">
          ${pct}%
        </span>
      `;
    heading.style.display = "flex";
    heading.style.alignItems = "center";
    heading.style.justifyContent = "space-between";
    heading.style.cursor = "pointer";
    heading.addEventListener("click", () => {
      const hidden = section.style.display === "none";
      section.style.display = hidden ? "" : "none";
      const starredMode = currentMode === "starred";
      if (!starredMode) {
        wrapper.style.display = hidden ? "" : "none";
      } else {
        wrapper.style.display = "none";
      }
      heading.querySelector(".cses-section-title").textContent =
        `${hidden ? "▼" : "▶"} ${originalTitle}`;
    });
  });
}

function addStars(stars) {
  const tasks = getProblemRows();
  tasks.forEach((li) => {
    const link = li.querySelector("a");
    if (!link) return;
    const match = link.href.match(/\/task\/(\d+)/);
    if (!match) return;
    const id = match[1];
    const star = document.createElement("span");
    star.className = `cses-star ${stars[id] ? "cses-star-on" : ""}`;
    star.textContent = "★";
    star.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      stars[id] = !stars[id];
      chrome.storage.local.set({
        cses_stars: stars,
      });
      star.className = `cses-star ${stars[id] ? "cses-star-on" : ""}`;
      if (
        document
          .getElementById("cses-starred-btn")
          ?.classList.contains("active")
      ) {
        showStarredProblems();
      }
    });
    li.appendChild(star);
  });
}
