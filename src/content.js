import React from 'react';
import Modal from "./modal";
import axios from "./axios";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            list: []
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    // componentDidMount() {
    //     axios.get("/videos").then((result) => {
    //         this.setState(
    //             {
    //                 list: result.data,
    //             });
    //     })
    //         .catch((err) => {
    //             console.log('err in get axios /videos:', err);
    //         });
    // }

    openModal(video) {
        this.setState({ video: video });
    }

    closeModal() {
        this.setState({ video: null });
    }

    images() {
        return this.state.list.map((video) => {
            return (
                <img key={video} width="560" height="315" src={"https://img.youtube.com/vi/" + video + "/0.jpg"} onClick={() => this.openModal(video)} />
            )
        }
        );
    }

    render() {
        return (
            <div className="content">
                <div className="sub-content">
                    <h1 className="hello-user">Hello {this.props.first} {this.props.last}</h1>
                    <p className="sub-title">
                        <strong>Let's find out more videos on MINDSPACE:</strong>
                    </p>
                </div>

                <div className="videos-container">
                    {this.images()}
                </div>

                {this.state.video && (<Modal video={this.state.video} closeModal={this.closeModal} />)}
            </div>
        );
    }

}