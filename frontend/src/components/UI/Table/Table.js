import React from 'react';
import './Table.css';
import {useDispatch, useSelector} from "react-redux";

const Table = ({data, title, publish, deleteFunc}) => {
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    let count = 1;
    return (
        <>
            <h3 className="Table__title">{title}</h3>
            <table className='Table'>
                <thead>
                    <tr
                        className="Table__titles"
                    >
                        <th className="Table__title">N#</th>
                        <th>Name</th>
                        <th>Is Published</th>
                        {user && user.role === 'admin' && <th>Options</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => <tr
                        key={item._id}
                        className="Table__cells"
                    >
                        <td>{count++}</td>
                        <td>{item.name}</td>
                        {user && user.role === 'admin' ?
                        <>
                            <td>
                                <button
                                    className="Table__btn-publish"
                                    onClick={() => dispatch(publish(item._id, !item.isPublished))}
                                >
                                    {item.isPublished ? 'Опубликованно' : 'Не опубликованно'}
                                </button>
                            </td>
                                <td>
                                <button
                                className="Table__btn-delete"
                                onClick={() => dispatch(deleteFunc(item._id))}
                                >
                                Удалить
                                </button>
                                </td>
                        </> :
                            <>
                                <td>{item.isPublished ? 'Опубликованно' : 'Не опубликованно'}</td>
                            </>
                        }
                    </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Table;