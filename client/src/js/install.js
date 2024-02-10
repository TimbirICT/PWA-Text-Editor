const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Save the event to trigger it later
  deferredPrompt = event;

  // Update UI to notify the user that the app can be installed
  butInstall.style.display = 'block';
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Check the result of the prompt
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;
  }

  // Hide the install button
  butInstall.style.display = 'none';
});

// Event handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});
