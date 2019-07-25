import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      count: 0
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (obj) => {
        // console.log('results from page load', obj)
        this.setState({
          repos: obj.results,
          count: obj.count
        });
      }
    });
  }

  search (term) {
    // console.log(`${term} was searched`);
    $.ajax({
      data: term,
      method: 'POST',
      url: '/repos',
      success: (obj) => {
        // console.log('results from search', obj)
        this.setState({
          repos: obj.results,
          count: obj.count
        });
      }
    });
  }

  render () {
    return (<div>
      <h1>GitHub Fetcher</h1>
      <RepoList repos={this.state.repos} count={this.state.count}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));