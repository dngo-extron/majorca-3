import zoomSdk from "./sdk.js";
import m from "mithril";

async function configureApp() {
    try {
        if(zoomSdk === undefined){
            return m("p", "Error: " + "ZoomSdk is undefined");
        }
        const configResponse = await zoomSdk.config({
            popoutSize: {width: 480, height: 360},
            capabilities: ["shareApp"]
          });

          let reponse = JSON.stringify(configResponse);
          let figure = m("p", reponse);
          return figure;
    } catch (error) {
        return m("p", "Error: " + error)
    }



}

async function getCredential(){
    const cred = await zoomSdk.getZoomRoomControllerCredentials();
    let response = JSON.stringify(cred);
    let redM = m("p", response);
    return redM;
}

async function getTime(){
    try {
        const respond = await fetch("https://worldtimeapi.org/api/timezone/America/Los_Angeles");
        const data =  await respond.json();
    
        return m("p", "time: " + data.datetime);
    } catch (error) {
        return m("p", "time: " + error);
    }
}

async function print(){
    let m1 = await configureApp();
    let m2 = await getCredential();
    let m3 = await getTime();

    let root = document.body;
    m.render(root, [m1, m2, m3]);
}

print();
