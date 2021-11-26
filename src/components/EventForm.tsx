import React, { FC, useState } from 'react';
import {Form, DatePicker, Input, Select, Row, Button} from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import {formatDate} from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {

    const {user} = useTypedSelector(state => state.auth)
    const [event, setEvent] = useState<IEvent>({
        author: '',
        description: '',
        date: '',
        guest: ''
    } as IEvent)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Date of the event"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Can't create an event in the past")]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Select a guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;