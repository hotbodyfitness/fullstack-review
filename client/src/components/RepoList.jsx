import React from 'react';

const RepoList = (props) => {
  var cap = {'textTransform': 'capitalize'};
  return (
    <div>
      <h4><u> Newest {props.repos.length ? props.repos.length : <p hidden></p>} Repos </u></h4>
      <ol>
        {props.repos.map((e, i) => {
          return (<li key={i}><a href={e.html_url} style={cap}>{e.name}</a><br /> — <b>created by: </b>{e.owner}<br /> — <b>updated at:</b> {e.updated_at}<br /><br /></li>)
        })}
      </ol>
      There are now {props.count} total repos saved in the database.
  </div>
  )
};

export default RepoList;