import React from 'react';

const RepoList = (props) => (
  <div>
    <h4><u> Newest {props.repos.length ? props.repos.length : <p hidden></p>} Repos </u></h4>
    <ol>
      {props.repos.map((e, i) => {
        return (<li key={i}>{e.html_url}</li>)
      })}
    </ol>
    There are now {props.count} total repos saved in the database.
  </div>
)

export default RepoList;