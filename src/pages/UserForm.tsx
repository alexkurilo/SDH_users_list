import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { 
    Container, 
    TextField, 
    Button, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'

import { IUser } from '../types/user'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { UserValidationSchema } from '../validation/userSchema'

export const UserForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { users } = useTypedSelector(state => state.user)  
    const { createUser, editUser } = useActions()
    
    const formikInitlValues: IUser = {
        first_name: '',
        last_name: '',
        birth_date: dayjs().format('YYYY-MM-DD'),
        gender: 'male',
        job: '',
        biography: '',
        is_active: false,
    }
        
    useEffect(() => { 
        if (users.length && id) {
            formik.setValues(users.find(user => user.id === +id)!, false)
        }
    }, [users])

    const formik = useFormik({
        initialValues: formikInitlValues,
        validationSchema: UserValidationSchema,
        onSubmit: (values, actions) => {
          actions.resetForm()
          values.id ? editUser(values) : createUser(values)
        },
        onReset: () => {
            navigate('/')
        },
    })

    return (
        <div className='mx-4'>
            <h1 className='d-flex justify-content-center mt-3'> User form </h1>
            <Container maxWidth="sm" className="form-container">
                <form onSubmit={formik.handleSubmit} className=''>
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="first_name"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        {(formik.touched.first_name && formik.errors.first_name) && <div className='text-danger'>{formik.errors.first_name}</div>}
                    </div>

                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            onChange={formik.handleChange}
                            name="gender"
                        >
                            <MenuItem value={'male'}>male</MenuItem>
                            <MenuItem value={'female'}>female</MenuItem>
                        </Select>
                    </FormControl>
                    {(formik.touched.gender && formik.errors.gender) && <div className='text-danger'>{formik.errors.gender}</div>}
                            value={formik.values.last_name}
                            className='my-2'
                        />
                        {(formik.touched.last_name && formik.errors.last_name) && <div className='text-danger'>{formik.errors.last_name}</div>}
                    </div>

                    <div className='my-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack>
                                <DesktopDatePicker
                                    label="Birth date"
                                    inputFormat="YYYY-MM-DD"
                                    value={formik.values.birth_date}
                                    maxDate={dayjs().format('YYYY-MM-DD')}
                                    onChange={newValue => {
                                        formik.handleChange({
                                            target: {
                                                name: 'birth_date',
                                                value: dayjs(newValue).format('YYYY-MM-DD')
                                            }
                                        })
                                    }}
                                    //@ts-ignore
                                    renderInput={props => <TextField {...props}/>}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {(formik.touched.birth_date && formik.errors.birth_date) && <div className='text-danger'>{formik.errors.birth_date}</div>}
                    </div>

                    <div className='my-3'>
                        <FormControl fullWidth >
                            <InputLabel >Gender</InputLabel>
                            <Select
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                name="gender"
                            >
                                <MenuItem value={'male'}>male</MenuItem>
                                <MenuItem value={'female'}>female</MenuItem>
                            </Select>
                        </FormControl>
                        {(formik.touched.gender && formik.errors.gender) && <div className='text-danger'>{formik.errors.gender}</div>}
                    </div>

                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Job"
                            name="job"
                            onChange={formik.handleChange}
                            value={formik.values.job}
                        />
                        {(formik.touched.job && formik.errors.job) && <div className='text-danger'>{formik.errors.job}</div>}
                    </div>

                    <div className='my-3'>
                        <TextField 
                            fullWidth
                            multiline
                            rows={5}
                            label="Biography"
                            name="biography"  
                            onChange={formik.handleChange}
                            value={formik.values.biography}
                        />
                        {(formik.touched.biography && formik.errors.biography) && <div className='text-danger'>{formik.errors.biography}</div>}
                    </div>

                    <div className='my-2'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.is_active}
                                    onChange={formik.handleChange}
                                    name="is_active"
                                    color="primary"
                                />
                            }
                            label="Is active user"
                        />
                        {(formik.touched.is_active && formik.errors.is_active) && <div className='text-danger'>{formik.errors.is_active}</div>}
                    </div>
                    
                    <div className='d-flex justify-content-center mt-3'>
                        <Button
                            variant="outlined"
                            className='btn btn-outline-secondary m-2'
                            onClick={formik.handleReset}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}
                            className='btn btn-outline-primary m-2'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
        
    )
}