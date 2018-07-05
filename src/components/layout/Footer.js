import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="footer-inner">
                    <div className="footer-copyright">
                        <div className="copy-wrap">
                            <div className="info">
                                <span>© 2018 Copyright </span>
                                <span>cmlee</span>
                            </div>
                            <div className="link-wrap">
                                <a href="mailto:bal.dongdong@gmail.com" className="mail">bal.dongdong@gmail.com</a>
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