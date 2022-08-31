import * as Yup from 'yup'
import dayjs from 'dayjs'

export const UserValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(256, 'Max length 256 characters')
    .required('This field is required'),

  last_name: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(256, 'Max length 256 characters')
    .required('This field is required'),

  job: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(256, 'Max length 256 characters')
    .required('This field is required'),

  biography: Yup.string()
    .min(2, 'Min length 2 characters')
    .max(1024, 'Max length 1024 characters')
    .required('This field is required'),
    
  birth_date: Yup.string()
    .required('This field is required')
    .test("DOB", "Please choose a valid date of birth", (value) => {
      const dateTimestampt = Date.parse(value!.toString())
      const nowTimestampt = Date.parse(dayjs().format('YYYY-MM-DD'))
    
      return dateTimestampt < nowTimestampt
    }),

  gender: Yup.string().required('This field is required'),

  is_active: Yup.boolean().required('This field is required'),
})