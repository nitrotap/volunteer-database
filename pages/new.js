import React from "react";
import { useState } from "react";
import { Container, Box, Typography, Card, CardContent, CardActions, TextField, Divider, Grid, Button, ToggleButtonGroup, ToggleButton, Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup } from "@mui/material";
import styles from '../styles/Home.module.css';
import { withSessionSsr } from '../lib/config/withSession';
import Nav from '../components/nav';


export default function NewVolunteer(props) {
    // CRM_ID, first name, last name,  preferred name, email, phone number, date started, volunteer type, last COI, date of last background check, last mission conversation, staff partner, tech needed

    // required: CRM_ID, first name, last name
    const [state, setState] = useState({
        CE: false,
        SGF: false,
        MIM: false,
        TS: false,
        CR: false,
        DE: false,
        SocialMedia: false,
        ESSL: false,
        DRCOG: false,
        RAIN: false,
        DEV: false,
        Custom: '',
    })

    const [formState, setFormState] = useState({
        CRM_ID: "",
        firstName: "",
        lastName: "",
        preferredName: "",
        email: "",
        phoneNumber: "",
        dateStarted: "",
        volunteerType: state,
        lastCOI: "",
        lastBackgroundCheck: "",
        lastMissionConversation: "",
        staffPartner: "",
        techNeeded: ""
    });

    function handleChange(event) {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    }

    function handleStateChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });

        let volType = []
        for (let key in state) {
            if (state[key]) {
                volType.push(key)
            }
        }

        setFormState({
            ...formState,
            volunteerType: volType
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
        // console.log(formState);
        postData(formState);
        window.location.replace("/all");
    }

    function textForm(fieldText, fieldName, required) {

        return (
            <Box>
                <Card className={styles.card_input}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <Typography component="main" className={styles.input_text}>
                                {fieldText}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required={required}
                                id={fieldName}
                                label={fieldText}
                                name={fieldName}
                                margin="normal"
                                minRows={3}
                                placeholder={fieldText}
                                fullWidth
                                onChange={handleChange}
                                sx={{ paddingRight: '10px' }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        )
    }

    function dateForm(fieldText, fieldName, required) {
        return (
            <Box>
                <Card className={styles.card_input}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4} >
                            <Typography component="main" className={styles.input_text}>
                                {fieldText}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="date" id={fieldName}
                                name={fieldName} onChange={handleChange} className={styles.input_date} />
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        )

    }

    function telForm(fieldText, fieldName, required) {

        return (
            <Box>
                <Card className={styles.card_input}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <Typography component="main" className={styles.input_text}>
                                {fieldText}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id={fieldName}
                                label={fieldText}
                                name={fieldName}
                                margin="normal"
                                minRows={3}
                                placeholder={fieldText}
                                fullWidth
                                onChange={handleChange}
                                type="tel"
                                sx={{ paddingRight: '10px' }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        )
    }

    function typeForm(fieldText, fieldName, required, typeState) {
        // types are CE, SGF, MIM, TS, CR, DE, Social Media, ESSL, DRCOG, TS, TRAIN, DEV

        const types = ['CE', 'SGF', 'MIM', 'TS', 'CR', 'DE', 'Social Media', 'ESSL', 'DRCOG', 'TRAIN', 'DEV']

        return (
            <Box>
                <Card className={styles.card_input}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <Typography component="main" className={styles.input_text}>
                                {fieldText}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required={required}
                                id={fieldName}
                                label={fieldText}
                                name={fieldName}
                                margin="normal"
                                minRows={3}
                                placeholder={fieldText}
                                fullWidth
                                onChange={handleChange}
                                sx={{ paddingRight: '10px' }}
                            />
                        </Grid>
                    </Grid>

                    <FormControl
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">Pick one or more Type Categories</FormLabel>
                        <FormGroup>
                            <Grid container sx={{ alignItems: 'center' }}>
                                {types.map((type) => {
                                    return (
                                        <Grid item xs={2} key={type}>
                                            <FormControlLabel key={type}
                                                control={
                                                    <Checkbox checked={state.type} onChange={handleStateChange} name={type}
                                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                                                }
                                                label={type}
                                            />
                                        </Grid>
                                    )
                                })
                                }
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </Card>

            </Box >
        )
    }

    const postData = async (form) => {
        try {
            const res = await fetch('/api/volunteers', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: { 'Content-Type': 'application/json' }
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            // Redirect to all page
            // window.location.assign('/all');


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Nav />
            <Container component="main" sx={{
                backgroundColor: 'white', marginBottom: '250px', top: 50, position: 'relative', borderRadius: '10px'
            }}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="main" sx={{ fontSize: '30pt' }}>
                        Add a New Volunteer
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                    component="form"
                >
                    {textForm("First Name", "firstName", true)}
                    {textForm("Last Name", "lastName", true)}
                    {textForm("Preferred Name", "preferredName")}
                    {textForm("Email", "email")}
                    {telForm("Phone Number", "phoneNumber")}
                    {textForm("CRM ID", "CRM_ID")}
                    {dateForm("Date Started", "dateStarted")}
                    {typeForm("Type", "volunteerType", false, state)}
                    {dateForm("Last COI", "lastCOI")}
                    {dateForm("Last Background Check", "lastBackgroundCheck")}
                    {dateForm("Last Mission Conversation", "lastMissionConversation")}
                    {textForm("Staff Partner", "staffPartner")}
                    {textForm("Tech Needed", "techNeeded")}
                    {textForm("Notes", "notes")}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginTop: '20px' }}
                        onClick={handleSubmit}

                    >
                        Submit
                    </Button>


                </Box>



            </Container >
        </div>
    );
}

export const getServerSideProps = withSessionSsr(
    async ({ req, res }) => {
        const user = req.session.user;

        if (!user) {
            return {
                notFound: true,
            }
        }

        return {
            props: { user }

        }
    }
);