import React, { useState } from "react";

function EndForm ({ save }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function saveScore (e) {
    e.preventDefault();
    if (value === '') {
      alert('Please enter a name');
      return;
    }
    save(value);
  }

  return (
    <form id='endForm' onSubmit={saveScore}>
      <label>
        Enter Name to join leaderboard:
        <input type='text' value={value} onChange={handleChange} />
      </label>
      <button type="submit">Save Score</button>
    </form>
  )
}

export default EndForm;