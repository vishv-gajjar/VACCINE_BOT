let etplus=true;
let fwd=true;
let sst=1;
let vacc=[true, true, true];
document.getElementById('start-btn').addEventListener("click", async () => {
    fillFormData();
    chrome.storage.local.clear();
    chrome.storage.local.set({etplus, fwd, sst, vacc});
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['mainscript.js'],
    });
  });

  document.getElementById('stop-btn').addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: stopTimer
    });
  });

  function stopTimer() {
    console.log("stopping");
    clearInterval(timer);
    sound.pause();
  }

  function fillFormData(){
    etplus=document.getElementById('flexSwitchCheckChecked').checked;

    fwd=document.getElementById('flexSwitchCheckDefault').checked;

    if(document.querySelector('[value="1"]').checked) sst=0;
    if(document.querySelector('[value="2"]').checked) sst=1;
    if(document.querySelector('[value="3"]').checked) sst=2;
    if(document.querySelector('[value="4"]').checked) sst=3;

    if( document.getElementById('covaxin').checked ) 
      vacc[0]=true;
    else
      vacc[0]=false

    if( document.getElementById('covishield').checked ) 
      vacc[1]=true;
    else
      vacc[1]=false
    
    if( document.getElementById('sputnik').checked ) 
      vacc[2]=true;
    else
      vacc[2]=false
  }