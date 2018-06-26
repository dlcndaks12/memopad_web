import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.ripple(e);
        this.props.onClick(e);
    }

    ripple(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const btnWidth = rect.width;
        const posMouseX = e.nativeEvent.offsetX - btnWidth;
        const posMouseY = e.nativeEvent.offsetY - btnWidth;

        const baseCSS = `position: absolute;
                          width: ${btnWidth * 2}px;
                          height: ${btnWidth * 2}px;
                          transition: all linear 800ms;
                          transition-timing-function:cubic-bezier(0.250, 0.460, 0.450, 0.940);
                          border-radius: 50%;
                          background: var(--color-ripple);
                          top:${posMouseY}px;
                          left:${posMouseX}px;
                          pointer-events: none;
                          transform:scale(0)`;

        const rippleEffect = document.createElement("span");
        rippleEffect.style.cssText = baseCSS;

        button.style.overflow = "hidden";
        button.appendChild(rippleEffect);

        //start animation
        setTimeout( function() {
            rippleEffect.style.cssText = baseCSS + `transform:scale(1); opacity: 0;`;
        }, 5);

        setTimeout( function() {
            rippleEffect.remove();
        }, 700);
    }

    render() {
        const value = this.props.value;
        const handleClick = this.handleClick;

        return (
            <a onClick={handleClick} className="btn expanded">{value}</a>
        );
    }
}

export default Button;
