import React from 'react';
import './TabsBtns.css';

const TabsBtns = ({activeIndex, clicked}) => {
    return (
        <div className="Tabs">
            <button
                className={activeIndex === 1 ? 'Tabs__btn active' : 'Tabs__btn'}
                onClick={() => clicked(1)}
            >Исполнители</button>
            <button
                className={activeIndex === 2 ? 'Tabs__btn active' : 'Tabs__btn'}
                onClick={() => clicked(2)}
            >Альбомы</button>
            <button
                className={activeIndex === 3 ? 'Tabs__btn active' : 'Tabs__btn'}
                onClick={() => clicked(3)}
            >Треки</button>
        </div>
    );
};

export default TabsBtns;