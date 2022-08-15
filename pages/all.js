import React from "react"
import { useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Box } from "@mui/material";
import connection from '../db/connection'
// import User from '../db/models/User';
import Volunteer from "../db/models/Volunteer";


function badgeRender(badge) {

    let site = `https://img.shields.io/badge/${badge.label}-${badge.text}-${badge.color}`

    return (
        <div key={badge.label}>
            <img src={site} alt="badge" />
        </div>
    )

}

function typeParser(volunteer) {
    // console.log(volunteer.row.volunteerType + volunteer.id)

    let badgeBlock = []
    if (volunteer.row.volunteerType) {
        if (volunteer.row.volunteerType.includes('CE')) {
            badgeBlock.push(badgeRender({
                label: 'CE',
                text: 'Community Educator',
                color: 'blue'
            }))
        }

        if (volunteer.row.volunteerType.includes('SGF')) {
            badgeBlock.push(badgeRender({
                label: 'SGF',
                text: 'Support Group Facilitator',
                color: 'green'
            }))
        }

        if (volunteer.row.volunteerType.includes('MIM')) {
            badgeBlock.push(badgeRender({
                label: 'MIM',
                text: 'MIM',
                color: 'red'
            }))
        }
        if (volunteer.row.volunteerType.includes('TS')) {
            badgeBlock.push(badgeRender({
                label: 'TS',
                text: 'Technical Support',
                color: 'yellow'
            }))
        }
        if (volunteer.row.volunteerType.includes('CR')) {
            badgeBlock.push(badgeRender({
                label: 'CR',
                text: 'CR',
                color: 'orange'
            }))
        }
        if (volunteer.row.volunteerType.includes('DE')) {
            badgeBlock.push(badgeRender({
                label: 'DE',
                text: 'Developer',
                color: 'purple'
            }))
        }
        if (volunteer.row.volunteerType.includes('Social Media')) {
            badgeBlock.push(badgeRender({
                label: 'Social Media',
                text: 'Social Media',
                color: 'brightgreen'
            }))
        }
        if (volunteer.row.volunteerType.includes('ESSL')) {
            badgeBlock.push(badgeRender({
                label: 'ESSL',
                text: 'ESSL',
                color: 'darkblue'
            }))
        }
        if (volunteer.row.volunteerType.includes('DRCOG')) {
            badgeBlock.push(badgeRender({
                label: 'DRCOG',
                text: 'DRCOG',
                color: 'pink'
            }))
        }
        if (volunteer.row.volunteerType.includes('TRAIN')) {
            badgeBlock.push(badgeRender({
                label: 'TRAIN',
                text: 'In Training',
                color: 'brown'
            }))
        }
        if (volunteer.row.volunteerType.includes('DEV')) {
            badgeBlock.push(badgeRender({
                label: 'DEV',
                text: 'DEV',
                color: 'violet'
            }))
        }



    }

    return (
        <div>
            {badgeBlock}
        </div>
    )


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
            editable: true
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            editable: true
        },
        {
            field: 'volunteerType',
            headerName: 'Volunteer Type',
            width: 200,
            editable: true,
            renderCell: (params) => {
                return typeParser(params)
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
            headerName: 'Phone',

            editable: true
        },
        {
            field: 'CRM_ID',
            headerName: 'CRM ID',

            editable: true
        },
        {
            field: 'dateStarted',
            headerName: 'Date Started',
            type: 'date',
            editable: true
        },
        {
            field: 'lastCOI',
            headerName: 'Last COI',
            type: 'date',
            editable: true
        },
        {
            field: 'lastBackgroundCheck',
            headerName: 'Last Background Check',
            type: 'date',
            editable: true
        },
        {
            field: 'lastMissionConversation',
            headerName: 'Last Mission Conversation',
            type: 'date',
            editable: true
        },
        {
            field: 'staffPartner',
            headerName: 'Staff Partner',
            editable: true
        },
        {
            field: 'techNeeded',
            headerName: 'Tech Needed',
            editable: true
        },
        {
            field: 'preferredName',
            headerName: 'Preferred Name',
            editable: true
        },
        {
            field: 'notes',
            headerName: 'Additional Notes',
            editable: true
        },
    ];

    /* todo: add a button to add a new volunteer */
    // const rows = async function (props) {
    //     await props.db.Volunteer.findAll();
    // };

    const handleCellEditStop = async (params, event) => {
        // event.defaultMuiPrevented = true;
        // console.log(event)
        // console.log(params)

        // console.log(event.target)
        // console.log(event.target.value)
        // console.log(event.target.name)


        try {
            const res = await fetch(`/api/volunteers/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    [params.field]: event.target.value
                }
                ),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            }

        } catch (err) {
            console.log(err)
        }


    };

    return (
        <div>
            <div style={{ height: '100vh', width: '100vw' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            components={{ Toolbar: GridToolbar }}
                            getRowHeight={() => 'auto'}
                            experimentalFeatures={{ newEditingApi: true }}
                            onCellEditStop={handleCellEditStop}
                        />
                    </div>
                </div>
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