chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    shows: [],
  });
  chrome.contextMenus.create({
    title: 'Search for TV shows',
    id: 'contextMenu1',
    contexts: ['page', 'selection'],
  });
  chrome.contextMenus.create({
    title: 'Read This Text',
    id: 'contextMenu2',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === 'contextMenu1') {
      fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (event.menuItemId === 'contextMenu2') {
      chrome.tts.speak(event.selectionText);
    }
  });
});
