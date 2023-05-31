import { useEffect, useState } from 'react';
import './AttachPhotosModal.css';

const AttachPhotosModal = ({photoFiles, setPhotoFiles, setErrors, setShowPhotoModal}) => {
    const [maximumError, setMaximumError] = useState("");
    const [attachArr, setAttachArr] = useState([]);
    const [attachURLs, setAttachURLs] = useState([]);
    const [clicks, setClicks] = useState(0);

    const showBlank = attachArr.length === 0

    const fileHandler = (e) => {
        const files = e.target.files;
        if (files.length + photoFiles.length > 4) {
            setMaximumError("Maximum 4 pictures per review")
        } else {
            setAttachArr([...attachArr, ...files]);
        }
    }

    useEffect(() => {
        if (attachArr.length !== 0) {
            let filesLoaded = 0;
            const urls = []
            attachArr.forEach((file, idx) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[idx] = fileReader.result;
                    if (++filesLoaded === attachArr.length)
                        setAttachURLs(urls)
                }
            })
        } else {
            setAttachURLs([])
        }
    }, [attachArr])

    const cancelHandler = () => {
        return () => {
            setClicks(clicks + 1)
            if (clicks === 0) {
                setMaximumError("Changes will not save if you close editor. Click again to confirm")
            } else if (clicks === 1) {
                setShowPhotoModal(false)
            }
        }
    }

    const attachHandler = () => {
        if (attachArr.length + photoFiles.length > 4) {
            setErrors(["Maximum 4 pictures per review"]);
            setMaximumError("Maximum 4 pictures per review")
        } else {
            setPhotoFiles([...photoFiles, ...attachArr]);
            setShowPhotoModal(false)
        }
    }

    const deleteImg = (idx) => {
        const updatedPhotoFiles = [...attachArr];
        updatedPhotoFiles.splice(idx, 1); 
        setAttachArr(updatedPhotoFiles)
        setErrors([])
    }

    console.log(attachArr, "attacharr")
    console.log(attachURLs, "attachurls")

    return (
        <div className='photo-modal-background'
        >
            <div className='photo-modal' onClick={e => e.stopPropagation()}>                
                <div className='close-button'
                    onClick={()=>setShowPhotoModal(false)}
                ></div>
                {showBlank &&
                <div id="photo-modal-container">

                    <h1>Drag and drop photos here</h1>
                    <p>or</p>
                    <input
                        className="drop-files"
                        id='file-input'
                        type="file"
                        onChange={fileHandler}
                        onDrop={fileHandler}
                        multiple
                    />
                    <label
                        for='file-input'
                        className="browse-button red-button"
                    >
                        Browse files
                    </label>
                    <p className='attach-error'>{maximumError}</p>
                 
                </div>}
                {!showBlank && 
                    <div>
                        <h1>Almost Done!</h1>
                        <div className='attachment-preview-container'>
                            {attachURLs.map((photo, idx) => 
                                <div key={idx} className='modal-preview-container'>
                                    <img src={photo} className='modal-preview' />
                                    <div className='delete-modal-img'
                                        onClick={() => deleteImg(idx)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='attach-bottomrow'>
                            <input
                                id='file-input'
                                type="file"
                                onChange={fileHandler}
                                onDrop={fileHandler}
                                multiple
                            />
                            <div>
                                <button onClick={cancelHandler}>Cancel</button>
                                <button className='red-button' onClick={attachHandler}>Attach</button>
                            </div>
                        </div> 
                        <p className='attach-error'>{maximumError}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default AttachPhotosModal;