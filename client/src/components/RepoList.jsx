import React from 'react';
import RepoListItem from './RepoListItem.jsx'
const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>

    There are {props.repos.length} repos.

    <ul>
       {props.repos.map((repo, index) => {
         return <RepoListItem key={index} repo={repo}/>
       })}
    </ul>
    
  </div>
)

export default RepoList;