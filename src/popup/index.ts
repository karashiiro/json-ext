import { storage } from "../storage";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
  const target = document.getElementById("app");

  if (target) {
    storage.get().then(({ count }) => {
      console.log(count);
    });
  }
}

document.addEventListener("DOMContentLoaded", render);
