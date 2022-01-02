import PropTypes from 'prop-types'
import './Button.css';

const Button = ({className, text, onClick}) => {
    return (
        <button onClick={onClick} className={className}>{text}</button>
    )
}

Button.defaultProps = {
    text:'button',
    className: ''
}

Button.propTypes = {
    className : PropTypes.string,
    text : PropTypes.string,
    onClick : PropTypes.func.isRequired
}

export default Button
