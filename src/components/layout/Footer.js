import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer blue-grey">
        {/*<div className="container">
          <h5 className="white-text">Frui vita tua</h5>
          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </div>*/}
        <div className="footer-inner">
          <div className="footer-copyright">
            <span>© 2017 Copyright</span>
            <span>Almond Bong Bong</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
