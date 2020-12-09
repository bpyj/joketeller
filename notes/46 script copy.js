const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS Javascript SDK
const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        // new Audio(t.responseText).play();
        audioElement.src = t.responseText;
        audioElement.play();
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

// 002 -- we are going to make this up at the top right now. scroll up. to just below our sdk. and we will comment out a title here. Disable / Enable button.

//and its going to be a function toggleButton(). curly brackets. we are going to use the 'disable' attribute. which is available on button elements. so button.disable. so this can equal true or false. so a quick way to toggle between the 2, is just to let button.disable be equal to the opposite of button.disabled. so we can accomplish that with an exclamation mark. !button.disabled. so button.disabled is true on the left side, it will be false. and vice versa if its false on the left side, it will be the opposite which is true.

//but lets think about how we actually want this to work when the page loads. so when the page first loads, we want the button not to be disabled. so thats fine because we are not calling this function toggleButton() yet. but on our event listener, we are calling this function here. so its being called once. it will actually launch for the first time. after the audio has ended. so it will actually do the opposite. it will disable the button once the joke is done. we want to disable while the joke is being told and reenable when the joke is done.

//so that means we are going to call it again, when we click on the button. so when we click on the button, we are launching our get jokes function. so within this, we need to call our toggle button function to disable it at the right time. so at the bottom of our try statement, we can also comment out a title for this function here. //Text to speech. and below that, we will comment out another title. //and this is actually going to be Disable The Button. and then we will call our function with the brackets here. and then a semicolon. lets save that and try it out.

//ok so lets press button. so you can see that the button was disabled while the button was being told. and as soon as it was done. it was enable again, allowing us to press it again. awesome. so i think everything is working as exactly as we wanted to in terms of functionality. but theres one final thing i would like to do. and that is to hide our audio element. because we don't actually need to see it. we can just hear the jokes. so this would be pretty easy to do.

//similar to how we had a disable attribute for our button. all html elements have a hidden attribute. and we can actually trigger this, within our html. because its something that we want to be hidden the entire time. so as the page loads, we can just type hidden here. and normally, in javascript for a loader, we can toggle this on and off, by making it true and false within our javascript. but for our purposes, we want it to be hidden permanently. so lets save that, jump back and check it out. so you can see that we no longer have our audio element. lets test it out and see if it works.

//Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "3d5ce7cfb8d646b8a9a97344c92f31b0",
    src: "let me tell you a JOKE.... " + joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-Speech
    tellMe(joke);

    //Disable Button
    toggleButton();
  } catch (error) {
    //Catch Errors
    console.log("Whoops", error);
  }
}

//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

//001 lets start with the task of getting our jokes function to run when we click our button. so lets jump back to the code. we can accomplish that by adding an event listener to our button element. so it is considered good practise to always call the function after its already been declared. thats why we are going to create our event listeners at the bottom here.

//we can get started by removing our getJokes() function here, that we were calling when the page loads. and we will comment out a title for our event listeners. and then we are going to target our button constant. dot. add event listener. and then in brackets. we pass in 2 parameters. the first one is the type of event. so in this case its a click. and then comman. and the second parameter is going to be the name of the function we want to call. so in this case its going to be the getJokes() function. save it, check it out.

//so you can see that the joke does not play by default. lets see what happens when we click our button. ok awesome. we are hearing a joke. lets say i am really excited as a user. and i want to click the button again before its done. so you can see the problem here is we want to not be able to press the button again until our joke is done being told. lets think about a solution to this. so you may seen on other websites that a button can be disabled.

//on our rapidAPI website, the button was disabled until we entered our API key. so we want to do a similar thing here. we want to disable the button as the audio is playing. and when it ends, we want to enable the button again. so there are a few possible ways to do this. but i think the best way would be to make it dynamic. and the way we do that is we want to disable the button, as the audio was playing. and then enable it again when the audio is done playing.so you can see now why it is so important, that we have access to our audio element.

//and if you dont see why its so important. we will explain a little bit more about the audio element. so you can have a better understanding. so this is another amazing reference by W3 schools. and you see that its talking about the audio and video elements, because they are more or less identical in terms of how they are made up. and if we go down, we can see that we have a certain amount of methods we can run on these elements. so you might recognize the play method, that we added to our sdk. well, its already there. but, we readded it. so thats whats actually playing the actual joke right now.

//if we go down, we can see there are some different properties that we can add to the actual audio element. when we made it, we added controls. that allows us to have a 'play pause' button. and, when we go down even further, we can see that we have some different events. so we can see here that we have a 'ended' event. and so this will fire the event whenever the current playlist is ended. in this case, we just have a single audio element. so it will fire this 'ended' event when the joke is done being told.

//and then from there, we can launch a function to disable or enable the button. ok so lets jump back into the code and we will figure that out. so we are going to need to add another event listener, this time its going to be on our audio element. and this time, instead of a click event, we are going to use the 'ended' event. and we are going to call a function that is going to be called toggleButton(). so we are going to need to make that function. thats why its not yellow yet. ---002
