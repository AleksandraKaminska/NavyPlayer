import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="user-profile">
      <img src={props.imageUrl} />
      <div className="details">
        <h1>{props.name}</h1>
        <a href={'http://twtter.com/' + props.twitter}>@{props.twitter}</a>
        <p>Works on <strong>{props.worksOn}</strong></p>
        <h3>Github Repos:</h3>
        <ul className="repos">

          {props.repos.map(repo => {

            return (<li key={repo.id}><a href={repo.html_url}>{repo.name}</a></li>);

          })}

        </ul>
      </div>
    </div>
  );
}
