import PropTypes from 'prop-types'
import './Image.css';

const Image = ({src, onImageClick, isPreviewImg, altText}) => {
    let className = isPreviewImg ? 'preview-image' : 'slider-img';
    return (
        src && <img src={src} className={className} alt={altText} onClick={() => onImageClick(src)} />
    )
}

Image.defaultProps = {
    isPreviewImg: false,
    altText:  '',
    onImageClick : () => {
        return;
    }
}

Image.propTypes = {
    src : PropTypes.string.isRequired,
    altText : PropTypes.string,
    isPreviewImg : PropTypes.bool,
    onClick : PropTypes.func,
}

export default Image
