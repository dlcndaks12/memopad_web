import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer blue-grey lighten-3">
                {/*<div className="container">
          <h5 className="white-text">Frui vita tua</h5>
          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </div>*/}
                <div className="footer-inner">
                    <div className="footer-copyright">
                        <div className="copy-wrap">
                            <div className="info">
                                <span>© 2017 Copyright </span>
                                <span>cmlee</span>
                            </div>
                            <div className="link-wrap">
                                <span className="mail">dlcndaks12@naver.com</span>
                                <a href="https://github.com/dlcndaks12" target="_blank" rel="noopener noreferrer" className="github">https://github.com/dlcndaks12</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;