function Mode(props) {
    const {mode, onButtonClick} = props;

    if (!mode) {
        return (<div/>);
    }

    return (<Buttons buttons={mode.buttons} onClick={(buttonName) => onButtonClick(mode.name, buttonName)}/>);
}
