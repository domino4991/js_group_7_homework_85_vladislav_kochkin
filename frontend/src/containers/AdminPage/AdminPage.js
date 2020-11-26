import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/UI/Table/Table";
import {deleteAlbum, getAlbumsAdmin, publishAlbum} from "../../store/actions/albumsActions";
import {deleteArtist, getArtistsAdmin, publishArtist} from "../../store/actions/artistsActions";
import {deleteTrack, getTracksAdmin, publishTrack} from "../../store/actions/tracksActions";
import './AdminPage.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TabsBtns from "../../components/UI/TabsBtns/TabsBtns";

const AdminPage = () => {
    const {albums, albumsError} = useSelector(state => state.albums);
    const {tracks, tracksError} = useSelector(state => state.tracks);
    const {artists, artistsError} = useSelector(state => state.artists);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        dispatch(getAlbumsAdmin());
        dispatch(getArtistsAdmin());
        dispatch(getTracksAdmin());
    }, [dispatch]);

    const onClickHandler = (newIndex) => {
        setActiveIndex(newIndex);
    };

    return (
        <section className="Admin-page">
            <div className="container">
                <h2 className="Title-page">Админ панель</h2>
                <TabsBtns
                    clicked={onClickHandler}
                    activeIndex={activeIndex}
                />
                {artists && !artistsError ? activeIndex === 1 &&
                    <Table
                        title='Исполнители'
                        data={artists}
                        publish={publishArtist}
                        deleteFunc={deleteArtist}
                    /> : activeIndex === 1 && <p style={{textAlign: 'center'}}>{artistsError}</p>
                }
                {albums && !albumsError ? activeIndex === 2 &&
                    <Table
                        title='Альбомы'
                        data={albums}
                        publish={publishAlbum}
                        deleteFunc={deleteAlbum}
                    /> : activeIndex === 2 && <p style={{textAlign: 'center'}}>{albumsError}</p>
                }
                {tracks && !tracksError ? activeIndex === 3 &&
                    <Table
                        title='Треки'
                        data={tracks}
                        publish={publishTrack}
                        deleteFunc={deleteTrack}
                    /> : activeIndex === 3 && <p style={{textAlign: 'center'}}>{tracksError}</p>
                }
            </div>
            <ToastContainer autoClose={3000} />
        </section>
    );
};

export default AdminPage;