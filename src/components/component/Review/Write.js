import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'modules/toast';
import { initOg, getOgByUrl, setOg, setOgMap } from 'modules/og';
import { registerScrap, updateScrap } from 'modules/scrap';
import { Select, Input, ImageLoader } from 'components';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nationSelected: props.nationSelected,
            citySelected: props.citySelected,
            categorySelected: -1,
            images: [],
        };

        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(e) {
        const currentImageLength = this.state.images.length;
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            if (i > (4 - currentImageLength)) {
                alert('이미지는 최대 5개 까지 등록 가능합니다.');
                break;
            }

            const file = e.target.files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                file.data = reader.result;
                this.setState((prevState) => ({
                    images: [...prevState.images, file]
                }), () => {
                    console.log(this.state.images);
                });
            };

            reader.readAsDataURL(file);
        }
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;
        const nation = this.props.location.nation;
        const city = this.props.location.city !== null ? this.props.location.city[nationSelected] : null;
        const cityLength = city !== null ? city.length : null;
        const images = this.state.images;

        return (
            <div className="write-area">
                <div className={`input-row ${cityLength !== null && cityLength < 1 ? 'no-city' : ''}`}>
                    <div className="select-area nation-sel">
                        <Select defaultSelected={nationSelected} type="nation" option={nation} onChange={this.handleSelect}/>
                    </div>
                    <div className="select-area city-sel">
                        <Select defaultSelected={citySelected} type="city" option={city} onChange={this.handleSelect}/>
                    </div>
                    <div className="input-area">
                        <div className="input-field link">
                            <Input id="link"
                                   name="link"
                                   placeholder="제목을 입력해주세요."
                                   onChange={(e) => this.handleTitle(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="image-area">
                    <div className="add-file">
                        <input type="file" id="add-review-image" multiple accept="image/*" onChange={this.handleFile}/>
                        <label htmlFor="add-review-image">
                            <i className="fas fa-plus-circle"/>
                            <span>이미지</span>
                        </label>
                    </div>
                    <ul className="images">
                        {images.length > 0 && images.map((image, i) =>
                            <li key={i}>
                                <ImageLoader image={image.data}
                                             background/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pending: state.pender.pending,
    og: state.og,
    location: state.location,
    category: state.category.category,
    nickname: state.auth.nickname,
});

const mapDispatchToProps = (dispatch) => ({
    initOg: () => dispatch(initOg()),
    getOgByUrl: (url) => dispatch(getOgByUrl(url)),
    setOg: (og) => dispatch(setOg(og)),
    setOgMap: (ogMap) => dispatch(setOgMap(ogMap)),
    registerScrap: (nationCode, cityIdx, categoryIdx, og) => dispatch(registerScrap(nationCode, cityIdx, categoryIdx, og)),
    updateScrap: (scrapIdx, nationCode, cityIdx, categoryIdx, og) => dispatch(updateScrap(scrapIdx, nationCode, cityIdx, categoryIdx, og)),
    toast: (content, time) => dispatch(toast(content, time)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));
