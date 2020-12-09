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

// function test() {
//   VoiceRSS.speech({
//     key: "3d5ce7cfb8d646b8a9a97344c92f31b0",
//     src: "Hello, world",
//     hl: "en-us",
//     v: "Linda",
//     r: 0,
//     c: "mp3",
//     f: "44khz_16bit_stereo",
//     ssml: false,
//   });
// }

// test();

// 002 lets jump back into the code and show a practical example, which will probably make more sense. so the first thing we are going to do is, we are going to comment out our test function for now. and lets scroll down here abit. and below this. we are going to start by commenting out a title, explaining the exact functionality of our get jokes function. so we want to get jokes from joke api. and inside of that, we are going to write an asynchronous function. so we are going to start by typing 'async'. then 'function'. and then our function name is going to be 'get jokes'. and inside of our curly brackets here, we are going to make our try catch statement. so we are going to do try, curly brackets again. and after the 2nd curly bracket, we are going to add catch. and then in curly brackets we are going to pass in our error parameter. and then we are going to have curly brackets again. and then im just going to comment out. this is where we are going to catch errors. just as a reminder. and i am going to write a console log. and i am going to add a custom message. this is a good thing to do when you are checking for errors. so that you know where its coming from. in this case im just going to write 'whoops'. comma. and then i am going to pass in the 'error' variable here.

//and within the try statement here, i am just going to try something that is not going to work. just to show how it is catch an error. so i am going to try 'something'. so lets save that and jump back. console. call the function getJokes(). in our console. we have our whoops. it actually includes a reference error saying 'something' is not defined. ok so we have our catch statement is working effectively.

//so now, lets get our actual fetch request to work.the first step would be to jump back to our joke API website. and we actually want single and 2 part jokes. so i am going to check this box. you see that actually shortens our url. and we are going to copy this. because this is where we are going to try 'get' with our fetch request. so we will jump back into the code.

//and at the top of our function here 'getJokes()', we are going to paste in our API. we are going to make it a constant. 'apiUrl' equals, single quotes, paste, and we can see its a long line. we dont need to word wrap, cos we dont really need to touch this again. we just add a semi colon at the end here. ok, so now in our try statement, we are going to start with 'const response = await fetch()'. this is our fetch method. inside of it we are going to pass in our apiUrl constant which we have just made. and below that. we are going to do something with that response. so ive said, we are going to make a 'data' constant. and that is going to equal await response.json(). that is going to turn the response in 'response json'. thats whats going to become our data.

//we are going to wait until this is done. to set this response value. and we are going to wait until its done being converted into json. to set our data value. and then below that, we are just going to console log the data. ok, so lets save that and check it out. so we can see in our console, that it is already working. lets double check our network tab here. we can see that we have our programming call. and you can see here, yes, it is returning everything. exactly as is was in the website example. ok thats awesome.

//but our next challenge is, how do we just return the joke and not the whole response. so we jump back to our console, where we've logged our data, we can see that we have this values that we can actually target. so we have setup and delivery here. if it was a single joke, we would just have joke. so we can target into our json object, by seperating with a period.

//so back in the code, instead of console logging data, lets try console logging 'data.joke'. to target that 'joke' child. so lets save that and jump back. we can see that its now 'undefined'. so why is that. lets go back to our network tab. lets look our programming call. so it looks like it worked, but as weve discussed before, this 'delivery' does not have a joke. it just has a setup and delivery. all the two part jokes. so, now, its time for us to actually figure out, how we are going to deal with that.

//so if we have a setup, it means we have a delivery. essentially, we have to create our own joke variable. that will either equal the joke of a single joke, or it will equal the 'setup' and 'delivery' of a 2 part joke. so lets jump back to the code and see what we can do.

//so above our API, the first thing that i am going to do is i am going to create our very own joke variable. let joke equals, and i am just going to put in single quotes, to create our joke as an empty string. and then inside of our try statement, we should be able to work this out with a simple if statement. so lets get rid of this 'console.log(data.joke)' for now. and we are going to go 'if data.setup, so that means if there is a setup, which is only going to happen with 2 part jokes, we want our joke variable that we created, to be equal to our setup plus or delivery. so to write this out, i am going to use a template string.

