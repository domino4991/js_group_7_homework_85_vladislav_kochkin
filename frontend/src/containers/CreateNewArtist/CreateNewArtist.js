import React, {useState} from 'react';
import ArtistForm from "../../components/UI/ArtistForm/ArtistForm";
import {useDispatch, useSelector} from "react-redux";
import {postNewArtist} from "../../store/actions/artistsActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateNewArtist = () => {
    const {artistsError} = useSelector(state => state.artists);

    const [newArtist, setNewArtist] = useState({
        name: '',
        info: '',
        image: ''
    });

    const dispatch = useDispatch();

    const onChangedFields = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewArtist(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangedFile = e => {
        const name = e.target.name;
        const value = e.target.files[0];
        setNewArtist(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return artistsError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newArtist).forEach(field => {
            formData.append(field, newArtist[field]);
        });
        dispatch(postNewArtist(formData));
    };

    return (
        <section className="Create-artist-page">
            <div className="container">
                <h2 className="Title-page">Новый исполнитель</h2>
                <ArtistForm
                    changedFile={e => onChangedFile(e)}
                    getFieldError={getFieldError}
                    changed={e => onChangedFields(e)}
                    submitted={e => onSubmittedForm(e)}
                    name={newArtist.name}
                    info={newArtist.info}
                />
            </div>
            <ToastContainer autoClose={4000} />
        </section>
    );
};

export default CreateNewArtist;