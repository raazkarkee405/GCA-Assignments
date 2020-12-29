import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import firebase from '../../services/firebase';
import {createNote, getNoteList} from './note-management';
import { CircularProgress, Snackbar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Grid from "@material-ui/core/Grid/Grid";
// import Alert from '@material-ui/lab/Alert/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    addIcon: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        
    },
    card: {
        margin: 20,
        minWidth: 275
       
    },
    title: {
        fontSize: 20,
      },
      pos: {
        marginBottom: 12,
      },
  }));
  

function NoteList() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [addingNote, setAddingNote] = useState(false);
    const [updateNote, setUpdateNote] = useState();
    const [noteList, setNoteList] = useState([]);
    const [error,setError]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
   // const [isSaving, setIsSaving] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setError(false);
    }

    const handleChange = (event) => {
        if(event.target.id==='title') setTitle(event.target.value);
        if(event.target.id==='description') setDescription(event.target.value);
        if(event.target.id==='deadline') setDeadline(event.target.value);

    }

    const createTodo = () => {
        // console.log(title)
        // console.log(description)
        // console.log(deadline)
       // setIsSaving(true);
        setAddingNote(true);
        let note = {};
        note.title=title;
        note.description=description;
        note.deadline=deadline;
        console.log(note);
        createNote(note).then(response => {
            console.log(response);
            setAddingNote(false);
            setOpen(false);
        }).catch(error => {
            setAddingNote(false);
            setError(true);
        })
        
    }

    function getTodos() {
        firebase.firestore().collection('todo-list').onSnapshot(function (querySnapshot){
            setNoteList(
                querySnapshot.docs.map((doc) => ({
                    title: doc.data().title,
                    description: doc.data().description
                }))
            )
        })
    }

    useEffect(() => {
       getTodos();
    }, [true])

    

    // useEffect(()=>{
    //     getNoteList().then(res => {
    //         setNoteList(res);
    //         console.log(noteList)
    //         setIsLoading(false);
    //     });
    // },[false]);

    return (
        <div>
            <div className={classes.card}>
                <List>
                {noteList.map((item) =>
                     < ListItem >
                     <Card>
                     <CardContent>
                     <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {item.title} 
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                        {item.description}
                        </Typography>
                     <CardActions>
                     <Fab color="primary" aria-label="edit"  >
                     <EditRoundedIcon />
                      </Fab>
                      <Fab color="secondary" aria-label="delete"  >
                     <DeleteRoundedIcon />
                      </Fab>
                     </CardActions>
                     </CardContent> 
                 </Card>
                 </ListItem>
                )}
            </List>
            </div>



            <div className={classes.root}></div>
            <Fab color="primary" aria-label="add" className={classes.addIcon} onClick={()=>setOpen(true)}>
             <AddIcon />
             </Fab>
            
             
           


             
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        {addingNote ? <CircularProgress />:
            <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={handleChange}
              margin="dense"
              id="title"
              label="Enter Title"
              type="text"
              value={title}
              fullWidth
            />
            <TextField
              
              onChange={handleChange}
              margin="dense"
              id="description"
              label="Enter Description"
              type="text"
              value={description}
              fullWidth
            />
            <TextField
              
              onChange={handleChange}
              margin="dense"
              id="deadline"
              label="Select Deadline"
              type="text"
              value={deadline}
              fullWidth
            />
            </DialogContent>
        }
        {addingNote ? '' : <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTodo} color="primary">
            Add
          </Button>
        </DialogActions>
        }
      </Dialog>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <alert onClose={handleClose} severity="error">
                Cannot add note at this time
            </alert>
        </Snackbar>
        </div>
    )
}

export default NoteList
