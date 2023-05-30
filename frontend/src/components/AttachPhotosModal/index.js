import './AttachPhotosModal.css';

const AttachPhotosModal = ({photoFiles, setPhotoFiles, setErrors, setShowPhotoModal}) => {

    const fileHandler = (e) => {
        const files = e.target.files;
        if (files.length + photoFiles.length > 5) {
            return setErrors(["Maximum 5 pictures per review"]);
        } else {
            setPhotoFiles([...photoFiles, ...files]);
        }
    }

    return (
        <div className='photo-modal-background'
        >
            <div className='photo-modal' onClick={e => e.stopPropagation()}>
                <div className='close-button'
                    onClick={()=>setShowPhotoModal(false)}
                ></div>
                <div id="photo-modal-container">
                    <h1>Drag and drop photos here</h1>
                    <p>or</p>
                    <label className="custom-file-input">
                        <input
                            type="file"
                            onChange={fileHandler}
                            onDrop={fileHandler}
                            multiple
                        />
                        <button type="button" className="browse-button red-button">Browse files</button>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default AttachPhotosModal;