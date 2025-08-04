// Create a context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quicktionaryLookup",
    title: "Look up \"%s\" in Quicktionary",
    contexts: ["selection"]
  });
});

// Listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "quicktionaryLookup" && info.selectionText) {
    chrome.storage.local.set({ 'selectedWord': info.selectionText.trim() });
  }
});