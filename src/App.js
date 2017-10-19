import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header, Toast, Confirm, Footer, PrivateRoute } from 'components';
import { Home, Scrap, Login, Register, Write, NoMatch } from 'pages';
import { authRequest } from 'actions/authentication';
import { locationInit } from 'actions/location';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          simpleHeader: false,
        };

        // Auth 체크
        this.props.authRequest();
        // Location 정보 획득
        this.props.locationInit();

        this.handleScrollFrame = this.handleScrollFrame.bind(this);
    }


    // Scroll Handler
    handleScrollFrame(values) {
        const scrollTop = values.scrollTop;

        if (scrollTop > 50) {
          this.setState({
            simpleHeader: true,
          });
        } else {
          this.setState({
            simpleHeader: false,
          });
        }
    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(window.location.pathname);

        return (
            <div id="app" className={this.state.simpleHeader ? 'simple-header' : ''}>
                <Scrollbars
                    className="scroll-wrap"
                    style={{ height: '100vh' }}
                    autoHide
                    onScrollFrame={this.handleScrollFrame} >
                    {/* 공통영역 S */}
                    <Toast />
                    <Confirm />
                    {/* 공통영역 E */}

                    {isAuth ? '' :
                        <Header />
                    }

                    <div id="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <PrivateRoute path="/scrap/write" component={Write}/>
                            <Route path="/scrap/:nation" component={Scrap}/>
                            <Route path="/scrap" component={Scrap}/>
                            <Route path="/*" component={NoMatch}/>
                        </Switch>
                    </div>

                    {isAuth ? '' :
                        <Footer/>
                    }
                </Scrollbars>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.authentication.status,
});

const mapDispatchToProps = (dispatch) => ({
    authRequest: () => dispatch(authRequest()),
    locationInit: () => dispatch(locationInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
