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
    tellMe(joke);
  } catch (error) {
    //Catch Errors
    console.log("Whoops", error);
  }
}

getJokes();

//001 so we have covered quite a bit in the projet so far. i thought it was a good opportunity to take a step back and review what was done so far. so ive created a nice diagram here, i will share it in the course. and you can see on the left side it is showing our joke functionality, and on the right side its showing our text to speech functionality. you can see currently there are not connected. so thats the goal of this video. but first, lets just review each of them seperately.

//so i will zoom in "Voice RSS" here. and we will start with our text to speech. so in our test function, which i didnt include here, because we are going to get rid of it, we are calling the speech function. and we are passing in the parameters of our API, including our key, and most importantly, our text. so currently, it is just "hello world". we are passing in through the minified javascript, which is the "voice RSS sdk".

//and this is connecting to their server. and we are getting a response from their server in the form of audio data. and we actually modified the sdk, to pass this audio data, into our audioElement as its source 'src'. and then we are triggering the play method on that audio element. and we are able to hear something. simple enough i guess.

//lets look at the joke functionality. we can see that we are starting out with our asynchronous getJokes() function. this is using the fetch method, to pass in the apiUrl, which has our query string, the types of jokes, and everything that we want. and we are passing that to the joke API server. and then its giving us a response, and we are turning that response into the json. because we only want the body of of the response. and we are passing that into a 'data' constant. and then from there, we are getting the setup and delivery for 2 part jokes. and just 'joke' for a one part joke.

//and in our functionality, we are creating our own 'joke' variable. that is being populated from the two part or one part jokes that's using the if statement that we had in the previous video. and in turn, eventually we are outputing our joke variable, with the string of the joke, which we got from our API. so thats what we have so far, now we need to figure out, how we can connect the two. so, ive actually made a more complete version of this diagram. so you can see that essentially what we are going to do is, we are going to add another function, called tellMe(), to take the parameter of 'joke', and we are going to need to call that inside the getJoke() function. so that we can pass our joke variable here. and from there, we are going to call our speech() function inside our tellMe() function.

//we are going to be passing in the joke as the source. ok, we have a pretty clear path forward, so lets jump back into the code, and see what we can do. ok, we are going to start by making a function above our getJokes() function. we will start by commenting out a title, to explain the functionality. we want to be passing our Joke to our Voice RSS API eventually, that is the end result. and we are going to make our function tellMe() that we just explained, and we are going to pass in our 'joke' as a parameter.

//and inside of this we just want to console log with a message, 'tell me:', joke. just to make sure we are getting our joke within this next function from our first function. so we can actually delete this console log here 'console.log(joke);'. and instead we are going to call our tellMe() function. and we are going to pass in our 'joke'. ok lets save that and check it out.

//ok, we can see that is working. we have our 'tell me:' here, and we have our joke. awesome. so we have successfully passed that from one function to another. the next step would be to put back together our speech function, so we are actually passing our joke, to the text to speech api.

//so lets start by going back to the top here, and we are going to uncomment out our speech function here, and we are going to cut it, delete the rest of this, and we are going to add this to our tellMe() function. so we are going to paste it in there. of course, make sure you have your API key in here. instead of passing in 'hello world', this time we are going to pass our joke. ok lets save that and check it out.

//ok we can see that we must have made a little mistake here. because it's just saying the word 'joke'. i think i know where we went wrong. you can see in our console log, our joke is blue. but in our src, its orange. so we are passing it as a string, but we are meaning to pass in the joke variable. so we are going to remove the quotation marks here. and we can remove our console for now. lets save that and try again. so it works. we have successfully called our joke api, and passed it through our text to speech, and it returned the audio in our element here. that is absolutely perfect.

//so the biggest challenge of this project has been overcomed. theres a few little things to do from here. we need to get our button working to get our jokes. and i think we can probably hide our audio element here. and just hear the jokes. but, lets get to that in the next video.
