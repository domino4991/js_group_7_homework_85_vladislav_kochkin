import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFormArtists} from "../../store/actions/artistsActions";
import {postNewAlbum} from "../../store/actions/albumsActions";
import AlbumForm from "../../components/UI/AlbumForm/AlbumForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateNewAlbum = () => {
    const {artists} = useSelector(state => state.artists);
    const {albumsError} = useSelector(state => state.albums);
    const dispatch = useDispatch();
    const [newAlbum, setNewAlbum] = useState({
        name: '',
        year: '',
        artist: '',
        image: ''
    });

    useEffect(() => {
        dispatch(getFormArtists());
    }, [dispatch]);

    const onChangedField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewAlbum(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangedFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setNewAlbum(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newAlbum).forEach(key => {
            formData.append(key, newAlbum[key]);
        });
        dispatch(postNewAlbum(formData));
        setNewAlbum({
            name: '',
            year: '',
            artist: '',
            image: ''
        });
    };

    const getFieldError = fieldName => {
        try {
            return albumsError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    return (
        <section className="Create-new-album-page">
            <h2 className="Title-page">Добавление нового альбома</h2>
            {!albumsError ? <AlbumForm
                changedFile={e => onChangedFile(e)}
                year={newAlbum.year}
                submitted={e => onSubmittedForm(e)}
                changed={e => onChangedField(e)}
                artists={artists}
                name={newAlbum.name}
                getFieldError={getFieldError}
                artist={newAlbum.artist}
            /> : <p style={{textAlign: 'center'}}>Добавьте исполнителя перед тем как создавать альбом</p>}
            <ToastContainer autoClose={4000} />
        </section>
    );
};

export default CreateNewAlbum;