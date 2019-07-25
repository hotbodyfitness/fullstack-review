import React from 'react';

const RepoList = (props) => {
  var cap = {'textTransform': 'capitalize'};
  var formatDate = (date) => { // date input = '2019-07-24T20:50:00.000Z'
    var year = date.slice(0, 4);
    var monthDay = date.slice(5, 10);
    var time = date.slice(11, 19);
    var hour = time.slice(0, 2);
    var min = time.slice(2, 5);
    var amPM = 'am';
    if (Number(hour) > 12) {
      amPM = 'pm';
      hour = JSON.stringify(Number(hour) - 12);
      if (hour.length === 1) {hour = '0' + hour;}
    } else if (Number(hour) === 0) {
      hour = '12';
    }
    return (monthDay + '-' + year + ' at ' + hour + min + ' ' + amPM);
  };
  return (
    <div>
      <h4><u> Newest {props.repos.length ? props.repos.length : <p hidden></p>} Repos </u></h4>
      <ol>
        {props.repos.map((e, i) => {
          return (<li key={i}><a href={e.html_url} style={cap}>{e.name}</a><br /> — <b>created by: </b>{e.owner}<br /> — <b>updated at:</b> {formatDate(e.updated_at)}<br /><br /></li>)
        })}
      </ol>
      There are now {props.count} total repos saved in the database.
  </div>
  )
};

export default RepoList;