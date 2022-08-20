import React, {useEffect, useState} from 'react';
import {$api, API_URL} from "../http";
import {$apiRoutes} from "../http/routes";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import 'filepond/dist/filepond.min.css';


const ImageInput = ({ uuid, images=[], multiple=false }) => {
    const [files, setFiles] = useState(images.map(img => {
        return {
            source: img,
            options: {
                type: 'local',
                metadata: {
                    uuid,
                },
            }
        }
    }))
    const server = {
        url: API_URL,
        process: 'files/upload/' + uuid + '/images',
        load: 'files/get/' + uuid + '/images/',
        remove: {
            url: 'files/delete/',
            method: 'POST'
        },
        revert: {
            url: 'files/delete/',
            method: 'POST'
        },
    };

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

    useEffect(() => {
        document.addEventListener('FilePond:removefile', (e) => {
            if($api) {
                const uuid = e.detail.file.getMetadata('uuid');
                $api.post($apiRoutes.files.delete, {filename: uuid + '/images/' + e.detail.file.filename})
            }
        });
    }, [])

    return (
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            server={server}
            name="image"
            labelIdle='Выберите картинку'
            credits={false}
            allowMultiple={multiple}
            maxFiles={10}
        />
    );
};

export default ImageInput;