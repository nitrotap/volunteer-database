import React from "react"
import { useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Box, Popover, Typography, Badge, Grid, Tooltip } from "@mui/material";
import connection from '../db/connection'
import Image from 'next/image'
// import User from '../db/models/User';
import Volunteer from "../db/models/Volunteer";

const CEBadge = {
    label: 'CE',
    text: 'Community Educator',
    color: 'blue'
}

const SGFBadge = {
    label: 'SGF',
    text: 'Support Group Facilitator',
    color: 'green'
}

const MIMBadge = {
    label: 'MIM',
    text: 'Memories in the Making',
    color: 'red'
}

const TSBadge = {
    label: 'TS',
    text: 'Tech Support',
    color: 'yellow'
}

const CRBadge = {
    label: 'CR',
    text: 'CR',
    color: 'orange'
}

const DEBadge = {
    label: 'DE',
    text: 'Developer',
    color: 'purple'
}

const SMBadge = {
    label: 'Social Media',
    text: 'Social Media',
    color: 'brightgreen'
}

const ESSLBadge = {
    label: 'ESSL',
    text: 'ESSL',
    color: 'darkblue'
}

const DRCOGBadge = {
    label: 'DRCOG',
    text: 'DRCOG',
    color: 'pink'
}

const TRAINBadge = {
    label: 'TRAIN',
    text: 'In Training',
    color: 'brown'
}

const DEVBadge = {
    label: 'DEV',
    text: 'DEV',
    color: 'violet'
}

const badgeMap = {
    CE: CEBadge,
    SGF: SGFBadge,
    MIM: MIMBadge,
    TS: TSBadge,
    CR: CRBadge,
    DE: DEBadge,
    SM: SMBadge,
    ESSL: ESSLBadge,
    DRCOG: DRCOGBadge,
    TRAIN: TRAINBadge,
    DEV: DEVBadge
}




function badgeRender(badge) {
    if (badge) {
        let site = `https://img.shields.io/badge/${badge.label}-${badge.text}-${badge.color}`
        return (
            <Box key={badge.label}>
                <img layout='fill' src={site} alt="badge" />
            </Box>
        )
    }

}

