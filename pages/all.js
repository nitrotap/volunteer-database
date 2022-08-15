import React from "react"
import { useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card } from "@mui/material";
import connection from '../db/connection'
// import User from '../db/models/User';
import Volunteer from "../db/models/Volunteer";


function badgeRender(badge) {

    let site = `https://img.shields.io/badge/${badge.label}-${badge.text}-${badge.color}`

    return (
        <div>
            <img src={site} alt="badge" />
        </div>
    )

}

function volParser(volunteer) {
    // needs to render all appropriate badges 
    if (volunteer.row.volunteerType[0]) {
        // console.log(volunteer.row.volunteerType[0])
        // console.log(Object.values(volunteer.row.volunteerType[0]))
        // determine which badges need to be displayed
        // render appropriate badges all together into single JSX element

        // check for true values 


        let a = Object.entries(volunteer.row.volunteerType[0])
        let b = [];
        // map through array  to find true
        a.map((value, index) => {
            // console.log(value[1])
            if (value[1]) {
                b.push(value[0])


            }





        })
        console.log(b)
        // create an array of 'images'
        b.map((value, index) => {
            // console.log(value)
            console.log(value)
            const types = ['CE', 'SGF', 'MIM', 'TS', 'CR', 'DE', 'Social Media', 'ESSL', 'DRCOG', 'TRAIN', 'DEV']

            if (value === 'CE') {

                b[index] = badgeRender({
                    label: 'CE',
                    text: 'Community Educator',
                    color: 'blue'
                })

            }

            if (value === 'SGF') {
                b[index] = badgeRender({
                    label: 'SGF',
                    text: 'Support Group Facilitator',
                    color: 'green'
                })
            }
            if (value === 'MIM') {
                b[index] = badgeRender({
                    label: 'MIM',
                    text: 'MIM',
                    color: 'red'
                })
            }
            if (value === 'TS') {
                b[index] = badgeRender({
                    label: 'TS',
                    text: 'Technical Support',
                    color: 'yellow'
                })
            }
            if (value === 'CR') {
                b[index] = badgeRender({
                    label: 'CR',
                    text: 'CR',
                    color: 'orange'
                })
            }
            if (value === 'DE') {
                b[index] = badgeRender({
                    label: 'DE',
                    text: 'Developer',
                    color: 'purple'
                })
            }
            if (value === 'Social Media') {
                b[index] = badgeRender({
                    label: 'Social Media',
                    text: 'Social Media',
                    color: 'blue'
                })
            }
            if (value === 'ESSL') {
                b[index] = badgeRender({
                    label: 'ESSL',
                    text: 'ESSL',
                    color: 'green'
                })
            }
            if (value === 'DRCOG') {
                b[index] = badgeRender({
                    label: 'DRCOG',
                    text: 'DRCOG',
                    color: 'red'
                })
            }
            if (value === 'TRAIN') {
                b[index] = badgeRender({
                    label: 'TRAIN',
                    text: 'TRAIN',
                    color: 'yellow'
                })
            }
            if (value === 'DEV') {
                b[index] = badgeRender({
                    label: 'DEV',
                    text: 'DEV',
                    color: 'orange'
                })
            }

        })


        return (
            <div>
                {b}
            </div>
        )




    } else {
        return (
            'Add a type'
        )
    }

    // todo return badges for each volunteer type


}


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
            field: 'volunteerType',
            headerName: 'Volunteer Type',
            width: 200,
            editable: true,
            renderCell: (params) => {
                return volParser(params)
            },
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
            field: 'preferredName',
            headerName: 'Preferred Name',
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

    return (
        <div style={{ display: 'flex', height: '1000px' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    experimentalFeatures={{ newEditingApi: true }}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    getRowHeight={() => 'auto'}
                    rows={rows}
                    columns={columns} />
            </div>
        </div>

    );
}

export async function getServerSideProps() {
    await connection();

    const result = await Volunteer.find({})
    return { props: { result: JSON.stringify(result) } }
}

export default All;