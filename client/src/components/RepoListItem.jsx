import React from 'react';

const RepoListItem = (props) => (
  <div>
   <div>UserName: {props.repo.username}</div>
   <div>RepoName: {props.repo.reponame}</div>
   <div>Created At: {props.repo.created_at}</div>
  </div>
)

export default RepoListItem;