function typeParser(volunteer) {

    let badgeBlock = []
    console.log(volunteer.row.volunteerType)
    if (volunteer.row.volunteerType[0]) {
        if (volunteer.row.volunteerType[0].includes('CE')) {
            badgeBlock.push(badgeRender({
                label: 'CE',
                text: 'Community Educator',
                color: 'blue'
            }))
        }

        if (volunteer.row.volunteerType[0].includes('SGF')) {
            badgeBlock.push(badgeRender({
                label: 'SGF',
                text: 'Support Group Facilitator',
                color: 'green'
            }))
        }

        if (volunteer.row.volunteerType[0].includes('MIM')) {
            badgeBlock.push(badgeRender({
                label: 'MIM',
                text: 'MIM',
                color: 'red'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('TS')) {
            badgeBlock.push(badgeRender({
                label: 'TS',
                text: 'Technical Support',
                color: 'yellow'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('CR')) {
            badgeBlock.push(badgeRender({
                label: 'CR',
                text: 'CR',
                color: 'orange'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('DE')) {
            badgeBlock.push(badgeRender({
                label: 'DE',
                text: 'Developer',
                color: 'purple'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('Social Media')) {
            badgeBlock.push(badgeRender({
                label: 'Social Media',
                text: 'Social Media',
                color: 'brightgreen'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('ESSL')) {
            badgeBlock.push(badgeRender({
                label: 'ESSL',
                text: 'ESSL',
                color: 'darkblue'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('DRCOG')) {
            badgeBlock.push(badgeRender({
                label: 'DRCOG',
                text: 'DRCOG',
                color: 'pink'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('TRAIN')) {
            badgeBlock.push(badgeRender({
                label: 'TRAIN',
                text: 'In Training',
                color: 'brown'
            }))
        }
        if (volunteer.row.volunteerType[0].includes('DEV')) {
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

function formatDate(params) {
    if (params.formattedValue) {
        const date = new Date(params.formattedValue);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month}-${day}-${year}`;
        return formattedDate;
    }
}
function All(props) {
    const volunteers = JSON.parse(props.result)
    const [selectedRows, setSelectedRows] = React.useState([]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState('');
    const [rowHover, setRowHover] = React.useState('');

    const open = Boolean(anchorEl);
    // const [open, setOpen] = React.useState(Boolean(anchorEl))

    function tooltipTypeParser(obj) {
        // map over obj.volunteerType and return badgeRender for every item in the array

        if (rowHover.volunteerType) {
            const badgeElement = obj.volunteerType.map((badge) => {
                console.log(badge)
                return badgeRender(badgeMap[badge])

                return badgeRender(badge)
            })

            return (
                <div>
                    {badgeElement}
                </div>
            )
        }




    }


    const handlePopoverOpen = (event) => {
        const field = event.currentTarget.dataset.field;
        const id = event.currentTarget.parentElement.dataset.id;
        const row = rows.find((r) => r.id === id);
        setValue(row[field]);
        setRowHover(row);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        // setOpen(null);
        setRowHover('');
        console.log('popover close');
    };




    const rows = volunteers.map((volunteer) => {
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
                return typeParser(params);
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
            editable: true,
            renderCell: (params) => {
                return formatDate(params)
            }
        },
        {
            field: 'lastCOI',
            headerName: 'Last COI',
            type: 'date',
            editable: true,
            renderCell: (params) => {
                return formatDate(params)
            }
        },
        {
            field: 'lastBackgroundCheck',
            headerName: 'Last Background Check',
            type: 'date',
            editable: true,
            renderCell: (params) => {
                return formatDate(params)
            }
        },
        {
            field: 'lastMissionConversation',
            headerName: 'Last Mission Conversation',
            type: 'date',
            editable: true,
            renderCell: (params) => {
                return formatDate(params)
            }
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
            } else {
                window.location.reload();
            }


        } catch (err) {
            console.log(err)
        }
    };

    function Overdue(rowHover) {
        const [overdueCOI, setOverdueCOI] = React.useState(false);
        const [overdueBackgroundCheck, setOverdueBackgroundCheck] = React.useState(false);
        const [overdueMissionConversation, setOverdueMissionConversation] = React.useState(false);
        const [overdue, setOverdue] = React.useState(false);

        useEffect(() => {
            if (overdueCOI || overdueBackgroundCheck || overdueMissionConversation) {
                setOverdue(true)
            }
        }, [rowHover])

        useEffect(() => {
            const date = new Date();
            const oneYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());

            if (rowHover.lastMissionConversation < oneYear) {
                setOverdueCOI(true)
            } else {
                setOverdueCOI(false)
            }

        }, [rowHover])

        useEffect(() => {
            const date = new Date();
            const oneYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());

            if (rowHover.lastBackgroundCheck < oneYear) {
                setOverdueCOI(true)
            } else {
                setOverdueCOI(false)
            }

        }, [rowHover])

        useEffect(() => {
            // if rowHover.lastCOI is greater than 365 days from today's date, set overdueCOI to true
            const date = new Date();
            const oneYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());

            if (rowHover.lastCOI < oneYear) {
                setOverdueCOI(true)
            } else {
                setOverdueCOI(false)
            }

        }, [rowHover])

        return (
            <Container>
                <Typography>Overdue</Typography>
                <Grid container spacing={5} sx={{ minWidth: 200 }}>
                    <Grid item>{overdueCOI ? <Badge color='error' badgeContent="overdue" /> : <Badge color="success" badgeContent="passing" />}</Grid>
                    <Grid item>COI</Grid>
                </Grid>
                <Grid container spacing={5} sx={{ minWidth: 200 }}>
                    <Grid item>{overdueBackgroundCheck ? <Badge color='error' badgeContent="overdue" /> : <Badge color="success" badgeContent="passing" />}</Grid>
                    <Grid item>Last Background Check</Grid>

                </Grid>
                <Grid container spacing={5} sx={{ minWidth: 200 }}>
                    <Grid item>{overdueMissionConversation ? <Badge color='error' badgeContent="overdue" /> : <Badge color="success" badgeContent="passing" />}</Grid>
                    <Grid item>Last Mission Conversation</Grid>

                </Grid>


            </Container >
        )

    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="contained" color="primary" onClick={() => { window.location.assign('./new') }}>
                    Add Volunteer
                </Button>
                {/* <Button variant="contained" color="primary" onClick={() => { window.location.assign('./new') }}>
                    Edit Single Volunteer
                </Button> */}
                <Button variant="contained" color="primary" onClick={() => { window.location.assign('./all') }}>
                    View All volunteers
                </Button>
            </div>
            <div style={{ height: '95vh', width: '100vw' }}>
                <div style={{ display: 'flex', height: '100%' }}>

                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            // checkboxSelection
                            disableSelectionOnClick
                            components={{ Toolbar: GridToolbar }}
                            getRowHeight={() => 'auto'}
                            experimentalFeatures={{ newEditingApi: true }}
                            onCellEditStop={handleCellEditStop}
                            // onSelectionModelChange={(ids) => {
                            //     const selectedIDs = new Set(ids);
                            //     const selectedRows = rows.filter((row) =>
                            //         selectedIDs.has(row.id),
                            //     );

                            //     setSelectedRows(selectedRows);
                            //     console.log(selectedRows)
                            // }}
                            componentsProps={{
                                cell: {
                                    onMouseEnter: handlePopoverOpen,
                                    onClick: handlePopoverClose,
                                    onMouseLeave: handlePopoverClose
                                }
                            }}
                        />
                        <Popover
                            sx={{
                                pointerEvents: 'none',
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}

                        >
                            <Grid container spacing={3} sx={{ p: 3, minWidth: 400 }}>
                                <Grid item>
                                    <Typography>{`${rowHover.firstName + ' ' + rowHover.lastName}`}</Typography>
                                    <Typography>{`${rowHover.email}`}</Typography>
                                    <Typography>{`tel: ${rowHover.phoneNumber}`}</Typography>
                                    <Box>{badgeRender({
                                        label: 'CRM ID',
                                        text: rowHover.CRM_ID,
                                        color: 'violet'
                                    })}</Box>
                                </Grid>
                                <Grid item>{tooltipTypeParser(rowHover)}</Grid>

                                <Grid item>{Overdue(rowHover)}</Grid>

                            </Grid>

                        </Popover>
                    </div>
                </div>
            </div>
        </div >

    );
}



export async function getServerSideProps() {
    await connection();

    const result = await Volunteer.find({})
    return { props: { result: JSON.stringify(result) } }
}

export default All;