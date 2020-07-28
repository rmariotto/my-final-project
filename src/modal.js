import React from 'react';

export default function Modal(props){
    return (
        <div className="modal">
        <div className='modal-container'>
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + props.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <button onClick={props.closeModal} id="close-modal-box" >x</button>
        </div>
    </div>
    );
}
