import React, {useEffect, useState} from 'react';
import TabsBtns from "../../components/UI/TabsBtns/TabsBtns";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/UI/Table/Table";
import {getArtistUser} from "../../store/actions/artistsActions";
import {getAlbumsUser} from "../../store/actions/albumsActions";
import {getTracksUser} from "../../store/actions/tracksActions";

const UserProfile = (props) => {
    const {artists, artistsError} = useSelector(state => state.artists);
    const {albums, albumsError} = useSelector(state => state.albums);
    const {tracks, tracksError} = useSelector(state => state.tracks);
    const [activeIndex, setActiveIndex] = useState(1);
    const dispatch = useDispatch();
    const url = props.location.path;

    useEffect(() => {
        dispatch(getArtistUser());
        dispatch(getAlbumsUser());
        dispatch(getTracksUser());
    }, [dispatch, url]);

    const onClickHandler = (newIndex) => {
        setActiveIndex(newIndex);
    };

    return (
        <section className="User-profile-page">
            <div className="container">
                <h2 className="Title-page">Личный кабинет</h2>
                <TabsBtns
                    clicked={onClickHandler}
                    activeIndex={activeIndex}
                />
                {artists && !artistsError ? activeIndex === 1 && <Table
                    title="Исполнители"
                    data={artists}
                /> : activeIndex === 1 && <p style={{textAlign: 'center'}}>{artistsError}</p>}
                {albums && !albumsError ? activeIndex === 2 && <Table
                    title="Альбомы"
                    data={albums}
                /> : activeIndex === 2 && <p style={{textAlign: 'center'}}>{albumsError}</p>}
                {tracks && !tracksError ? activeIndex === 3 && <Table
                    title="Треки"
                    data={tracks}
                /> : activeIndex === 3 && <p style={{textAlign: 'center'}}>{tracksError}</p>}
            </div>
        </section>
    );
};

export default UserProfile;