import { Button, TextField, TextFieldProps, Typography } from '@mui/material'
import { navigate, RouteComponentProps } from '@reach/router'
import { Form, Formik, useFormikContext } from 'formik'
import { FunctionComponent, useState } from 'react'
import { userLogin } from '../../api'
import { cacheUser } from '../../helpers/cacheUser'
import { useUserContext } from '../../hooks'

const LoginFormFields: TextFieldProps[] = [
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
]

interface LoginFormValues {
  userEmail: string
  userPassword: string
}

const initialValues: LoginFormValues = {
  userEmail: '',
  userPassword: '',
}

export const LoginPage: FunctionComponent<RouteComponentProps> = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const { setUserID } = useUserContext()

  const handleSubmit = ({ userEmail, userPassword }: LoginFormValues) => {
    setSubmitting(true)
    userLogin(userEmail, userPassword)
      .then(({ data: userID }) => {
        setError(false)
        cacheUser(userID)
        setUserID(userID)
        navigate('/')
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setSubmitting(false))
  }

  const LoginForm: FunctionComponent = () => {
    const { values, handleChange } = useFormikContext<LoginFormValues>()

    return (
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {LoginFormFields.map((fieldProps, idx) => (
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
              Invalid Login
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
          <Typography variant='h4'>Login</Typography>
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
        <Typography variant='h1'>Login</Typography>
        <LoginForm />
      </div>
    </Formik>
  )
}
