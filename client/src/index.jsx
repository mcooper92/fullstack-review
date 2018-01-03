import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
      //repoCount: 0
    }

  }


  getEverything() {
    $.ajax({
      method:"GET",
      url: "/repos",
      success: (data) => {
        console.log("THIS IS WHAT SHOULD BE ADDED ", data)
        this.setState({repos: data})
      }
     
    });
  }

  search (term) {
    $.ajax({
      method: "POST",
      url: "/repos",
      data: {username: term},
      success: (data) => {
        console.log("You've added " + term)
        this.getEverything();
        //this.setState({repoCount: data})
      }
      
    });
  }
  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));