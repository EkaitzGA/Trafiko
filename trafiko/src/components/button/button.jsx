import "./button.css"

function Button({ onClick, children }) {
    return (
        <button 
            onClick={onClick}
            className="button"
            >Prueba
            {children}
        </button>
    )
}

export default Button