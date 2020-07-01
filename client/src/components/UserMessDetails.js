import React from 'react'
import {useFormik} from 'formik'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Button,Checkbox,FormControlLabel,
    FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {startPostMessDetails} from '../actions/userAction'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '33ch',
        height:'4ch',
      },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }));
  const dstyle = {
      minWidth:150,
      minHeight:50
  }
  const style = {
    minWidth: 283
 }

function UserMessDetails (props){
    const classes = useStyles();
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues:{
            residentName:'',
            timing:'',
            vegNonVeg:false
        },
        onSubmit(values) {
            console.log(props.residentMess)
                  props.dispatch(startPostMessDetails(values))
         }
    })
    
    return(
        
        <div>
            <div className='row'>
                <div className='col-md-4 offset-8'> 
                
                <h3>Be there ?</h3>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
               
                <TextField id="outlined-basic" name='residetName'label="Name"  name='residentName'variant="outlined"
                onChange={handleChange} size='small'/>
                
               
                 <FormControl variant="outlined" style={{minWidth: 120,maxHeight:10}} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Timing</InputLabel>
        <Select
          name='timing'
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='breakfast'>breakfast</MenuItem>
          <MenuItem value='lunch'>lunch</MenuItem>
          <MenuItem value='dinner'>dinner</MenuItem>
        </Select>
      </FormControl>

                <FormControlLabel
                className='mt-5'
                 control={
                <Checkbox
                onChange={handleChange}
                name="vegNonVeg"
                color="primary"
          />
        }
        label="Non-VEG?"
      />
                <Button type='submit' style={style} variant="contained" color="secondary">Submit</Button>
                
                </form>
            </div>
        </div>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return{
        residentMess:state.residentMess
    }
}
export default connect(mapStateToProps) (UserMessDetails)