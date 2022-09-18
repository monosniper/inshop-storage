import React, {useEffect, useState} from 'react';
import {$api, API_URL} from "../http";
import {$apiRoutes} from "../http/routes";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import 'filepond/dist/filepond.min.css';

const ImageInput = ({ uuid, images=[], multiple=false, prefix=false }) => {
    const [files, setFiles] = useState(images
        // .filter(img => img.startsWith(prefix))
        .map(img => {
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
        process: 'files/upload/' + uuid + '/images' + (prefix ? ('-' + prefix) : '')
            // + '/true/'
        ,
        // process: {
        //     url: 'files/upload/' + uuid + '/images' + (prefix ? ('.' + prefix) : '') + '/true',
        //     method: "POST",
        //     withCredentials: false,
        //     headers: {},
        //     data: {
        //         nationalcode: "1234567890",
        //         typecode:"1"
        //     },
        //     ondata: (formData) => {
        //         if(prefix) formData.append('prefix', prefix);
        //         return formData;
        //     },
        //     timeout: 7000,
        // },
        load: 'files/get/' + uuid + '/images' + (prefix ? '-' + prefix : '') + '/',
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
                $api.post($apiRoutes.files.delete, {filename: uuid + '/images/' + prefix + e.detail.file.filename})
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