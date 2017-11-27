import React, { Component } from 'react';
import * as path from 'config/path';
import { CircleLoader } from 'components';

class Preview extends Component {

    render() {
        return (
            <div className="preview-area">
                <div className="thumb">
                    <img src={`${path.apiUrl}/api/image?url=${this.props.og.ogImageUrl}`} alt="" className="z-depth-1" />
                </div>
                <div className="title">
                    <div className="input-field title">
                        <input id="og-title"
                               name="og-title"
                               type="text"
                               value={this.props.og.ogTitle}
                               onChange={this.props.onChange} />
                        <label htmlFor="og-title" className="active">Title</label>
                    </div>
                </div>
                <div className="description">
                    <div className="input-field">
                        <textarea id="og-description"
                                  name="og-description"
                                  className="materialize-textarea"
                                  value={this.props.og.ogDescription}
                                  onChange={this.props.onChange} />
                        <label htmlFor="og-description" className="active">Description</label>
                    </div>
                </div>
                <div className="submit-area">
                    {this.props.submitPending ?
                        <button className="btn-large waves-effect waves-light blue lighten-1" type="button" name="action">
                            <CircleLoader/>
                        </button>
                        :
                        <button className="btn-large waves-effect waves-light blue lighten-1" type="button" name="action" onClick={this.props.onSubmit}>
                            등록
                            <i className="material-icons right">send</i>
                        </button>
                    }
                </div>
            </div>
        );
    }
}

export default Preview;
