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

function test() {
  VoiceRSS.speech({
    key: "3d5ce7cfb8d646b8a9a97344c92f31b0",
    src: "Hello, world",
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

test();

//001 lets start by thinking what we want our user experience to be. so we want the user to be able to press this button, and it will tell him a random joke. so how do we do this. lets start with the talking part. we are going to need to feed text, that we get from our joke API, and we want audio in return. so we can try to search for a text to speech API. and in a future video, we will search for a joke API as well. but for now, we will start where most developers would, and that is google.

//so lets just type in text-to-speech api. and see what we come up with. we have one from google. one from microsoft. but i think they are bit too complex for our purposes. and down here you can see we have 'the 11 best text to speech apis'. so this is from the rapidAPI website. lets click on that, it will give us a variety of options. this might be a good thing to use in the future as well, for other apis you might need to look for. so its asking you to sign up. you dont have to. i will sign in with github usually. but for now, i will just click 'x' to avoid signing up. so we can see we have more text to speech apis here. each has its own card and some numbers. so average success rate. average latency. and average popularity. ok, so i think that pretty important. we can see that this is a 9.5. this is a 9.7. of a translator though. so its not quite what we need. this one here is free it says. it says it converts text content to audio content. ok, perfect. lets click on that and check it out.

//i will provide links for anything that we come across in the video. so that you can check it out on your own. and you can see here that we have the option to test the end point, but this button is greyed out. so it looks like we are going to need to get a api key from this website 'www.voicerss.org...aspx'. and if we scroll down, we see yeah, we need to put the key here. and it is required. ok. so lets click on that website. alright we have the registration form here, and we are going to fill it out. its not a ton of information, its totally free, we dont have to worry about any kind of payment information. fill it up. scroll down. register. and you can see instantly, we have our api key here. i dont mind showing this, because im not planning to use this key for anything. i am not even going to activate it. but lets just copy it. you can see that my account is inactive.

//and if we go back to our rapidAPI, we are going to scroll down. we can paste in our key here. and now, we should be able to test the end point. so lets click that. ok, actually it seems we must sign up. in order to test our end point. ok so im going to sign in with github. ok so im automatically signed in here. and now we are going to try to test the endpoint. and you can see that we have a 200 success. meaning we were able to contact the API.

//but the body just returns an error, saying the account is inactive. ok, so what that means for you, is that you will need to check your email, and they will have some sort of link to activate. so go ahead, go into your email, try to find that, click on the link, and once thats done, and you refresh this page, it will say active. once you are at that point, we are going to go back to our rapidAPI page. aand we are going to press test endpoint again. ok, so this time we can see the body returned a what looks like an audio element. when we hover over, we can see that the audio has been sent in a form of a really long string. lets hit play. "hello world". ok, awesome. so we can see that its working. alright, so lets jump back to the voice rss website.

//and lets check out the documentation. so reading documentation is a big part of being a developer. so let do some of that now. so you can see that it create a high quality audio stream. so we know that already. we got our audio returned in that last test there. and we can scroll down. it is a 'get' or a 'post' request. this is the url format. so we can use 'https:://api.voicerss.org/?<parameters>'. so we are going to use this one. the question mark ? is the query string. and, we are going to be passing in different parameters. so lets scroll down, and see. so we are also going to pass in our API key. this is an example here. our language is englist 'en'. and our source is 'hello world'.

//so, we can see more of our parameters here, we can see that our API key is mandatory. and the src, 'src' is mandatory as well. this is the text that is going to be converted to speech. so thats our 'hello world'. and the other mandatory thing is our language, which is english. so we are not going to worry about that too much. we are just going to leave that as it is you can see if we scroll down, we have some other options too. including the speed, the type of audio code, the audio format, and if we scroll down, it goes into detail about the language. the audio codecs. the audio format. and at the very bottom, we can see there is a list of errors here. so you might remember we got this error 'this account is inactive!'.  we can see that there is a 'request count limitation'.

//for reference, i do already know. that it is 350 requests per day on the free plan. that should be enough for us. so lets scroll back over here, there is a side menu. lets see what else is in it. so you can see that we have something here called the SDK. and if we scroll dowm, there is one for javascript. so SDK stands for software development kit. what that means in this context, is that there is minified javascript file, that will handle the core functionality. so that should definitely make our lives easier. we can click the download button, and that will return us a zip file. and we can scroll down to have a look at how we can actually implement this sdk here.

//so you can see that we have a speech method 'VoiceRSS.speech()' here. and inside of it, we are passing in our parameters. so our API key. you are going to have to put yours in here. and we are also passing the source, which is the text that we are converting to speech. so the standard here is "hello world". so let's start by copying this 'VoiceRSS.speech()'. and we are going to jump back into our code.

//and we are going to create a function. called 'test'(). and we are going to paste this inside. and below that, we are also going to call our test function. make sure you are including your API key here. and then we are going to save it. next, i am going to demonstrate, how and why i modified this SDK, which i have included in your template. you dont need to code along with this, but i will tell you when its time to start working on the project again.

//ok, so you can see we have 2 versions of our SDK. this is the minified one up here. i am going to use word wrap to show the entire minified code. and you can see its pretty hard to read. so we are going to comment out this for now. and below that. you can see that we have another version. that is a lot easier to read. so this is the original file that i've unminified to show actually whats going on inside of it.

//so we can see here that we've started out with our speech function. this is going to call a validate function. and a request function. it looks like the validate function is mostly in charge of throwing errors. and if we go down to our request function, we can see that this starts by buildng the request 'a=this.buildRequest(e)'. actually passing in the parameters that we are setting. and then eventually down here. it is creating a new audio element, and it is passing 't.responsetext'. and then its playing.

//so lets save this, and jump back to the browser and check it out. 'hello world'. awesome. so it's working. so we can see here, that we have the response from our voice RSS api. and we can se that it had passed in this audio data as an string. but the problem is, that it didnt actually pass it into our audio element. the reason that this is a problem is because we want to have more control over the audio that's returned from our API. cos we want to be able to control it, and potentially call an event on it later.

//so i am going to jump back over and show you how i fix this. so i am going to comment out this line 'new Audio(t.responseText).play()', this currently playing the response. and below that, i am going to write out constant name, that we have not yet made. 'audioElement'. use camel case. and we are going to set the source attribute src. and that is equal the t.responseText. so its the same thing as above. and on that same element, we are going to now call the 'play' method. and that is all that i am modifying. i am taking out this line 'new Audio(t.responseText).play()', and i am putting in these 2 lines.

//so now i can actually delete this, becuase we have caught up with the minified code which i have included in the template. and i can uncomment out this. and i will use word wrap again alt z. to hide it. and now its time for you to get back to coding with me. so we are going to start at the top here. and we are going to target out 2 html elements, so we have a button, and we have a audio element.

//so first, we are going to write out a constant. const for our button. we are going to call it button. and that is going to equal document.getElementbyID(), and in brackets, we are going to pass in in single quotes, the name of our id that we had, and that is button. we are going to do the same thing for our audioElement, equals document.getElementbyID('audio'). ok. make sure you have your API key in here, and we are going to save it. and test it out. "Hello World". ok awesome. we have our 'Hello World' working. and this time we can see that our audio element is populated. so if we hit the play button. we can hear it again! that is excellent. so we finally, overcome our first big challenge of finding a text to speech API. and getting it working exactly the way we wanted it to. in the next one, we will look at how to track down a joke API. and how to get that up and running.
