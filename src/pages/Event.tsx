import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
    const {guests, events} = useTypedSelector(state => state.event)
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useTypedSelector(state => state.auth)

    const {fetchGuests, createEvent, fetchEvents} = useActions()

    useEffect(()=>{
        fetchGuests()
        fetchEvents(user.username)
    },[])

    const showModal = () => {
        setModalVisible(true)
    }

    const closeModel = () => {
        setModalVisible(false)
    }

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button onClick={showModal}>
                Add an event
                </Button>
            </Row>
            <Modal
                title="Add an event"
                visible={modalVisible}
                footer={null}
                onCancel={closeModel}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;