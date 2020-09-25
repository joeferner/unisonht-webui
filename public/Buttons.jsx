function Buttons(props) {
    const {onClick, buttons} = props;

    return (<div>
        <MaterialUI.Typography variant="h6">Buttons</MaterialUI.Typography>
        <ul className="buttons">
            {Object.keys(buttons || {}).map(buttonName => {
                const button = buttons[buttonName];
                return (<li>
                    <Button button={button} onClick={() => onClick(buttonName)}/>
                </li>);
            })}
        </ul>
    </div>);
}

function Button(props) {
    const {button, onClick} = props;

    return (<MaterialUI.Button
        variant="contained"
        color="default"
        title={button.description}
        onClick={() => onClick(button.name)}>{capitalCase(button.name)}</MaterialUI.Button>);
}
