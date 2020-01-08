import React, {useState} from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const AddNewPost = (props) => {
    const [updatable, setupdatable] = useState(false)
    const [name, setname] = useState(props.name)
    const [status, setstatus] = useState(props.status)
    const [file, setfile] = useState('')
    const [imagePreviewUrl, setimagePreviewUrl] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [uploaded, setuploaded] = useState(false)
    const [currentTite, setcurrentTite] = useState('')

    // const [state, setState] = useState({
    //     updatable: false,
    //     name: props.name,
    //     status: props.status,
    //     file: '',
    //     imagePreviewUrl: '',
    //     imageUrl:'',
    //     title:'',
    //     description:'',
    //     uploaded: false  ,
    //     currentTite:""
    //   });
       

    const _handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('file',   file)
        axios.post("http://localhost:3001/upload", data, {
        }).then(res => {
            setimageUrl(res.data.url)
            setuploaded(true)
        })
    }

    const _handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setfile(file)
            setimagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file)
    }

    const addPost = () => {
        var data = {
            "id":1,
            "type":"IMAGES",
            "description":  description,
            "data":{
                "media":[{
                    "image": imageUrl,
                    "width":2500,
                    "height":1667,
                    "version":"2019-03-14",
                    "description": title}]
            }};
         props.addNewPost(data);
         props.closePopup()
    }

    const updatePost = (id) => {
        var data = {
            "description":  description,
            "data":{
                "media":[{
                    "image":   imagePreviewUrl ?   imagePreviewUrl: props.imagePreviewUrl,
                    "description":  title}]
            }};

        // console.log(data)
        props.updatePost(data,id);
        props.closePopup()
    }



    const handleChange = (evt) => {
        const value = evt.target.value;
        setdescription(value)
        // setState({
        //     ...state,
        //     [evt.target.name]: value
        //   });
    }
    const titlehandleChange = (evt) => {
        const value = evt.target.value;
        settitle(value)
        // setState({
        //     ...state,
        //     [evt.target.name]: value
        //   });
    }

    
        // let imagePreviewUrl =   imagePreviewUrl ?  imagePreviewUrl: props.imagePreviewUrl
        if (!imagePreviewUrl){
          
            let imagePreviewUrl = props.imagePreviewUrl
        }
        
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={ imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div>
                <Dialog onClose={() =>  props.closePopup()} aria-labelledby="customized-dialog-title" open={ props.open}>
                    <DialogTitle id="customized-dialog-title" onClose={() =>  props.closePopup()}>
                        {
                             props.update ? "Update Post" : "Add New Post"
                        }
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="previewComponent">
                            <form onSubmit={(e)=>_handleSubmit(e)}>
                                <input className="fileInput"
                                       type="file"
                                       onChange={(e)=>_handleImageChange(e)} />
                                <button className="submitButton"
                                        type="submit"
                                        onClick={(e)=>_handleSubmit(e)}>Upload Image</button>
                            </form>
                            <div className="imgPreview">
                                {$imagePreview}
                            </div>
                        </div>
                        <FormControl fullWidth variant="outlined" style={{marginTop: "20px"}}
                        >
                            <InputLabel >title</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                labelWidth={40}
                                name="title"
                                // value = { props.currentTite}
                                onChange={(e) => titlehandleChange(e)}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined" style={{marginTop: "20px"}}>
                            <InputLabel >Description</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                labelWidth={80}
                                multiline
                                rows="4"
                                name="description"
                                // value = { props.currentDesc}
                                onChange={(e)=> handleChange(e)}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        { props.update ?
                            <Button autoFocus onClick={() => updatePost(props.postId)} color="primary">
                                Update
                            </Button>:
                            <Button autoFocus onClick={() => addPost()} color="primary">
                                Add
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
export default AddNewPost;

