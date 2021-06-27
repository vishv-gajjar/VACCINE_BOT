var timer;
var sound;
var otpExpireSound;

chrome.storage.local.get(null, beginScript);
function beginScript(datas) {
    sound = new Audio("https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/alarm-clock-buzzer-beeps_MyERv24__NWM.mp3");
    otpExpireSound=new Audio('https://mp3.fastupload.co/dl.php?file=YUhSMGNITTZMeTl0Y0RNdVptRnpkSFZ3Ykc5aFpDNWpieTlrWVhSaEx6RTJNakV5TmpZM09USXZiM1J3Ulhod0xtMXdNdz09');
    let slots = document.querySelectorAll(".vaccine-box a").length;
    timer = setInterval(checkfree, 2000);
    let target = document.querySelector(".pin-search-btn");

    function checkfree() {
        if(document.querySelectorAll('ion-button.login-btn').length>0){
            otpExpireSound.play();
            clearInterval(timer);
        }
        target.click();
        console.log("<----------->");
        setTimeout(() => {
            A: for (let i = 0; i < slots; i++) {
                let freeSlot = document.querySelectorAll(".vaccine-box a")[i];
                if (condition(i)) {
                    console.log(freeSlot.innerText);
                    sound.play();
                    clearInterval(timer);
                    if(datas.fwd){
                        freeSlot.click();
                        setTimeout(() => document.querySelectorAll('ion-button')[datas.sst].click(), 100);
                    }
                    break A;
                }
            }
        }, 1000)
    }

    function condition(i){
        let content=document.querySelectorAll('.slots-box')[i].innerText.split('\n');
        if(content.length==3 && !content[0].includes("Booked") && checkfor18(datas.etplus, content[2]) && checkVaccine(content[1]) )
            return true;
        else
            return false;
    }

    function checkfor18(state, check) {
        if(state==false)
            return true;
        else if(check=="Age 18+")
            return true;
        else
            return false;
    }

    function checkVaccine(V){
        if(datas.vacc[0]==true && V.toLowerCase().includes("covaxin"))    
            return true;
        else if(datas.vacc[1]==true && V.toLowerCase().includes("covishield"))    
            return true;
        else if(datas.vacc[2]==true && V.toLowerCase().includes("sputnik"))    
            return true;
        else    
            return false;
    }

}