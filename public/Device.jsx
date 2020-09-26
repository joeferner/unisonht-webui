function Device(props) {
    const {deviceName, onButtonClick, onError} = props;
    const [buttons, setButtons] = React.useState(undefined);

    React.useEffect(() => {
        const loadDevice = async () => {
            try {
                const response = await axios.get(`/device/${deviceName}`);
                setButtons(response.data.buttons);
            } catch (err) {
                onError(err);
            }
        };
        loadDevice();
    }, []);

    return (<Buttons buttons={buttons} onClick={(buttonName) => onButtonClick(deviceName, buttonName)}/>);
}

