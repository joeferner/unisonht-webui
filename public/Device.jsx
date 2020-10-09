function Device(props) {
    const {deviceName, onButtonClick, onError} = props;
    const [buttons, setButtons] = React.useState(undefined);
    const [status, setStatus] = React.useState(undefined);

    React.useEffect(() => {
        const loadDevice = async () => {
            try {
                const response = await axios.get(`/device/${deviceName}`);
                setButtons(response.data.buttons);
                setStatus(response.data);
            } catch (err) {
                onError(err);
            }
        };
        loadDevice();
    }, []);

    return (<div>
        <Buttons buttons={buttons} onClick={(buttonName) => onButtonClick(deviceName, buttonName)}/>
        <MaterialUI.Accordion>
            <MaterialUI.AccordionSummary><MaterialUI.Typography>Status</MaterialUI.Typography></MaterialUI.AccordionSummary>
            <MaterialUI.AccordionDetails>
                <pre>{JSON.stringify(status, null, 2)}</pre>
            </MaterialUI.AccordionDetails>
        </MaterialUI.Accordion>
    </div>);
}

