import React from 'react';

export default function Summary(props) {
  return (
    <div className='center'>
      <div className="card" style={{ width: '35rem' }}>
        <div className="card-body">
          <h5 className="card-title">Summary</h5>
          {props.summary}
        </div>
      </div>
    </div>

  );
}
