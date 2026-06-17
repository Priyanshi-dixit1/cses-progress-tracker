chrome.storage.local.get(
  ["cses_stars"],
  ({ cses_stars }) => {

    const stars = cses_stars || {};

    const solved =
      document.querySelectorAll?.length || 0;

    const starred =
      Object.values(stars)
        .filter(Boolean).length;

    document.getElementById("solved")
      .textContent = solved;

    document.getElementById("starred")
      .textContent = starred;
  }
);

document
  .getElementById("reset-btn")
  .addEventListener("click", () => {

    if (confirm("Reset starred problems?")) {

      chrome.storage.local.clear(
        () => window.close()
      );
    }
  });