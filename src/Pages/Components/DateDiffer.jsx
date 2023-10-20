import React from 'react'

function DateDiffer(props) {
    let createDate = new Date(props.createAt.seconds * 1000);
    let currentDate = new Date();

    let diffTime = Math.abs(currentDate - createDate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    let diffMinutes = Math.ceil(diffTime / (1000 * 60));

    let diffString = '';
    if (diffDays > 0) {
        diffString = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
        diffString = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
        diffString = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        diffString = 'just now';
    }
  return (
    <>
        {diffString}
    </>
  )
}

export default DateDiffer