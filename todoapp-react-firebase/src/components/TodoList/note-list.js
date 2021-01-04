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
import firebase from '../../services/firebase';
import {createNote, updatingNote, getNoteList, deletingNote} from './note-management';
import { CircularProgress, Snackbar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Grid from "@material-ui/core/Grid/Grid";
import Alert from '@material-ui/lab/Alert/Alert';

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
    const [openDelete, setOpenDelete] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [addingNote, setAddingNote] = useState(false);
    const [updateNote, setUpdateNote] = useState();
    const [selectedDoc, setSelectedDoc] = useState();
    const [noteList, setNoteList] = useState([]);
    const [error,setError]=useState(false);
    // const [isLoading,setIsLoading]=useState(true);
   // const [isSaving, setIsSaving] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
        setError(false);
    }

    const handleChange = (event) => {
        if(event.target.id==='title') setTitle(event.target.value);
        if(event.target.id==='description') setDescription(event.target.value);
        if(event.target.id==='deadline') setDeadline(event.target.value);

    }

    const twoDigitDateTextMaker = (time) => {
      let text = time.toString();
      if (text.toString().length > 1) {
        return text;
      } else {
        return '0' + text;
      }
    }
    
    const calculateFullDate = (time) => {
      // Return Type -> DD-MM-YYYYTHH:MM
      const eventDate = new Date(time);
      const resDate = twoDigitDateTextMaker(eventDate.getUTCFullYear()) + '-' + twoDigitDateTextMaker(eventDate.getUTCMonth() + 1) + '-' + twoDigitDateTextMaker(eventDate.getUTCDate()) + 'T' + twoDigitDateTextMaker(eventDate.getHours()) + ':' + twoDigitDateTextMaker(eventDate.getMinutes());
      return resDate;
    }

    const createTodo = () => {
        // console.log(title)
        // console.log(description)
        // console.log(deadline)
       // setIsSaving(true);
        setAddingNote(true);
        console.log("updateNote =" + updateNote )
        if(updateNote){
          let note = {};
        note.id=updateNote.id;
        note.title=title;
        note.description=description;
        note.deadline=new Date(deadline).getTime();
        console.log(note)
        updatingNote(note, note.id).then(response => {
            console.log(response);
            setAddingNote(false);
            setOpen(false);
        }).catch(error => {
            setAddingNote(false);
            setError(true);
        })
        }else{
        let notes = {};
        notes.title=title;
        notes.description=description;
        notes.deadline=new Date(deadline).getTime();
        console.log(notes);
        createNote(notes).then(response => {
            console.log(response);
            setAddingNote(false);
            setOpen(false);
        }).catch(error => {
            setAddingNote(false);
            setError(true);
        })
      }
    }

    const onDeleteItem = () => {
      deletingNote(selectedDoc);
      setOpenDelete(false)
    }

    const onSelectDocForDelete = (id) => {
      console.log(id)
      setSelectedDoc(id);
      setOpenDelete(true);
    }


    // function getTodos() {
    //     firebase.firestore().collection('todo-list').onSnapshot(function (querySnapshot){
    //         setNoteList(
    //             querySnapshot.docs.map((doc) => ({
    //                 title: doc.data().title,
    //                 description: doc.data().description,
    //                 deadline: doc.data().deadline,
    //                 id: doc.data().id,
    //             }))
    //         )
    //     })
    // }

    // useEffect(() => {
    //    getTodos();
    // }, [true])

    

    useEffect(()=>{
      // console.log(getNoteList())
      //   getNoteList().then(res => {
      //     // console.log(res)
      //       setNoteList(res);
      //       // console.log(noteList)
      //       setIsLoading(false);
      //   });
        const db = firebase.firestore();
        return db.collection('todo-list').onSnapshot(snapshot => {
          const notesData = [];
          snapshot.forEach(doc => notesData.push({...doc.data(), id: doc.id}))
          console.log(notesData)
          setNoteList(notesData)
      })
    },[]);

    return (
        <div>
            <div className={classes.card}>
              <Grid container spacing={3}>
                
                {noteList.map((item) =>
                    <Grid item xs={4}>
                     <Card>
                     <CardContent>
                     <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {item.title} 
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                        {item.description}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                        Deadline: {calculateFullDate(item.deadline)}
                        </Typography>
                     <CardActions>
                     
                     <Fab color="primary" aria-label="edit" onClick={(event) =>{
                       setUpdateNote(item);
                       setTitle(item.title);
                       setDescription(item.description);
                       setDeadline(calculateFullDate(item.deadline));
                       setOpen(true);
                     }}
                     >
                     <EditRoundedIcon />
                      </Fab>
                      <Fab color="secondary" aria-label="delete" onClick={()=>onSelectDocForDelete(item.id)} >
                     <DeleteRoundedIcon />
                      </Fab>
                  
                     </CardActions>
                     </CardContent> 
                 </Card>
                 </Grid>
                )}
                
              </Grid>
            </div>
                
            <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Are you sure you want to delete??
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={onDeleteItem} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>


            <div className={classes.root}></div>
            <Fab color="primary" aria-label="add" className={classes.addIcon} onClick={()=>setOpen(true)}>
             <AddIcon />
             </Fab>
             
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        {addingNote ? <CircularProgress />:
            <DialogContent>
            <DialogContentText>
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
            value={deadline}
            // onChange={(event) => date = event.target.value}
            onChange={handleChange}
            id="deadline"
            label="Deadlline"
            type="datetime-local"
            // defaultValue="2020-05-16T18:30"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
            </DialogContent>
        }
        {addingNote ? '' : <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTodo} color="primary">
            Save
          </Button>
        </DialogActions>
        }
      </Dialog>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Cannot add note at this time
            </Alert>
        </Snackbar>
        </div>
    )
}

export default NoteList
