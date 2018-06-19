import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/28277312_1935885266424774_8962624145257631170_n.jpg?_nc_cat=0&_nc_eui2=AeFWKes5w8V5Ahd0YD5EwQC4CMwGwmxstI0B1TvUauceJmUt0kZnFy7KoczcesOWxLx619seZq9a43GohH2pEIqOCnYEwZpalEvdag_dvrFYoA&oh=6f34fd23327e40c73d554647617a74f5&oe=5BB6EC39',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/29694766_1935885283091439_8511222494481257960_n.jpg?_nc_cat=0&_nc_eui2=AeESfppVvzQx1TYnCjqvSc4ppbJOIYm-Zko4Y02XVi1nCSEMIo-qGebzmZuWli4oZfnDnQ0_BXxsCoMdsgCQ8tOQeSk0rxx7zExB5ElNYVCVhA&oh=22686d853cca224a69d29cb27ab874b1&oe=5BB2333D',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/29597345_1935885279758106_1103710791817215050_n.jpg?_nc_cat=0&_nc_eui2=AeHvUugvdT0NgDtwkbKZVScrRD34JrbN5slGi3ItbgkoebRLNBGCJ1R2PFzumCVGSGwroqewBFEF3Ts7AFbuS4_6dU3dNGW0fn3B8FQ20hH2aw&oh=56e2e3762badb8488cbb9218a5430d6f&oe=5B7AC7F0',
        altText: 'Slide 3',
        caption: 'Slide 3'
    },
    {
        src: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/18881878_1935885319758102_1851410600187468004_n.jpg?_nc_cat=0&_nc_eui2=AeEzksl7mRTcKTAU4NG5hQTZ4fxARbEMwfBKP42uAlVRCdmMxQ1pK6RkwgwC4xYPZlQu7N86d9rpqzzS-u1a7HAWC7wu-fZALLDPKSgFSnySjw&oh=dd20e9e8ffcdcdef2cc342886840a846&oe=5B7C7897',
        altText: 'Slide 4',
        caption: 'Slide 4'
    },
    {
        src: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/29790247_1935885329758101_3355862638945610404_n.jpg?_nc_cat=0&_nc_eui2=AeGbVGpv_pRkK3lLWuAhIZWU-1lpGMgh0-FvTpHaj4zZrO7_dfhbYIi9Ijb5zoq8YYz5gS-ymRltb35qkMWIPxHSZtkdiv1LxBH6NDfk8nqBfQ&oh=df1df40dfecd599da8e02743fa1b6230&oe=5BACB92B',
        altText: 'Slide 5',
        caption: 'Slide 5'
    }
];

class LayoutStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                    style={{backgroundColor : 'green'}}
                >
                    <img src={item.src} /*alt={item.altText}*/ />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}


export default LayoutStatus;