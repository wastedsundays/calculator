import "./Display.css";

const Display = ({ displayNum }) => {
    return (
        <div className="displayBorder">
            <h1>AH II Minus</h1>
            <h3>Alberta Gadgets</h3>
            <div className="display">
                { displayNum }

            </div>
        </div>
    );
};

export default Display;