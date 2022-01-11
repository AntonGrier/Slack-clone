import { Button, TextField, TextFieldProps, Typography } from '@mui/material'
import { navigate, RouteComponentProps } from '@reach/router'
import { Form, Formik, useFormikContext } from 'formik'
import { FunctionComponent, useState } from 'react'
import { insertUser } from '../../api'
import { cacheUser } from '../../helpers/cacheUser'

const SignUpFormFields: TextFieldProps[] = [
  {
    type: 'email',
    name: 'userEmail',
    label: 'Email',
  },
  {
    type: 'password',
    name: 'userPassword',
    label: 'Password',
  },
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
  },
]

interface SignupValues {
  userEmail: string
  userPassword: string
  firstName: string
  lastName: string
  profilePicture: string
}

const initialValues: SignupValues = {
  userEmail: '',
  userPassword: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
}

export const SignUpPage: FunctionComponent<RouteComponentProps> = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = ({
    userEmail,
    userPassword,
    firstName,
    lastName,
    profilePicture,
  }: SignupValues) => {
    const timezoneOffset = new Date().getTimezoneOffset()
    setSubmitting(true)
    insertUser(
      userEmail,
      userPassword,
      firstName,
      lastName,
      profilePicture,
      timezoneOffset,
      '',
    )
      .then(({ data: userID }) => {
        setError(false)
        cacheUser(userID)
        navigate('/')
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const SignUpForm: FunctionComponent = () => {
    const { values, handleChange } = useFormikContext<SignupValues>()

    return (
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {SignUpFormFields.map((fieldProps, idx) => (
          <TextField
            key={idx}
            {...fieldProps}
            value={(values as any)[fieldProps.name!]}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
            variant='outlined'
          />
        ))}
        <div style={{ height: '4vh' }}>
          {error && (
            <Typography color='primary' variant='subtitle2'>
              Email taken
            </Typography>
          )}
        </div>
        <Button
          disabled={submitting}
          color='primary'
          variant='outlined'
          type='submit'
          style={{
            backgroundColor: 'white',
            borderWidth: '5px',
            margin: '10px',
            width: '300px',
            borderRadius: '10px',
            padding: '10px 25px',
          }}
        >
          <Typography variant='h4'>Sign Up</Typography>
        </Button>
      </Form>
    )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant='h1'>Sign Up</Typography>
        <SignUpForm />
      </div>
    </Formik>
  )
}
