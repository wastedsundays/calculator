import "./Buttons.css"

const Buttons = ({ className, btnValue, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {btnValue}
        </button>

    );
};

export default Buttons;