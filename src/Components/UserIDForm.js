import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {FilePond, File, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useState} from "react";

registerPlugin(FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginFileEncode,
    FilePondPluginImageResize);

export default function UserIDForm(props) {
    const [files, setFiles] = useState([]);

    const handleAddFile = (err, file) => {
      props.onUpdateAvatar(file?.getFileEncodeDataURL());
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                User Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FilePond
                        files={files}
                        onaddfile={handleAddFile}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        stylePanelLayout="compact circle"
                        imageResizeTargetWidth={250}
                        imageResizeTargetHeight={250}
                        imagePreviewHeight={70}
                        imageCropAspectRatio="1:1"
                        maxFileSize="5MB"
                        acceptedFileTypes={['image/png', 'image/jpeg']}
                        maxFiles={1}
                        name="avatar"
                        labelIdle='Drag & Drop your avatar or <span class="filepond--label-action">Browse</span>'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        autoComplete="username"
                        variant="standard"
                        value={props.username}
                        onChange={props.onChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
