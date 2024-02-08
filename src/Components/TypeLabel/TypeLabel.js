import './TypeLabel.css';


function TypeLabel(props) {
    
    return (
        <>
            <span className={'type-label background-color-'+props.type}>{props.type.charAt(0).toUpperCase() + props.type.substring(1, props.type.length)}</span>
        </>
    );
}

export default TypeLabel;