import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Posts from '../../components/Posts'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

function HomePage (){
    const [posts, setposts] = useState([])
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(true)
    const [file, setfile] = useState('')
    const [imagePreviewUrl, setimagePreviewUrl] = useState('')
    const [currentTite, setcurrentTite] = useState('')
    const [currentDesc, setcurrentDesc] = useState('')
    const [currentimage, setcurrentimage] = useState('')
    const [update, setupdate] = useState(false)
    const [postId, setpostId] = useState('')


    // const [state, setState] = useState({
    //     posts: [],
    //     open:false,
    //     loading:true,
    //     file: '',
    //     imagePreviewUrl: '',
    //     currentTite:'',
    //     currentDesc:'',
    //     currentimage:'',
    //     update:false,
    //     postId:''
    //   })

      useEffect(()=>{
            axios.get(`http://localhost:3001/posts`)
            .then(res => {
            const posts = res.data;
            setposts(posts)
            setloading(false)
            })
      })

    const openPopup = () => {
        setopen(true)
    }

    const closePopup = () => {
        setopen(false);
        setcurrentTite('');
        setcurrentDesc('');
        setcurrentimage('');
        setimagePreviewUrl('');
        setupdate(false);
        setpostId('')
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/`+ id)
            .then((res) => {
                let newPosts  = posts.filter(post => post.id !== id);
                setposts(newPosts)
            })
    }

    const addNewPost = (data) => {

        // for (let x = posts.length - 1; x>=1; x--){
        //     let item = posts[x]
        //     item.id++
        //     item.impacter_id++
        //     console.log(item.id, item.impacter_id)
            // axios.put("http://localhost:3001/posts/"+ x, item, {
            // }).then(res => {
            // })
        // }
        // let id = 1
        // axios.put("http://localhost:3001/posts/" + id, data, {
        // }).then(res => {
        //     let newPosts = [data, ...posts]
        //     setposts(newPosts)
        // })
        axios.post("http://localhost:3001/posts", data, {
        }).then(res => {
            let newposts = [res.data, ...posts]
            setposts(newposts)
        })
    }

    const updatePost = (data,id) => {
        let description = data.description
        let title = data.data.media[0].description
        let image = data.data.media[0].image

        if (description == ''){
            data.description = currentDesc
        }else{
            data.description = description
        }

        if (title == ''){
            data.data.media[0].description = currentTite
        }else{
            data.data.media[0].description = title
        }

        
        axios.put("http://localhost:3001/posts/"+ id, data, {
        }).then(res => {
            const postIndex = posts.findIndex(post => post.id === id);
            let newPosts = [...posts]
            newPosts[postIndex] = res.data
            setposts(posts)
            setposts(newPosts)
        })
    }

    const getPost = (id) => {
        // setupdate(true)
        // let curentPost = this.state.posts.filter(x => x.id === id);
        // console.log(id)
        axios.get(`http://localhost:3001/posts/`+ id)
            .then((res) => {
                setcurrentTite(res.data.data.media[0].description);
                setcurrentDesc(res.data.description);
                setimagePreviewUrl(res.data.data.media[0].image);
                setupdate(true);
                setpostId(id)
                openPopup()
            })
    }

        // const { loading,posts } = this.state
        return (
            <div>
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <TypoGraphy variant="h6"
                        color="inherit"
                        >
                        Impacter's Posts
                        </TypoGraphy>
                        <div style={{marginLeft:"16px"}}>
                            <Fab size="small" color="secondary" onClick={() => openPopup()}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>
                {loading ?
                    <CircularProgress style={{position: 'absolute',top: '50%',left: '50%'}}/>
                    : <Posts posts={posts}
                        deletePost = {deletePost}
                        open={open}
                        getPost={getPost}
                        addNewPost = {addNewPost}
                        closePopup={closePopup}
                        currentTite = {currentTite}
                        currentDesc = {currentDesc}
                        imagePreviewUrl = {imagePreviewUrl}
                        update = {update}
                        postId = {postId}
                        updatePost = {updatePost}
                        />
                }
            </div>
        )
    
}

export default HomePage
