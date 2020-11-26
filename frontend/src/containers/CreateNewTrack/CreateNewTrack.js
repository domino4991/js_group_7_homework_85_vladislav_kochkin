import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFormArtists} from "../../store/actions/artistsActions";
import TrackForm from "../../components/UI/TrackForm/TrackForm";
import {getFormAlbums} from "../../store/actions/albumsActions";
import {postNewTrack} from "../../store/actions/tracksActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateNewTrack = () => {
    const {artists} = useSelector(state => state.artists);
    const {albums} = useSelector(state => state.albums);
    const {tracksError} = useSelector(state => state.tracks);
    const dispatch = useDispatch();
    const [newTrack, setNewTrack] = useState({
        name: '',
        duration: '',
        audioFile: '',
        trackNumber: '',
        album: ''
    });
    const [artist, setNewArtist] = useState('');

    useEffect(() => {
        dispatch(getFormArtists());
        if(artist.length !== 0) {
            dispatch(getFormAlbums(artist));
        }
    }, [dispatch, artist]);

    const onChangedField = e => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'artist') {
            setNewArtist(e.target.value);
        } else {
            setNewTrack(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const onChangedFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setNewTrack(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newTrack).forEach(key => {
            formData.append(key, newTrack[key]);
        });
        dispatch(postNewTrack(formData));
        setNewTrack({
            name: '',
            duration: '',
            audioFile: '',
            trackNumber: '',
            album: ''
        });
    };

    const getFieldError = fieldName => {
        try {
            return tracksError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    return (
        <section className="Create-new-track-page">
            <h2 className="Title-page">Создание нового трека</h2>
            {artists && <TrackForm
                changedFile={e => onChangedFile(e)}
                getFieldError={getFieldError}
                duration={newTrack.duration}
                name={newTrack.name}
                submitted={e => onSubmittedForm(e)}
                trackNumber={newTrack.trackNumber}
                changed={e => onChangedField(e)}
                artists={artists}
                artist={artist}
                album={newTrack.album}
                albums={albums}
            />}
            <ToastContainer autoClose={4000} />
        </section>
    );
};

export default CreateNewTrack;