import Head from 'next/head'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react/cjs/react.production.min'

function HomePage(props) {
  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta 
        name="description" 
        content="Browase a huge list of highly active React meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  MongoClient.connect()

  const client = await MongoClient.connect('mongodb+srv://eramir3:E9ovscl7!@cluster0.zhex4.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()

  const meetupsCollection = db.collection('meetups')
  
  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage