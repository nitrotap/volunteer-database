import React from "react"
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import connection from '../db/connection'
// import User from '../db/models/User';
import Volunteer from "../db/models/Volunteer";

function All(props) {
    let volunteers = JSON.parse(props.result)

    let rows = volunteers.map((volunteer) => {
        return {
            id: volunteer._id,
            firstName: volunteer.firstName,
            lastName: volunteer.lastName,
            preferredName: volunteer.preferredName,
            email: volunteer.email,
            phoneNumber: volunteer.phoneNumber,
            CRM_ID: volunteer.CRM_ID,
            dateStarted: volunteer.dateStarted,
            volunteerType: volunteer.volunteerType,
            lastCOI: volunteer.lastCOI,
            lastBackgroundCheck: volunteer.lastBackgroundCheck,
            lastMissionConversation: volunteer.lastMissionConversation,
            staffPartner: volunteer.staffPartner,
            techNeeded: volunteer.techNeeded,
            notes: volunteer.notes,
        }

    })

    const columns = [
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 200,
            editable: true
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 200,
            editable: true
        },
        {
            field: 'preferredName',
            headerName: 'Preferred Name',
            width: 200,
            editable: true
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 200,
            editable: true
        },
        {
            field: 'CRM_ID',
            headerName: 'CRM ID',
            width: 200,
            editable: true
        },
        {
            field: 'dateStarted',
            headerName: 'Date Started',
            width: 200,
            editable: true
        },
        {
            field: 'volunteerType',
            headerName: 'Volunteer Type',
            width: 200,
            editable: true
        },
        {
            field: 'lastCOI',
            headerName: 'Last COI',
            width: 200,
            editable: true
        },
        {
            field: 'lastBackgroundCheck',
            headerName: 'Last Background Check',
            width: 200,
            editable: true
        },
        {
            field: 'lastMissionConversation',
            headerName: 'Last Mission Conversation',
            width: 200,
            editable: true
        },
        {
            field: 'staffPartner',
            headerName: 'Staff Partner',
            width: 200,
            editable: true
        },
        {
            field: 'techNeeded',
            headerName: 'Tech Needed',
            width: 200,
            editable: true
        },
        {
            field: 'notes',
            headerName: 'Additional Notes',
            width: 500,
            editable: true
        },
    ];

    /* todo: add a button to add a new volunteer */
    // const rows = async function (props) {
    //     await props.db.Volunteer.findAll();
    // };

    const mockRows = [
        // add new volunteer here
        {
            id: 0,
            firstName: '',
            lastName: '',
            preferredName: '',
            email: '',
            phoneNumber: '',
            CRM_ID: '',
            dateStarted: '',
            volunteerType: '',
            lastCOI: '',
            lastBackgroundCheck: '',
            lastMissionConversation: '',
            staffPartner: '',
            techNeeded: '',
            notes: '',
        },
        {
            // todo map this to the database
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            preferredName: 'John Doe',
            email: 'email@email.com',
            phoneNumber: '123-456-7890',
            CRM_ID: '0123456',
            dateStarted: 'dateStarted',
            volunteerType: 'volunteerType',
            lastCOI: 'lastCOI',
            lastBackgroundCheck: 'lastBackgroundCheck',
            lastMissionConversation: 'lastMissionConversation',
            staffPartner: 'staffPartner',
            techNeeded: 'techNeeded',
            notes: 'notes',
        },
    ];

    return (
        <div style={{ display: 'flex', height: '1000px' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    experimentalFeatures={{ newEditingApi: true }}
                    rows={rows}
                    columns={columns} />
            </div>
        </div>

    );
}

export async function getServerSideProps() {
    await connection();

    const result = await Volunteer.find({})
    console.log(result);
    return { props: { result: JSON.stringify(result) } }
}

export default All;