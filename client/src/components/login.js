import React from 'react'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'
import { startLoginUser } from '../actions/userAction'
import {Formik,Form,Field,ErrorMessage} from 'formik'

const schema = Yup.object().shape({
    email:Yup.string().required().email('invalid email'),
    password:Yup.string().required().min(5, 'length must be grater than 4')
    .max(10, 'length must be less than 10')

})
class Login extends React.Component{
    render(){
        return(
            <div>
                <Formik initialValues = {{
                    email:'',
                    password:''
                }}
                validationSchema = {schema}
                onSubmit = {(values)=>{
                    console.log(values)
                    const redirect  = ()=>{
                        return this.props.history.push('/home')
                    }
                    this.props.dispatch(startLoginUser(values,redirect))
                }} >
                    <Form>
                    <div className='row'>
                            <div className='col-md-4 offset-4 mt-5'>
                                <h2>Login</h2>
                                </div>
                            </div>
                        <div className='row'>
                            <div className='col-md-4 offset-4'>
                        <div className='form-group'>
                        <label htmlFor='email'>E-mail</label>
                        <Field type='text' name='email' className='form-control'/>
                        </div>
                        <ErrorMessage
                        component='div'
                        name='email'
                        />
                        <div className='form-group'>
                        <label htmlFor='password'>password</label>
                        <Field type='text' name='password' className='form-control'/>
                        </div>
                        <ErrorMessage
                        component='div'
                        name='password'/>
                        <button type='submit' className='btn btn-warning'>SignIn</button>
                        <div class="alert alert-info" role="alert">
                            PG ?<Link to="/pg/login" class="alert-link">login here</Link>.
                        </div>
                        </div>
                    </div>
                    </Form>
                </Formik>
            </div>
        )
    }
        
}
const mapStateToPros = ()=>{
    return {

    }
}
export default connect(mapStateToPros) (Login)