//we can do this by using backticks. the reason we are going to use this is it is easier to add strings and variables together into one string. so with dollar sign, and curly braces, you can see it turned blue. that means now its expecting a variable. and we are going to pass 'data.setup', and then after that a space, and then  '...'. so the orange is an actual string. and the blue is variables. but in the end, it will all be just a string. and we are going to do the same thing for our delivery. dollar sign, curly brackets, and then 'data.delivery'. we are going to add an else statement here. and then another set of curly brackets. and this time, its a little bit simpler. we are just going to assign our joke variable is equal 'data.joke'. below that, we are going to console.log(joke). so the joke variable that we created up here. save that and check it out. look at network tab. so this is a single joke. hit refresh. this time we have another single joke. we hit refresh. we want to make sure we are getting a 2 part joke as well. this is a 2 part joke. so we can see that we get a 2 part joke seperated by the '...' that we added.

//so thats perfect. we are no longer getting undefined, and we are getting our single and 2 part jokes, returned as a string. so thats pretty much everything we needed to do. to setup our joke api in our project. awesome. so now, in the next one, we are going to look at how the 2 apis are already working independently, and then we are going to figure out, how we are going to combine the 2 together. see you in that one ---end.

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
    console.log(joke);
  } catch (error) {
    //Catch Errors
    console.log("Whoops", error);
  }
}

getJokes();

//001 so now that we have sorted out out text to speech api, in this video we will look at sorting out our joke API. so the very first step is we are just going to google, and see what i am going to find.  so 'joke api'. and we click on the first result. so you can see, very important, there's actually a new version of this api. so i am going to click here to go to the new version. ok, and we can see we have some information about this API. so its a RESTful API, it serves well formatted jokes. it can be used without an API key, membership registration or payment.

//the usage is very simple. requires a basic knowledge of http requests and json. ok lets scroll down and see what else we can learn about this. ok it looks like there is a way to customize the parameters that we are passing to the API in order to get certain types of jokes. we can see that we have an example of the URL that we are building from these parameters. and the result. so we need to click 'send request' to actually see a result.

//ok, the first thing that i am going to do is, i am going to customise this a little bit. ok. so i only want programming jokes. i am going to click on custom. and then the checkbox 'programming'. below that, there a list of things to blacklist. meaning we do not want to include. so i am not going to include any of this. i am going to keep the jokes as tame as possible.

//we are going to return it as json. for now we are just going to take single jokes. so you can see, at the bottom here, our URL has changed. and it is a little bit more complicated. so programming, our blacklist flags, and we only want single jokes. so lets sent the request. ok, so we can see we have our result here. so we hve our json object, and you can see we have several different values here.

//so we have our categories Programming. our type is single. and you can see we have our joke. this is our joke string here. we have our flags. we have our ID. and we have an error. but we can see that its false. there is no error. so out of curiosity, lets see how the 2 part jokes look.

//so lets send that request. scroll down. ok, so i am noticing a big difference here. we'd no longer have a joke value. and instead we have a setup, and a delivery. so the joke is split into 2 different values. so we are probably going to need to do something to deal with that. because we want all of our jokes to be in 1 uniform way, being sent to our text to speech api.

//alright, i am just going to briefly explain how we are going to turn this url into a joke within our application. we are going to use 'FETCH'. this is also from the mozilla developer website. i will provide the links to all of this stuff within the course. we can see that the 'fetch api' provdes a global fetch() method. and it is making a complicated process more simple. so if we scroll down, we can see an example here. where we are using the 'fetch()' method, and we are passing in the one argument, which is the path to the resource you want to fetch. and it is going to return a promise containing the response. so that is the 'json' object. so this is just the response, not the actual JSON. to get the JSON, we are going to need to extract the JSON from the response. so you can see the example here.

//we are fetching from the resource. then we are turning the response into the json. and then, we are getting the data. so this is one way to do it. this is using the promises format of returning data. but theres actually a better way that i am going to show you now.

//this 'Example: logging a fetch" is on the google developer page. again i will provide the link of this page. but this is a example of how we can improve thais. instead of having the typical promise code here. we can use an asynchronous function, along with a try catch statement, in order to make this process a little bit more simplified. so in this case whats happening is, we are going to try to fetch, if we are unsuccessful, this catch statement "catch(err){}" will initialize, and it will console log the error.

//if it is successful, this constant 'response' is not going to be set until this fetch request has completed. and then from there, what we are actually going to do is, we are going to have another constant for the data. which is going to wait until we have the response in JSON format. --002
