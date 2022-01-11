import { Button, TextField, TextFieldProps, Typography } from '@mui/material'
import { Form, Formik, useFormikContext } from 'formik'
import { FunctionComponent, useState } from 'react'
import { insertServer } from '../../api'
import { useUserContext } from '../../hooks'
import { UIModal } from '../../ui'

const AddServerFormFields: TextFieldProps[] = [
  {
    type: 'text',
    name: 'ServerName',
    label: 'Name',
  },
  {
    type: 'text',
    name: 'ServerDescription',
    label: 'Description',
  },
]

interface AddServerValues {
  ServerName: string
  ServerDescription: string
}

const initialValues: AddServerValues = {
  ServerName: '',
  ServerDescription: '',
}

interface AddServerModalProps {
  open: boolean
  handleClose: () => void
}

export const AddServerModal: FunctionComponent<AddServerModalProps> = ({
  open,
  handleClose,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const { userID } = useUserContext()

  const onSubmit = async ({
    ServerName,
    ServerDescription,
  }: AddServerValues) => {
    setSubmitting(true)
    await insertServer(userID, ServerName, ServerDescription)
    setSubmitting(false)
  }

  const AddServerForm: FunctionComponent = () => {
    const { values, handleChange } = useFormikContext()
    return (
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {AddServerFormFields.map((fieldProps, idx) => (
          <TextField
            key={idx}
            {...fieldProps}
            value={(values as any)[fieldProps.name!]}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
            variant='outlined'
          />
        ))}
        <Button
          disabled={submitting}
          color='primary'
          variant='outlined'
          type='submit'
          style={{
            backgroundColor: 'white',
            borderWidth: '5px',
            marginTop: '10px',
            borderRadius: '10px',
          }}
        >
          <Typography variant='h6'>Create</Typography>
        </Button>
      </Form>
    )
  }

  return (
    <UIModal open={open} handleClose={handleClose}>
      <Typography variant='h5' style={{ marginBottom: '10px' }}>
        Create Server
      </Typography>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <AddServerForm />
      </Formik>
    </UIModal>
  )
}
