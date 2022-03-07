
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react/cjs/react.production.min'
import NewMeetUpForm from '../../components/meetups/NewMeetupForm'

function NewMeetUp() {
  const router = useRouter()
  async function addMeetUpHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    console.log(data)

    router.push('/')
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta 
          name='description'
          content='Add your new meetups and create amazing networking opportunities'
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler}/>
    </Fragment>
  )
}

export default NewMeetUp