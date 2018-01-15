import React, { Component, ReactDOM } from 'react';
import logo from './logo.svg';
import mainLogo from'./gavagai_logo.svg';
import './App.css';
import ReactJson from 'react-json-view'


const url = "https://api.gavagai.se/v3/languages?apiKey=46497f7d2bdf86f7cf6b36760c09664c";
const url_keywords = "https://api.gavagai.se/v3/keywords?apiKey=46497f7d2bdf86f7cf6b36760c09664c";
const url_tonality = "https://api.gavagai.se/v3/tonality?apiKey=46497f7d2bdf86f7cf6b36760c09664c";

//const string_json_sample = '{"keywords":[{"term":"the dish","occurrences":2,"documentFrequency":0}]}'
const string_json_sample = '{"keywords":[{"term":"the dish","occurrences":2}]}'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.setState({
        reload: true
      })
  }

  componentDidMount(self){

    //if (this.state.reload == true){
      // Get the available languages
      fetch(url)
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson));
          this.setState({
            languages: JSON.stringify(responseJson)
          })
      });
    //}
    console.log("holi",this.state.languages);

    /*
    while (!languages_array){
      var languages_array = this.state.languages;
    }
    */
    //while (!languages_array){}
    var languages_array = ["AR","AZ","BG","BN","CA","CS","DA","DE","EL","EN","ES","ET","FA","FI","FR","HE","HI","HR","HU","ID","IS","IT","JA","JV","KO","LT","LV","MS","NL","NO","PL","PT","RO","RU","SK","SL","SQ","SV","SW","TH","TL","TR","UK","UR","VI","ZH"];
    var sel = document.getElementById('Languages');
    for(var i = 0; i < languages_array.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = languages_array[i];
        opt.value = languages_array[i];
        sel.appendChild(opt);
    }
  }

  openFile(event, this_){
    var input = event.target;
    var reader = new FileReader();

    reader.onload = function(){
      var text = reader.result;
      this_.setState({file_text: text})
      //var node = document.getElementById('output');
      //node.innerText = text;
      console.log(reader.result.substring(0, 200));
      console.log('File opened');
    };

    reader.readAsText(input.files[0]);
  }

POSTKeywords(this_){
  //if (this.state.reload == true){
    var body_text = this_.state.file_text
    fetch(url_keywords, {
    method: 'POST',
    headers: {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
    },body: JSON.stringify({"language":"en", "significantTerms":1, "texts": [ { "id":"1" , "title":"Title" , "body": body_text,}]
    }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        this.setState({
          keywords: JSON.stringify(responseJson)
        })
    this.setState({reload: false})
    return responseJson.keywords;
    });
  //}

}

POSTTonality(this_){
  //if (this.state.reload == true){
    var body_text = this_.state.file_text
    fetch(url_tonality, {
    method: 'POST',
    headers: {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "texts":[ { "body":body_text, "uri":1 }]
    }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        this.setState({
          tonality: JSON.stringify(responseJson)
      })
    return responseJson.keywords;
    });
  //}
}


  render() {

    /*if(!this.state.data)
      return <p> Loading.. </p>
    */
    return (
      <div className="App">
        <header className="App-header">
          <img src={mainLogo} className="App-logo" alt="logo" align='right'/>

        </header>


      <body className="App-body">

        <p className="App-intro-header-2">
        <p className="App-intro-header">
        Introduction
        </p>
        This task is part of a talent assessment for the internship position at Gavagai. It consists in building a small web application to visualize the sentiment
        measurements of an arbitrary file using the Gavagai API. When I started building it, I thought that for the display of some dynamic graphs it would be useful
         to use react, which is a javascript library that manages the frontend part of a website in a way that reloads automatically some regions without reloading the
         entire page. Since I was completely new in this environment, I got some basic notions about it and I coded this small sample. Unfortunately, I found several
         problems managing the GET/POST requests of the API: the queries were sent multiple times and I fastly run out of credits. To show that I was close to accomplish
          the task, I kept a response message that I am using in the forms below.
        </p>

        <p align='left'>
        <p className="App-intro">
          1. To start, please select the file you want to analyze.
        </p>
        <p align='center'><input type='file' accept='text' onChange={ (e) => this.openFile(e, this) }/></p>
        <p className="App-intro">
        2. You should then select its language:
        </p>
        <p align='center'>


        <select id="Languages"></select>

        </p>
        <p className="App-intro">
        3. And you will see your results below:
        </p>

        </p>



         <table border="0" cellpadding="1" align='center'>
          <tr>
           <th align="left">
           <p align='left'> Keywords:
           <p></p><ReactJson src={JSON.parse(string_json_sample) }  theme="summerfruit:inverted" iconStyle="circle" enableClipboard="false" displayDataTypes="false"/>
           </p>
           </th>
           <th align="center">
           <p align='left'> Tonality:
           <p></p><ReactJson src={JSON.parse(string_json_sample) }  theme="summerfruit:inverted" iconStyle="circle" enableClipboard="false" displayDataTypes="false"/>
           </p>
           </th>
           <th></th>
          </tr>
          <tr id="itemPlaceholder" runat="server"></tr>
         </table>


         </body>
      </div>

    );
  }
}


export default App;
